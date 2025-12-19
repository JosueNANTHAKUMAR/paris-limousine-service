export const LOCATIONS = [
    { id: 'paris', label: 'Paris (Centre)' },
    { id: 'cdg', label: 'CDG Airport' },
    { id: 'orly', label: 'Orly Airport' },
    { id: 'disney', label: 'Disneyland Paris' },
    { id: 'versailles', label: 'Versailles' }
] as const;

export type LocationId = typeof LOCATIONS[number]['id'];

export interface FixedRates {
    cdg?: number;
    orly?: number;
    disney?: number;
    versailles?: number;
    paris?: number; // For reverse trips or specific cases
    cdg_orly?: number; // Specific inter-airport transfer
}

export interface Vehicle {
    id: string;
    name: string;
    category: string;
    image: string;
    description: string;
    capacity: { pax: number; bags: number };
    baseRate: number; // Hourly rate
    fixedRates: FixedRates;
}

export const FLEET: Vehicle[] = [
    {
        id: 'e-class',
        name: 'Mercedes Classe E',
        category: 'Business',
        image: '/images/e-class.png', // Placeholder
        description: 'The perfect executive level chauffeur car for all types of business trips and airport transfers.',
        capacity: { pax: 4, bags: 3 }, // Inferred from "1 To 4 Personnes"
        baseRate: 65,
        fixedRates: {
            cdg: 110,
            versailles: 110,
            orly: 90,
            disney: 140,
            cdg_orly: 120,
        }
    },
    {
        id: 'v-class',
        name: 'Mercedes Classe V',
        category: 'Van',
        image: '/images/v-class.png', // Placeholder
        description: 'Luxury transport solutions for groups and families.',
        capacity: { pax: 7, bags: 7 }, // Inferred from "1 To 7 Personnes"
        baseRate: 70,
        fixedRates: {
            cdg: 130,
            versailles: 130,
            orly: 100,
            disney: 160,
            cdg_orly: 150,
        }
    },
    {
        id: 's-class',
        name: 'Mercedes Classe S',
        category: 'First Class',
        image: '/images/s-class.png', // Placeholder
        description: 'Expect high-flying service and style with our all-inclusive airport meet.',
        capacity: { pax: 3, bags: 3 }, // 1 To 3 Personnes
        baseRate: 100,
        fixedRates: {
            cdg: 200,
            versailles: 200,
            orly: 150,
            disney: 220,
            cdg_orly: 180,
        }
    }
];

export const NAV_LINKS = [
    { href: '/', label: 'Home' },
    { href: '#destinations', label: 'Destinations' },
    { href: '#services', label: 'Services' },
    { href: '#fleet', label: 'Fleet' },
    { href: '#packages', label: 'Packages' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
];

export const CONTACT_INFO = {
    address: "329 Queensberry Street, North Melbourne VIC 3051, Australia", // Placeholder from site
    email: "support@drive.com", // Placeholder from site
    phone: "+99 (0) 123 456 78 90", // Placeholder from site
    copyright: "© Copyright 2012 - 2025 • Paris Taxi • All Rights Reserved"
};
