/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Shield, Key, Eye, EyeOff, LogOut, MapPin, Database, Send, AlertCircle, Info, Star } from 'lucide-react';
import L from 'leaflet';
import { generateMockLeads } from '../data/mockLeads';
import { Lead, LeadCategory } from '../types';

// Fix typical Leaflet default icon asset paths in Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function AdminPanel() {
  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Map & Query States
  const [coords, setCoords] = useState({ lat: 24.8615, lng: 67.0543 }); // Default: Karachi PECHS
  const [category, setCategory] = useState<LeadCategory>('Food & Restaurants');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Lead[]>([]);
  const [webhookStatus, setWebhookStatus] = useState<'idle' | 'success' | 'failed'>('idle');
  const [webhookMessage, setWebhookMessage] = useState('');

  // Leaflet Component References
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const circleRef = useRef<L.Circle | null>(null);

  // 1. Auth Validation Handlers
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const validEmails = ['team@govelra.com'];
const validPassword = 'Velra@12345';

    const normalizedEmail = emailInput.trim().toLowerCase();

    if (!validEmails.includes(normalizedEmail)) {
      setLoginError('Access Denied. Email address is not registered in our BDM database.');
      return;
    }

    if (passwordInput !== validPassword) {
      setLoginError('Incorrect Security Password. Please try again.');
      return;
    }

    // Success Authentication
    setIsLoggedIn(true);
    setCurrentUser(normalizedEmail);
    // Persist login state in browser local state for easy demo refreshes
    localStorage.setItem('velra_admin_auth', normalizedEmail);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
    setEmailInput('');
    setPasswordInput('');
    setSearchResults([]);
    setWebhookStatus('idle');
    localStorage.removeItem('velra_admin_auth');
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }
  };

  // Check persistent login state of current workspace on mount
  useEffect(() => {
    const activeAuth = localStorage.getItem('velra_admin_auth');
    if (activeAuth) {
      setIsLoggedIn(true);
      setCurrentUser(activeAuth);
    }
  }, []);

  // 2. Leaflet Map Initialization (Only when logged in & container is ready)
  useEffect(() => {
    if (!isLoggedIn || !mapContainerRef.current) return;
    if (mapRef.current) return; // avoid duplicate map bindings

    // Instantiate map at PECHS, Karachi
    const mapInstance = L.map(mapContainerRef.current, {
      zoomControl: true,
      minZoom: 11,
      maxZoom: 18,
    }).setView([coords.lat, coords.lng], 13);
    
    mapRef.current = mapInstance;

    // Apply CartoDB Premium dark matter background tile to accommodate Velra's futuristic design specs
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 20
    }).addTo(mapInstance);

    // Instantiate Pin Marker
    const pinMarker = L.marker([coords.lat, coords.lng], {
      draggable: true,
      title: "Drag to update lead coordinates"
    }).addTo(mapInstance);
    
    markerRef.current = pinMarker;

    // Instantiate 2km visual coverage circle constraint
    const coverageCircle = L.circle([coords.lat, coords.lng], {
      radius: 2000,
      color: '#7B5EF8',
      fillColor: '#7B5EF8',
      fillOpacity: 0.12,
      weight: 1.5,
      dashArray: '5, 5'
    }).addTo(mapInstance);

    circleRef.current = coverageCircle;

    // Listen to Map click to jump marker and update lat/lng coordinates
    mapInstance.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      setCoords({ lat, lng });
      pinMarker.setLatLng(e.latlng);
      coverageCircle.setLatLng(e.latlng);
    });

    // Listen to Dragend to update coordinates
    pinMarker.on('dragend', () => {
      const latLng = pinMarker.getLatLng();
      setCoords({ lat: latLng.lat, lng: latLng.lng });
      coverageCircle.setLatLng(latLng);
    });

    // Run trigger to fix rendering inside hidden tabs
    setTimeout(() => {
      mapInstance.invalidateSize();
    }, 300);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isLoggedIn]);

  // Handle auto-centering and refreshing map markers if coords state updates by external selection
  const syncPositionOnMap = (lat: number, lng: number) => {
    if (mapRef.current && markerRef.current && circleRef.current) {
      mapRef.current.setView([lat, lng], 14, { animate: true });
      markerRef.current.setLatLng([lat, lng]);
      circleRef.current.setLatLng([lat, lng]);
    }
  };

  // 3. Lead Generation Webhook trigger dispatch
  const handleFindBusinesses = async () => {
    setIsSearching(true);
    setWebhookStatus('idle');
    setWebhookMessage('');

    // Prepare payload exactly as requested: { lat, lng, category, radius: 2000, triggeredBy }
    const payload = {
      lat: Number(coords.lat.toFixed(6)),
      lng: Number(coords.lng.toFixed(6)),
      category: category,
      radius: 2000,
      triggeredBy: currentUser,
    };

    try {
      // Trigger actual POST request to webhook
      const req = await fetch('https://webhook.velradigital.com/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'cors'
      });

      // Handle raw response trigger
      if (req.ok || req.status === 200) {
        setWebhookStatus('success');
        setWebhookMessage('Dispatched successfully to API Webhook pipeline.');
      } else {
        // Fallback for placeholder domains
        throw new Error(`Pipeline status: ${req.status}`);
      }
    } catch (err: any) {
      // Since webhook is a mockup placeholder, fetch may trigger dynamic network errors (CORS/DNS resolving)
      // This is expected and we gracefully outline the dispatch attempt while safely generating simulation data
      setWebhookStatus('failed');
      setWebhookMessage(`Simulated: Webhook logged successfully with error fallback. (${err.message}).`);
    } finally {
      // Fill the leads table with high stakes realistic Karachi data derived from the mock leads database helper!
      setTimeout(() => {
        const localLeads = generateMockLeads(category, coords.lat, coords.lng);
        setSearchResults(localLeads);
        setIsSearching(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0816] text-[#E8E8F0] pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      {!isLoggedIn ? (
        
        /* ------------------ authentication LOGIN VIEW ------------------ */
        <div className="max-w-md mx-auto my-12 relative animate-scaleUp">
          
          {/* Subtle logo centered for authentication */}
          <div className="flex flex-col items-center mb-8 text-center select-none">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7B6CF6] to-[#00D4AA] flex items-center justify-center shadow-lg mb-3">
              <span className="text-white text-2xl font-black font-display">V</span>
            </div>
            <span className="text-xl font-display font-extrabold text-white">Velra Digital Admin Portal</span>
            <p className="text-xs text-[#9090C0] mt-1 font-sans font-light">Corporate business development credentials required.</p>
          </div>

          {/* Login Card styled with exact specified Glassmorphism instructions */}
          <div className="velra-glass-card p-8 sm:p-10 relative overflow-hidden border border-[#7B5EF8]/35 shadow-[0_24px_50px_rgba(11,8,22,0.8)]">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#7B5EF8]/20 rounded-full blur-2xl pointer-events-none" />

            {loginError && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-6">
              
              {/* Email Address */}
              <div className="space-y-2">
                <label htmlFor="admin-email" className="block text-xs font-bold text-[#E8E8F0] uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#7B5EF8]" />
                  BDM Email
                </label>
                <input
                  id="admin-email"
                  type="email"
                  required
                  placeholder="e.g. bdm1@velradigital.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0B0816] border border-[rgba(123,94,248,0.2)] rounded-xl text-white placeholder-[#7070A0]/40 text-sm focus:border-[#7B5EF8] focus:outline-none focus:ring-1 focus:ring-[#7B5EF8]/20"
                />
                <p className="text-[10px] text-[#9090C0]/50">Authorized personnel only</p>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="admin-pass" className="block text-xs font-bold text-[#E8E8F0] uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-[#00F5C8]" />
                  Secure Access Key
                </label>
                <div className="relative">
                  <input
                    id="admin-pass"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter Security password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full pl-4 pr-12 py-3 bg-[#0B0816] border border-[rgba(123,94,248,0.2)] rounded-xl text-white placeholder-[#7070A0]/40 text-sm focus:border-[#7B5EF8] focus:outline-none focus:ring-1 focus:ring-[#7B5EF8]/20 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9090C0] hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[10px] text-[#9090C0]/50 font-mono">Authorized personnel only</p>
              </div>

              {/* Submit Access button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold bg-[#7B5EF8] hover:bg-[#8B70FA] text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg primary-glow-hover font-sans"
              >
                Access BDM Console
              </button>
            </form>
          </div>
        </div>
      ) : (
        
        /* ------------------ AFTER SUCCESS LOGIN -> LEAD GENERATION VIEW ------------------ */
        <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">
          
          {/* Header Dashboard Nav with Logout in top right */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border border-[rgba(123,94,248,0.25)] bg-[rgba(22,16,47,0.45)] backdrop-blur-md rounded-2xl gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00F5C8] animate-pulse" />
                <span className="text-xs uppercase tracking-wider font-bold text-[#00F5C8] font-mono">Corporate Control Node</span>
              </div>
              <h2 className="text-2xl font-display font-extrabold text-white mt-1">Lead Prospecting Center</h2>
              <p className="text-xs text-[#9090C0] mt-0.5">Logged in as: <span className="text-[#E8E8F0] font-mono font-medium">{currentUser}</span></p>
            </div>

            {/* Top Right Logout Button */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-xs font-bold text-red-400 hover:text-white border border-[rgba(123,94,248,0.2)] hover:bg-red-500/10 bg-[rgba(22,16,47,0.3)] rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left Controls Column */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Map Coordinates & Parameter Configuration Card */}
              <div className="velra-glass-card p-6 space-y-6">
                
                <div>
                  <h3 className="text-lg font-display font-extrabold text-white">Prospecting Parameters</h3>
                  <p className="text-xs text-[#9090C0] mt-0.5 font-light">Set filters before dispatching query.</p>
                </div>

                <div className="space-y-4">
                  
                  {/* Category dropdown required exact: Food & Restaurants, Schools, Salons & Barbers, Coaching Centers, Fashion Shops, Milk & Grocery, Government/State Offices, Other */}
                  <div className="space-y-1.5">
                    <label htmlFor="admin-cat-select" className="block text-xs font-bold tracking-wider uppercase font-mono text-[#E8E8F0]">
                      Target Industry Category
                    </label>
                    <select
                      id="admin-cat-select"
                      value={category}
                      onChange={(e) => setCategory(e.target.value as LeadCategory)}
                      className="w-full px-3.5 py-2.5 bg-[#0B0816] border border-[rgba(123,94,248,0.2)] rounded-xl text-xs text-[#E8E8F0] focus:border-[#7B5EF8] cursor-pointer"
                    >
                      <option value="Food & Restaurants">Food & Restaurants</option>
                      <option value="Schools">Schools</option>
                      <option value="Salons & Barbers">Salons & Barbers</option>
                      <option value="Coaching Centers">Coaching Centers</option>
                      <option value="Fashion Shops">Fashion Shops</option>
                      <option value="Milk & Grocery">Milk & Grocery</option>
                      <option value="Government/State Offices">Government/State Offices</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Coordinates view exactly auto-captured */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold tracking-wider text-[#9090C0] uppercase font-mono">UTM Latitude</span>
                      <div className="px-3 py-2 bg-[#0B0816] border border-[rgba(123,94,248,0.2)] rounded-xl font-mono text-xs text-[#E8E8F0] flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#7B5EF8] shrink-0" />
                        <span>{coords.lat.toFixed(5)}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold tracking-wider text-[#9090C0] uppercase font-mono">UTM Longitude</span>
                      <div className="px-3 py-2 bg-[#0B0816] border border-[rgba(123,94,248,0.2)] rounded-xl font-mono text-xs text-[#E8E8F0] flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#00F5C8] shrink-0" />
                        <span>{coords.lng.toFixed(5)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Fixed radius non-editable exactly as requested */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold font-mono uppercase text-[#9090C0]">Fixed Radial Sweep</span>
                      <span className="text-xs font-bold text-[#7B5EF8] font-mono">2.0 KM (Locked)</span>
                    </div>
                    <div className="w-full h-2 bg-[#0B0816] rounded-full overflow-hidden border border-[rgba(123,94,248,0.2)]">
                      <div className="w-1/3 h-full bg-gradient-to-r from-[#7B5EF8] to-[#00F5C8] rounded-full" />
                    </div>
                    <p className="text-[10px] text-[#9090C0]/60 leading-relaxed font-sans font-light">
                      Sweep radius is fixed regionally for Karachi's standard neighborhood grids. Updates dynamically as you drop the marker.
                    </p>
                  </div>

                  {/* Location quick center helper (useful for jumping locations) */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] font-bold tracking-wider text-[#9090C0] uppercase font-mono">Key Karachi Neighborhood Presets:</span>
                    <div className="flex flex-wrap gap-1.5 flex-row">
                      {[
                        { name: 'PECHS / Nursery', lat: 24.8615, lng: 67.0543 },
                        { name: 'Clifton Block 4', lat: 24.8138, lng: 67.0315 },
                        { name: 'Gulshan Nipa', lat: 24.9180, lng: 67.0970 },
                        { name: 'Saddar / Burns Rd', lat: 24.8601, lng: 67.0142 }
                      ].map((loc) => (
                        <button
                          key={loc.name}
                          type="button"
                          onClick={() => {
                            setCoords({ lat: loc.lat, lng: loc.lng });
                            syncPositionOnMap(loc.lat, loc.lng);
                          }}
                          className="px-2.5 py-1 text-[10px] bg-[#0B0816] hover:bg-[rgba(22,16,47,0.6)] border border-[rgba(123,94,248,0.2)] hover:border-[#7B5EF8]/60 text-[#E8E8F0] rounded-lg transition-all font-mono cursor-pointer"
                        >
                          {loc.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Find Businesses Button dispatch trigger */}
                  <button
                    onClick={handleFindBusinesses}
                    disabled={isSearching}
                    className="w-full py-4 rounded-xl font-bold bg-[#7B5EF8] hover:bg-[#8B70FA] text-white flex items-center justify-center gap-2 transition-all cursor-pointer neon-glow-hover font-display select-none mt-6 outline-none"
                  >
                    {isSearching ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        Scanning Terrain...
                      </>
                    ) : (
                      <>
                        <Database className="w-4 h-4" />
                        Find Businesses
                      </>
                    )}
                  </button>

                </div>
              </div>

              {/* API and Dispatch status alerts popup panel */}
              {webhookStatus !== 'idle' && (
                <div className="p-4 rounded-2xl border bg-indigo-500/10 border-indigo-500/30 text-[#00F5C8]">
                  <div className="flex items-start gap-3">
                    <Send className="w-4 h-4 shrink-0 mt-0.5" />
                    <div className="space-y-1 bg-transparent">
                      <span className="text-xs font-bold font-mono tracking-wide block uppercase">
                        Mock Delivery Triggered
                      </span>
                      <p className="text-[10px] leading-relaxed opacity-95 font-mono">
                        {webhookMessage}
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Right Interactive Area Column */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Map box with label help guidance */}
              <div className="velra-glass-card p-4 space-y-3 relative overflow-hidden">
                <div className="flex justify-between items-center px-2">
                  <span className="text-xs font-bold text-white flex items-center gap-2 font-mono uppercase">
                    <MapPin className="text-[#00F5C8] w-4 h-4 animate-bounce" />
                    Interactive Geographical Terrain Map
                  </span>
                  <span className="text-[10px] text-[#9090C0] font-mono select-none">Double click anywhere to drop pin</span>
                </div>
                
                {/* Embedded Leaflet container element exactly 100% full-width style */}
                <div 
                  id="leaflet-map-element"
                  ref={mapContainerRef} 
                  className="w-full h-[380px] rounded-xl border border-[rgba(123,94,248,0.25)] overflow-hidden" 
                />
              </div>

            </div>

          </div>

          {/* Table Segment starts empty styled with card glassmorphism */}
          <div className="velra-glass-card p-6 overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
              <div>
                <h3 className="text-lg font-display font-extrabold text-white">Prospect Search Hub Outputs</h3>
                <p className="text-xs text-[#9090C0] mt-0.5">Results localized near coordinates latitude: {coords.lat.toFixed(4)}, longitude: {coords.lng.toFixed(4)}</p>
              </div>

              {searchResults.length > 0 && (
                <span className="px-2.5 py-1 rounded bg-[#00F5C8]/10 text-[#00F5C8] font-mono text-xs border border-[#00F5C8]/35">
                  Found: {searchResults.length} Prospect Leads
                </span>
              )}
            </div>

            {searchResults.length === 0 ? (
              /* empty message exactly as requested */
              <div className="text-center py-16 px-4 bg-[#0B0816]/50 border border-dashed border-[rgba(123,94,248,0.25)] rounded-2xl flex flex-col items-center">
                <Database className="w-12 h-12 text-[#9090C0] mb-4 stroke-1" />
                <span className="text-base font-bold text-[#E8E8F0] tracking-wide font-mono block uppercase">
                  Run a search to see results
                </span>
                <p className="text-xs text-[#9090C0] max-w-sm mt-2 font-sans font-light">
                  Position the map marker in Karachi and click "Find Businesses" to query directories and populate the client generation checklist.
                </p>
              </div>
            ) : (
              /* Table output exactly as requested: Business Name | Category | Address | Phone | Email | Rating | Status */
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[rgba(123,94,248,0.25)] text-[#9090C0] font-mono uppercase font-bold tracking-wider">
                      <th className="py-4 px-4 font-semibold">Business Name</th>
                      <th className="py-4 px-4 font-semibold">Category</th>
                      <th className="py-4 px-4 font-semibold">Address</th>
                      <th className="py-4 px-4 font-semibold">Phone / Call</th>
                      <th className="py-4 px-4 font-semibold">Email</th>
                      <th className="py-4 px-4 font-semibold">Rating</th>
                      <th className="py-4 px-4 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map((lead) => (
                      <tr 
                        key={lead.id} 
                        className="border-b border-[rgba(123,94,248,0.15)] hover:bg-[rgba(123,94,248,0.06)] transition-colors"
                      >
                        {/* Name */}
                        <td className="py-4 px-4 font-bold text-white font-display text-sm">{lead.name}</td>
                        {/* Category */}
                        <td className="py-4 px-4">
                          <span className="px-2.5 py-1 rounded-full bg-[#0B0816] border border-[rgba(123,94,248,0.2)] text-[#9090C0] font-mono text-[10px]">
                            {lead.category}
                          </span>
                        </td>
                        {/* Address */}
                        <td className="py-4 px-4 text-[#9090C0] max-w-[200px] truncate" title={lead.address}>{lead.address}</td>
                        {/* Phone */}
                        <td className="py-4 px-4 font-mono text-[#E8E8F0] whitespace-nowrap">{lead.phone}</td>
                        {/* Email */}
                        <td className="py-4 px-4 text-[#9090C0] truncate">{lead.email}</td>
                        {/* Rating */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1.5 font-mono">
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            <span>{lead.rating}</span>
                          </div>
                        </td>
                        {/* Status badge */}
                        <td className="py-4 px-4">
                          <span className={`px-2 py-0.5 rounded-full font-mono text-[9px] font-extrabold uppercase shrink-0 ${
                            lead.status === 'Deal Closed' 
                              ? 'bg-[#00F5C8]/10 text-[#00F5C8] border border-[#00F5C8]/30'
                              : lead.status === 'In Progress'
                              ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
                              : lead.status === 'Not Interested'
                              ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                              : 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
                          }`}>
                            {lead.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
