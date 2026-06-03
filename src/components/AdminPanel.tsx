/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Shield, Key, Eye, EyeOff, LogOut, MapPin, Database, Send, AlertCircle, Star, Globe, Trash2, Plus, X, Layout } from 'lucide-react';
import L from 'leaflet';
import { generateMockLeads } from '../data/mockLeads';
import { Lead, LeadCategory } from '../types';

const SUPABASE_URL = 'https://qxqrlvzzfisvlzhyqems.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4cXJsdnp6Zmlzdmx6aHlxZW1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzOTY2NDUsImV4cCI6MjA5NTk3MjY0NX0.bM2B3JtzcjR5RVihk3wIilbAxdtDucasWrcmpSOZ_2k';

// Fix Leaflet default icon paths
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface Theme {
  id: number;
  name: string;
  category: string;
  description: string;
  preview_url: string;
  thumbnail_url: string;
  created_at: string;
}

const CREDENTIALS = {
  admin: { email: 'team@govelra.com', password: 'Velra@12345', role: 'admin' },
  bdm: { email: 'bdm@govelra.com', password: 'Business@12345', role: 'bdm' },
};

export default function AdminPanel() {
  // Auth
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [userRole, setUserRole] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Admin states
  const [coords, setCoords] = useState({ lat: 24.8615, lng: 67.0543 });
  const [category, setCategory] = useState<LeadCategory>('Food & Restaurants');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Lead[]>([]);
  const [webhookStatus, setWebhookStatus] = useState<'idle' | 'success' | 'failed'>('idle');
  const [webhookMessage, setWebhookMessage] = useState('');

  // BDM / Themes states
  const [themes, setThemes] = useState<Theme[]>([]);
  const [themesLoading, setThemesLoading] = useState(false);
  const [previewTheme, setPreviewTheme] = useState<Theme | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTheme, setNewTheme] = useState({ name: '', category: '', description: '', preview_url: '', thumbnail_url: '' });
  const [addingTheme, setAddingTheme] = useState(false);

  // Leaflet refs
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const circleRef = useRef<L.Circle | null>(null);

  // --- AUTH ---
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const normalized = emailInput.trim().toLowerCase();

    if (normalized === CREDENTIALS.admin.email && passwordInput === CREDENTIALS.admin.password) {
      setIsLoggedIn(true);
      setCurrentUser(normalized);
      setUserRole('admin');
      localStorage.setItem('velra_admin_auth', normalized);
      localStorage.setItem('velra_admin_role', 'admin');
    } else if (normalized === CREDENTIALS.bdm.email && passwordInput === CREDENTIALS.bdm.password) {
      setIsLoggedIn(true);
      setCurrentUser(normalized);
      setUserRole('bdm');
      localStorage.setItem('velra_admin_auth', normalized);
      localStorage.setItem('velra_admin_role', 'bdm');
    } else {
      setLoginError('Access Denied. Invalid credentials.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
    setUserRole('');
    setEmailInput('');
    setPasswordInput('');
    setSearchResults([]);
    setWebhookStatus('idle');
    setPreviewTheme(null);
    localStorage.removeItem('velra_admin_auth');
    localStorage.removeItem('velra_admin_role');
    if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
  };

  // Restore session
  useEffect(() => {
    const savedAuth = localStorage.getItem('velra_admin_auth');
    const savedRole = localStorage.getItem('velra_admin_role');
    if (savedAuth && savedRole) {
      setIsLoggedIn(true);
      setCurrentUser(savedAuth);
      setUserRole(savedRole);
    }
  }, []);

  // --- THEMES ---
  const fetchThemes = async () => {
    setThemesLoading(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/themes?order=created_at.asc`, {
        headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` }
      });
      const data = await res.json();
      setThemes(data);
    } catch (err) {
      console.error('Failed to fetch themes');
    } finally {
      setThemesLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchThemes();
  }, [isLoggedIn]);

  const handleAddTheme = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingTheme(true);
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/themes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify(newTheme),
      });
      setNewTheme({ name: '', category: '', description: '', preview_url: '', thumbnail_url: '' });
      setShowAddForm(false);
      fetchThemes();
    } catch (err) {
      console.error('Failed to add theme');
    } finally {
      setAddingTheme(false);
    }
  };

  const handleDeleteTheme = async (id: number) => {
    if (!confirm('Delete this theme?')) return;
    await fetch(`${SUPABASE_URL}/rest/v1/themes?id=eq.${id}`, {
      method: 'DELETE',
      headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` }
    });
    fetchThemes();
  };

  // --- MAP ---
  useEffect(() => {
    if (!isLoggedIn || userRole !== 'admin' || !mapContainerRef.current || mapRef.current) return;

    const mapInstance = L.map(mapContainerRef.current, { zoomControl: true, minZoom: 11, maxZoom: 18 })
      .setView([coords.lat, coords.lng], 13);
    mapRef.current = mapInstance;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO', maxZoom: 20
    }).addTo(mapInstance);

    const pinMarker = L.marker([coords.lat, coords.lng], { draggable: true }).addTo(mapInstance);
    markerRef.current = pinMarker;

    const coverageCircle = L.circle([coords.lat, coords.lng], {
      radius: 2000, color: '#7B5EF8', fillColor: '#7B5EF8', fillOpacity: 0.12, weight: 1.5, dashArray: '5, 5'
    }).addTo(mapInstance);
    circleRef.current = coverageCircle;

    mapInstance.on('click', (e: L.LeafletMouseEvent) => {
      setCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
      pinMarker.setLatLng(e.latlng);
      coverageCircle.setLatLng(e.latlng);
    });

    pinMarker.on('dragend', () => {
      const ll = pinMarker.getLatLng();
      setCoords({ lat: ll.lat, lng: ll.lng });
      coverageCircle.setLatLng(ll);
    });

    setTimeout(() => mapInstance.invalidateSize(), 300);

    return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; } };
  }, [isLoggedIn, userRole]);

  const syncPositionOnMap = (lat: number, lng: number) => {
    if (mapRef.current && markerRef.current && circleRef.current) {
      mapRef.current.setView([lat, lng], 14, { animate: true });
      markerRef.current.setLatLng([lat, lng]);
      circleRef.current.setLatLng([lat, lng]);
    }
  };

  const handleFindBusinesses = async () => {
    setIsSearching(true);
    setWebhookStatus('idle');
    setWebhookMessage('');
    const payload = { lat: Number(coords.lat.toFixed(6)), lng: Number(coords.lng.toFixed(6)), category, radius: 2000, triggeredBy: currentUser };
    try {
      const req = await fetch('https://webhook.velradigital.com/leads', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), mode: 'cors'
      });
      if (req.ok) { setWebhookStatus('success'); setWebhookMessage('Dispatched successfully to API Webhook pipeline.'); }
      else throw new Error(`Pipeline status: ${req.status}`);
    } catch (err: any) {
      setWebhookStatus('failed');
      setWebhookMessage(`Simulated: Webhook logged successfully with error fallback. (${err.message}).`);
    } finally {
      setTimeout(() => {
        setSearchResults(generateMockLeads(category, coords.lat, coords.lng));
        setIsSearching(false);
      }, 1000);
    }
  };

  // ==================== RENDER ====================

  // Fullscreen preview modal
  if (previewTheme) {
    return (
      <div className="fixed inset-0 z-[999] bg-[#0B0816] flex flex-col">
        <div className="flex items-center justify-between px-6 py-3 bg-[#0B0816] border-b border-[rgba(123,94,248,0.2)]">
          <div className="flex items-center gap-3">
            <Layout className="w-4 h-4 text-[#7B5EF8]" />
            <span className="text-sm font-bold text-white font-display">{previewTheme.name}</span>
            <span className="text-xs text-[#9090C0] font-mono">{previewTheme.category}</span>
          </div>
          <button
            onClick={() => setPreviewTheme(null)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#E8E8F0] border border-[rgba(123,94,248,0.2)] rounded-xl bg-[rgba(22,16,47,0.5)] hover:border-[#7B5EF8] transition-all cursor-pointer"
          >
            <X className="w-3.5 h-3.5" /> Close Preview
          </button>
        </div>
        <iframe
          src={previewTheme.preview_url}
          className="flex-1 w-full border-0"
          title={previewTheme.name}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0816] text-[#E8E8F0] pt-28 pb-16 px-4 sm:px-6 lg:px-8">

      {/* ========== LOGIN ========== */}
      {!isLoggedIn ? (
        <div className="max-w-md mx-auto my-12 relative animate-scaleUp">
          <div className="flex flex-col items-center mb-8 text-center select-none">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7B6CF6] to-[#00D4AA] flex items-center justify-center shadow-lg mb-3">
              <span className="text-white text-2xl font-black font-display">V</span>
            </div>
            <span className="text-xl font-display font-extrabold text-white">Velra Digital Portal</span>
            <p className="text-xs text-[#9090C0] mt-1 font-sans font-light">Corporate credentials required.</p>
          </div>

          <div className="velra-glass-card p-8 sm:p-10 relative overflow-hidden border border-[#7B5EF8]/35 shadow-[0_24px_50px_rgba(11,8,22,0.8)]">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#7B5EF8]/20 rounded-full blur-2xl pointer-events-none" />

            {loginError && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#E8E8F0] uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#7B5EF8]" /> Email
                </label>
                <input type="email" required placeholder="Enter your email" value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0B0816] border border-[rgba(123,94,248,0.2)] rounded-xl text-white placeholder-[#7070A0]/40 text-sm focus:border-[#7B5EF8] focus:outline-none focus:ring-1 focus:ring-[#7B5EF8]/20"
                />
                <p className="text-[10px] text-[#9090C0]/50">Authorized personnel only</p>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#E8E8F0] uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-[#00F5C8]" /> Password
                </label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} required placeholder="Enter password" value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full pl-4 pr-12 py-3 bg-[#0B0816] border border-[rgba(123,94,248,0.2)] rounded-xl text-white placeholder-[#7070A0]/40 text-sm focus:border-[#7B5EF8] focus:outline-none focus:ring-1 focus:ring-[#7B5EF8]/20 font-mono"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9090C0] hover:text-white transition-colors cursor-pointer">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[10px] text-[#9090C0]/50 font-mono">Authorized personnel only</p>
              </div>

              <button type="submit"
                className="w-full py-3.5 rounded-xl font-bold bg-[#7B5EF8] hover:bg-[#8B70FA] text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg font-sans">
                Access Console
              </button>
            </form>
          </div>
        </div>

      ) : (
        <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">

          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border border-[rgba(123,94,248,0.25)] bg-[rgba(22,16,47,0.45)] backdrop-blur-md rounded-2xl gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00F5C8] animate-pulse" />
                <span className="text-xs uppercase tracking-wider font-bold text-[#00F5C8] font-mono">
                  {userRole === 'admin' ? 'Admin Control Node' : 'BDM Console'}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase border ${
                  userRole === 'admin'
                    ? 'bg-[#7B5EF8]/10 text-[#7B5EF8] border-[#7B5EF8]/30'
                    : 'bg-[#00F5C8]/10 text-[#00F5C8] border-[#00F5C8]/30'
                }`}>
                  {userRole}
                </span>
              </div>
              <h2 className="text-2xl font-display font-extrabold text-white mt-1">
                {userRole === 'admin' ? 'Lead Prospecting Center' : 'Website Specimen Gallery'}
              </h2>
              <p className="text-xs text-[#9090C0] mt-0.5">Logged in as: <span className="text-[#E8E8F0] font-mono font-medium">{currentUser}</span></p>
            </div>
            <button onClick={handleLogout}
              className="px-4 py-2 text-xs font-bold text-red-400 hover:text-white border border-[rgba(123,94,248,0.2)] hover:bg-red-500/10 bg-[rgba(22,16,47,0.3)] rounded-xl flex items-center gap-2 transition-colors cursor-pointer">
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>

          {/* ========== ADMIN VIEW ========== */}
          {userRole === 'admin' && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 space-y-6">
                  <div className="velra-glass-card p-6 space-y-6">
                    <div>
                      <h3 className="text-lg font-display font-extrabold text-white">Prospecting Parameters</h3>
                      <p className="text-xs text-[#9090C0] mt-0.5 font-light">Set filters before dispatching query.</p>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold tracking-wider uppercase font-mono text-[#E8E8F0]">Target Industry Category</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value as LeadCategory)}
                          className="w-full px-3.5 py-2.5 bg-[#0B0816] border border-[rgba(123,94,248,0.2)] rounded-xl text-xs text-[#E8E8F0] focus:border-[#7B5EF8] cursor-pointer">
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

                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold font-mono uppercase text-[#9090C0]">Fixed Radial Sweep</span>
                          <span className="text-xs font-bold text-[#7B5EF8] font-mono">2.0 KM (Locked)</span>
                        </div>
                        <div className="w-full h-2 bg-[#0B0816] rounded-full overflow-hidden border border-[rgba(123,94,248,0.2)]">
                          <div className="w-1/3 h-full bg-gradient-to-r from-[#7B5EF8] to-[#00F5C8] rounded-full" />
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-2">
                        <span className="text-[10px] font-bold tracking-wider text-[#9090C0] uppercase font-mono">Key Karachi Presets:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            { name: 'PECHS / Nursery', lat: 24.8615, lng: 67.0543 },
                            { name: 'Clifton Block 4', lat: 24.8138, lng: 67.0315 },
                            { name: 'Gulshan Nipa', lat: 24.9180, lng: 67.0970 },
                            { name: 'Saddar / Burns Rd', lat: 24.8601, lng: 67.0142 }
                          ].map((loc) => (
                            <button key={loc.name} type="button"
                              onClick={() => { setCoords({ lat: loc.lat, lng: loc.lng }); syncPositionOnMap(loc.lat, loc.lng); }}
                              className="px-2.5 py-1 text-[10px] bg-[#0B0816] hover:bg-[rgba(22,16,47,0.6)] border border-[rgba(123,94,248,0.2)] hover:border-[#7B5EF8]/60 text-[#E8E8F0] rounded-lg transition-all font-mono cursor-pointer">
                              {loc.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button onClick={handleFindBusinesses} disabled={isSearching}
                        className="w-full py-4 rounded-xl font-bold bg-[#7B5EF8] hover:bg-[#8B70FA] text-white flex items-center justify-center gap-2 transition-all cursor-pointer font-display select-none mt-6 outline-none">
                        {isSearching ? (
                          <><div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />Scanning Terrain...</>
                        ) : (
                          <><Database className="w-4 h-4" />Find Businesses</>
                        )}
                      </button>
                    </div>
                  </div>

                  {webhookStatus !== 'idle' && (
                    <div className="p-4 rounded-2xl border bg-indigo-500/10 border-indigo-500/30 text-[#00F5C8]">
                      <div className="flex items-start gap-3">
                        <Send className="w-4 h-4 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <span className="text-xs font-bold font-mono tracking-wide block uppercase">Mock Delivery Triggered</span>
                          <p className="text-[10px] leading-relaxed opacity-95 font-mono">{webhookMessage}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-2 space-y-6">
                  <div className="velra-glass-card p-4 space-y-3 relative overflow-hidden">
                    <div className="flex justify-between items-center px-2">
                      <span className="text-xs font-bold text-white flex items-center gap-2 font-mono uppercase">
                        <MapPin className="text-[#00F5C8] w-4 h-4 animate-bounce" />Interactive Terrain Map
                      </span>
                      <span className="text-[10px] text-[#9090C0] font-mono select-none">Click anywhere to drop pin</span>
                    </div>
                    <div ref={mapContainerRef} className="w-full h-[380px] rounded-xl border border-[rgba(123,94,248,0.25)] overflow-hidden" />
                  </div>
                </div>
              </div>

              <div className="velra-glass-card p-6 overflow-hidden">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
                  <div>
                    <h3 className="text-lg font-display font-extrabold text-white">Prospect Search Hub Outputs</h3>
                    <p className="text-xs text-[#9090C0] mt-0.5">Results near: {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}</p>
                  </div>
                  {searchResults.length > 0 && (
                    <span className="px-2.5 py-1 rounded bg-[#00F5C8]/10 text-[#00F5C8] font-mono text-xs border border-[#00F5C8]/35">
                      Found: {searchResults.length} Leads
                    </span>
                  )}
                </div>

                {searchResults.length === 0 ? (
                  <div className="text-center py-16 px-4 bg-[#0B0816]/50 border border-dashed border-[rgba(123,94,248,0.25)] rounded-2xl flex flex-col items-center">
                    <Database className="w-12 h-12 text-[#9090C0] mb-4 stroke-1" />
                    <span className="text-base font-bold text-[#E8E8F0] tracking-wide font-mono block uppercase">Run a search to see results</span>
                    <p className="text-xs text-[#9090C0] max-w-sm mt-2 font-sans font-light">Position the map marker and click "Find Businesses".</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-[rgba(123,94,248,0.25)] text-[#9090C0] font-mono uppercase font-bold tracking-wider">
                          <th className="py-4 px-4">Business Name</th>
                          <th className="py-4 px-4">Category</th>
                          <th className="py-4 px-4">Address</th>
                          <th className="py-4 px-4">Phone</th>
                          <th className="py-4 px-4">Email</th>
                          <th className="py-4 px-4">Rating</th>
                          <th className="py-4 px-4">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchResults.map((lead) => (
                          <tr key={lead.id} className="border-b border-[rgba(123,94,248,0.15)] hover:bg-[rgba(123,94,248,0.06)] transition-colors">
                            <td className="py-4 px-4 font-bold text-white font-display text-sm">{lead.name}</td>
                            <td className="py-4 px-4"><span className="px-2.5 py-1 rounded-full bg-[#0B0816] border border-[rgba(123,94,248,0.2)] text-[#9090C0] font-mono text-[10px]">{lead.category}</span></td>
                            <td className="py-4 px-4 text-[#9090C0] max-w-[200px] truncate">{lead.address}</td>
                            <td className="py-4 px-4 font-mono text-[#E8E8F0] whitespace-nowrap">{lead.phone}</td>
                            <td className="py-4 px-4 text-[#9090C0] truncate">{lead.email}</td>
                            <td className="py-4 px-4"><div className="flex items-center gap-1.5 font-mono"><Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /><span>{lead.rating}</span></div></td>
                            <td className="py-4 px-4">
                              <span className={`px-2 py-0.5 rounded-full font-mono text-[9px] font-extrabold uppercase ${
                                lead.status === 'Deal Closed' ? 'bg-[#00F5C8]/10 text-[#00F5C8] border border-[#00F5C8]/30'
                                : lead.status === 'In Progress' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
                                : lead.status === 'Not Interested' ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                                : 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
                              }`}>{lead.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Admin also sees themes with add/delete */}
              <div className="velra-glass-card p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-display font-extrabold text-white">Website Specimen Manager</h3>
                    <p className="text-xs text-[#9090C0] mt-0.5">Add or remove themes visible to BDM team.</p>
                  </div>
                  <button onClick={() => setShowAddForm(!showAddForm)}
                    className="px-4 py-2 text-xs font-bold text-white bg-[#7B5EF8] hover:bg-[#8B70FA] rounded-xl flex items-center gap-2 transition-all cursor-pointer">
                    <Plus className="w-3.5 h-3.5" /> Add Theme
                  </button>
                </div>

                {showAddForm && (
                  <form onSubmit={handleAddTheme} className="mb-6 p-5 rounded-2xl border border-[rgba(123,94,248,0.25)] bg-[rgba(22,16,47,0.3)] space-y-4">
                    <h4 className="text-sm font-bold text-white font-display">New Theme</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { label: 'Theme Name', key: 'name', placeholder: 'e.g. EduPrime' },
                        { label: 'Category', key: 'category', placeholder: 'e.g. Schools & Colleges' },
                        { label: 'Preview URL', key: 'preview_url', placeholder: 'https://...' },
                        { label: 'Thumbnail URL', key: 'thumbnail_url', placeholder: 'https://...' },
                      ].map((field) => (
                        <div key={field.key} className="space-y-1">
                          <label className="text-[10px] font-bold uppercase font-mono text-[#9090C0]">{field.label}</label>
                          <input type="text" required placeholder={field.placeholder}
                            value={(newTheme as any)[field.key]}
                            onChange={(e) => setNewTheme({ ...newTheme, [field.key]: e.target.value })}
                            className="w-full px-3 py-2 bg-[#0B0816] border border-[rgba(123,94,248,0.2)] rounded-xl text-white text-xs focus:border-[#7B5EF8] focus:outline-none"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase font-mono text-[#9090C0]">Description</label>
                      <input type="text" required placeholder="Brief description of this theme"
                        value={newTheme.description}
                        onChange={(e) => setNewTheme({ ...newTheme, description: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0B0816] border border-[rgba(123,94,248,0.2)] rounded-xl text-white text-xs focus:border-[#7B5EF8] focus:outline-none"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button type="submit" disabled={addingTheme}
                        className="px-4 py-2 text-xs font-bold text-white bg-[#7B5EF8] hover:bg-[#8B70FA] rounded-xl flex items-center gap-2 cursor-pointer transition-all">
                        {addingTheme ? 'Saving...' : 'Save Theme'}
                      </button>
                      <button type="button" onClick={() => setShowAddForm(false)}
                        className="px-4 py-2 text-xs font-bold text-[#9090C0] border border-[rgba(123,94,248,0.2)] rounded-xl cursor-pointer hover:text-white transition-all">
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {themesLoading ? (
                    <p className="text-xs text-[#9090C0] font-mono col-span-3">Loading themes...</p>
                  ) : themes.map((theme) => (
                    <div key={theme.id} className="border border-[rgba(123,94,248,0.2)] rounded-2xl overflow-hidden bg-[rgba(22,16,47,0.3)] hover:border-[#7B5EF8]/50 transition-all group">
                      <div className="relative">
                        <img src={theme.thumbnail_url} alt={theme.name} className="w-full h-36 object-cover" />
                        <button onClick={() => handleDeleteTheme(theme.id)}
                          className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-500 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="flex justify-between items-start">
                          <span className="font-bold text-white text-sm font-display">{theme.name}</span>
                          <span className="text-[10px] text-[#00F5C8] font-mono border border-[#00F5C8]/30 px-2 py-0.5 rounded-full">{theme.category}</span>
                        </div>
                        <p className="text-xs text-[#9090C0] leading-relaxed">{theme.description}</p>
                        <button onClick={() => setPreviewTheme(theme)}
                          className="w-full py-2 mt-1 text-xs font-bold text-white bg-[#7B5EF8]/20 hover:bg-[#7B5EF8]/40 border border-[#7B5EF8]/30 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer">
                          <Globe className="w-3.5 h-3.5" /> Preview Site
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ========== BDM VIEW ========== */}
          {userRole === 'bdm' && (
            <div className="space-y-6">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-sm font-bold text-[#00F5C8] uppercase tracking-wider font-mono">Website Specimens</span>
                <h3 className="mt-2 text-3xl font-display font-extrabold text-white">Client Pitch Gallery</h3>
                <p className="mt-2 text-sm text-[#9090C0]">Select a specimen to preview in fullscreen and pitch to your client.</p>
              </div>

              {themesLoading ? (
                <p className="text-center text-xs text-[#9090C0] font-mono py-12">Loading specimens...</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {themes.map((theme) => (
                    <div key={theme.id} className="border border-[rgba(123,94,248,0.2)] rounded-2xl overflow-hidden bg-[rgba(22,16,47,0.3)] hover:border-[#7B5EF8]/60 hover:shadow-[0_12px_40px_rgba(123,94,248,0.2)] transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
                      onClick={() => setPreviewTheme(theme)}>
                      <div className="relative overflow-hidden">
                        <img src={theme.thumbnail_url} alt={theme.name} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0816]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                          <span className="text-white text-xs font-bold font-mono flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5" /> Click to Preview
                          </span>
                        </div>
                      </div>
                      <div className="p-5 space-y-2">
                        <div className="flex justify-between items-start">
                          <span className="font-bold text-white text-base font-display">{theme.name}</span>
                          <span className="text-[10px] text-[#00F5C8] font-mono border border-[#00F5C8]/30 px-2 py-0.5 rounded-full">{theme.category}</span>
                        </div>
                        <p className="text-xs text-[#9090C0] leading-relaxed">{theme.description}</p>
                        <button className="w-full py-2.5 mt-2 text-xs font-bold text-white bg-[#7B5EF8] hover:bg-[#8B70FA] rounded-xl flex items-center justify-center gap-2 transition-all">
                          <Globe className="w-3.5 h-3.5" /> Open Full Preview
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      )}
    </div>
  );
}