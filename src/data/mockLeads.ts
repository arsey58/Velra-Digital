/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Lead, LeadCategory } from '../types';

export const KARACHI_LEAD_DATABASE: Record<LeadCategory, Omit<Lead, 'id'>[]> = {
  'Food & Restaurants': [
    {
      name: 'Delhi Javed Nihari & Biryani',
      category: 'Food & Restaurants',
      address: 'Main Burns Road, Food Street, Saddar, Karachi',
      phone: '+92 321 8293710',
      email: 'info@delhijavednihari.com',
      rating: 4.6,
      status: 'Uncontacted',
    },
    {
      name: 'Clifton Chai Shai Bistro',
      category: 'Food & Restaurants',
      address: 'Block 4, Scheme 5, Clifton, Karachi',
      phone: '+92 333 9204822',
      email: 'contact@chaishai.pk',
      rating: 4.3,
      status: 'In Progress',
    },
    {
      name: 'Gulshan Biryani Express',
      category: 'Food & Restaurants',
      address: 'Block 13-C, Gulshan-e-Iqbal, Karachi',
      phone: '+92 345 2891104',
      email: 'gulshan.biryani@gmail.com',
      rating: 4.1,
      status: 'Uncontacted',
    },
    {
      name: 'Kababish PECHS Hub',
      category: 'Food & Restaurants',
      address: 'Allama Iqbal Road, Block 2, PECHS, Karachi',
      phone: '+92 300 8274011',
      email: 'pechs@kababish.com.pk',
      rating: 4.5,
      status: 'Deal Closed',
    },
    {
      name: 'The Karachiite Burger Joint',
      category: 'Food & Restaurants',
      address: 'Badar Commercial, Phase 5, DHA, Karachi',
      phone: '+92 315 2049182',
      email: 'orders@thekarachiite.pk',
      rating: 4.4,
      status: 'Not Interested',
    }
  ],
  'Schools': [
    {
      name: 'Bright Future School Campus 2',
      category: 'Schools',
      address: 'Block 7, Gulshan-e-Iqbal, Karachi',
      phone: '+92 321 2101928',
      email: 'admissions@brightfuture.edu.pk',
      rating: 4.2,
      status: 'Uncontacted',
    },
    {
      name: 'PECHS Grammar Day School',
      category: 'Schools',
      address: 'Block 6, PECHS, Near McDonald\'s, Karachi',
      phone: '+92 300 2938102',
      email: 'info@pechsgrammarschool.edu',
      rating: 3.9,
      status: 'In Progress',
    },
    {
      name: 'St. Lawrence Girls High School',
      category: 'Schools',
      address: 'Amil Colony, Soldier Bazar, Karachi',
      phone: '+92 21 32258102',
      email: 'contact@stlawrence.edu.pk',
      rating: 4.5,
      status: 'Deal Closed',
    },
    {
      name: 'Little Stars Academy Lyari',
      category: 'Schools',
      address: 'Chakiwara Main Road, Lyari, Karachi',
      phone: '+92 334 3381021',
      email: 'lyari.stars@gmail.com',
      rating: 3.8,
      status: 'Uncontacted',
    }
  ],
  'Salons & Barbers': [
    {
      name: 'Karachi Gents Haircut & Spa',
      category: 'Salons & Barbers',
      address: 'Shop 4, Tariq Road Plaza, PECHS, Karachi',
      phone: '+92 312 2894711',
      email: 'tariqgents@gmail.com',
      rating: 4.0,
      status: 'In Progress',
    },
    {
      name: 'Sadaf Bridal Hair & Makeover',
      category: 'Salons & Barbers',
      address: 'Block 3, Gulshan-e-Iqbal, Opp. Disco Bakery, Karachi',
      phone: '+92 331 9283712',
      email: 'sadafsalon@outlook.com',
      rating: 4.4,
      status: 'Uncontacted',
    },
    {
      name: 'Zamzama Executive Barber Lounge',
      category: 'Salons & Barbers',
      address: 'Street 4, Zamzama Commercial, DHA Phase 5, Karachi',
      phone: '+92 345 8291032',
      email: 'zamzamabarber@lounge.pk',
      rating: 4.7,
      status: 'Deal Closed',
    }
  ],
  'Coaching Centers': [
    {
      name: 'Anees Memorial Intermediate Academy',
      category: 'Coaching Centers',
      address: 'Shahrah-e-Faisal Road, Nursery, PECHS, Karachi',
      phone: '+92 321 9920102',
      email: 'admissions@aneesmemorial.edu.pk',
      rating: 4.6,
      status: 'In Progress',
    },
    {
      name: 'Karachi Students Science Academy',
      category: 'Coaching Centers',
      address: 'Block N, North Nazimabad, Karachi',
      phone: '+92 300 9281722',
      email: 'northacademy@kss.pk',
      rating: 4.1,
      status: 'Uncontacted',
    },
    {
      name: 'Apex Commerce & IT Institute',
      category: 'Coaching Centers',
      address: 'Johar Chowrangi, Block 12, Gulistan-e-Johar, Karachi',
      phone: '+92 336 2913812',
      email: 'apexcom.johar@gmail.com',
      rating: 4.3,
      status: 'Uncontacted',
    }
  ],
  'Fashion Shops': [
    {
      name: 'Karachi Kurti Emporium',
      category: 'Fashion Shops',
      address: 'Shop 102, Zainab Market, Saddar, Karachi',
      phone: '+92 312 3748192',
      email: 'zainabkurti@gmail.com',
      rating: 3.7,
      status: 'Uncontacted',
    },
    {
      name: 'Zeeshan Branded Sherwani House',
      category: 'Fashion Shops',
      address: 'Main Tariq Road Shopping District, Karachi',
      phone: '+92 322 8391024',
      email: 'zeeshan sherwani@yahoo.com',
      rating: 4.5,
      status: 'In Progress',
    },
    {
      name: 'Kids Wear Depot',
      category: 'Fashion Shops',
      address: 'Dolmen Mall, Block 3, Clifton, Karachi',
      phone: '+92 345 1928371',
      email: 'clifton.sales@kidswear.pk',
      rating: 4.2,
      status: 'Uncontacted',
    }
  ],
  'Milk & Grocery': [
    {
      name: 'Subhanallah Dairy & Milk Shop',
      category: 'Milk & Grocery',
      address: 'Jamshed Road No. 2, Jamshed Quarters, Karachi',
      phone: '+92 334 8291722',
      email: 'subhanallahdairy@gmail.com',
      rating: 4.3,
      status: 'Uncontacted',
    },
    {
      name: 'Madina Grocery & General Store',
      category: 'Milk & Grocery',
      address: 'Block 16, Federal B Area, Karachi',
      phone: '+92 315 2938102',
      email: 'madinagrocery.fb@outlook.com',
      rating: 4.0,
      status: 'In Progress',
    },
    {
      name: 'DHA Fresh Express Grocers',
      category: 'Milk & Grocery',
      address: 'Khayaban-e-Muslim, Phase 6, DHA, Karachi',
      phone: '+92 301 2289410',
      email: 'muslimexpress@grocers.pk',
      rating: 4.6,
      status: 'Deal Closed',
    }
  ],
  'Government/State Offices': [
    {
      name: 'KMC Municipal Zonal Office West',
      category: 'Government/State Offices',
      address: 'Orangi Town Office, Karachi West, Karachi',
      phone: '+92 21 99201021',
      email: 'info@kmc.gos.pk',
      rating: 3.5,
      status: 'Uncontacted',
    },
    {
      name: 'Sindh Revenue Board District East',
      category: 'Government/State Offices',
      address: 'Civic Centre Road, Gulshan-e-Iqbal, Karachi',
      phone: '+92 21 99231802',
      email: 'support@srb.gos.pk',
      rating: 3.9,
      status: 'In Progress',
    }
  ],
  'Other': [
    {
      name: 'Al-Madina Motor Workshop',
      category: 'Other',
      address: 'Main Korangi Road, Defence View, Karachi',
      phone: '+92 333 8291023',
      email: 'almadinamotors@gmail.com',
      rating: 4.4,
      status: 'Uncontacted',
    },
    {
      name: 'Rehman Hardware & Plumbing Supplies',
      category: 'Other',
      address: 'Water Pump Area, Block 16, Federal B Area, Karachi',
      phone: '+92 321 8294711',
      email: 'rehmanhardware@yahoo.com',
      rating: 4.1,
      status: 'Deal Closed',
    },
    {
      name: 'Sabeel Diagnostic Lab & Clinic',
      category: 'Other',
      address: 'Main Liaquatabad No. 4, Karachi',
      phone: '+92 300 2948102',
      email: 'sabeellabs@gmail.com',
      rating: 4.2,
      status: 'Uncontacted',
    }
  ],
};

/**
 * Generates dynamic leads by looking up our library, applying randomized coordinate tags
 * relative to the dropped pin coordinates, and returning unique IDs.
 */
export function generateMockLeads(category: LeadCategory, lat: number, lng: number): Lead[] {
  const library = KARACHI_LEAD_DATABASE[category] || KARACHI_LEAD_DATABASE['Other'];
  
  return library.map((item, index) => {
    // Add randomized coordinate spread inside a 2km bounding box (approx 0.015 degrees)
    const offsetLat = lat + (Math.random() - 0.5) * 0.018;
    const offsetLng = lng + (Math.random() - 0.5) * 0.018;
    
    // Select dynamic status for variety
    const statusPool: Lead['status'][] = ['Uncontacted', 'In Progress', 'Deal Closed', 'Not Interested'];
    const resolvedStatus = index === 0 ? 'Uncontacted' : statusPool[Math.floor(Math.random() * statusPool.length)];
    
    // Approximate a localized address supplement
    let localizedAddress = item.address;
    if (Math.abs(lat - 24.8607) < 0.02) {
      localizedAddress = `${item.name === 'Delhi Javed Nihari & Biryani' ? item.address : item.address + ' (Near Quaid Mazar PECHS Area)'}`;
    } else if (Math.abs(lat - 24.8138) < 0.02) {
      localizedAddress = `${item.address} (Within Clifton/DHA Block)`;
    } else if (Math.abs(lat - 24.9180) < 0.02) {
      localizedAddress = `${item.address} (Gulshan / Federal territory)`;
    }

    return {
      id: `${category.toLowerCase().replace(/\s+/g, '-')}-${index + 1}-${Math.floor(Math.random() * 900) + 100}`,
      name: item.name,
      category: item.category,
      address: localizedAddress,
      phone: item.phone,
      email: item.email,
      rating: Number((item.rating + (Math.random() * 0.4 - 0.2)).toFixed(1)), // subtle rating variance
      status: resolvedStatus,
    };
  });
}
