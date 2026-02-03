export const LOCATIONS = [
    { id: 'paris', label: 'Paris' },
    { id: 'cdg', label: 'CDG Airport' },
    { id: 'orly', label: 'Orly Airport' },
    { id: 'le_bourget', label: 'Le Bourget Airport' },
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
    le_bourget?: number;
    cdg_orly?: number; // Specific inter-airport transfer
    cdg_bourget?: number;
    cdg_disney?: number;
    cdg_versailles?: number;
    orly_bourget?: number;
    orly_disney?: number;
    orly_versailles?: number;
    bourget_disney?: number;
    bourget_versailles?: number;
    disney_versailles?: number;
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
            le_bourget: 110,
            disney: 110,
            cdg_orly: 120,
            cdg_bourget: 70,
            cdg_disney: 110,
            cdg_versailles: 140,
            orly_bourget: 120,
            orly_disney: 120,
            orly_versailles: 120,
            bourget_disney: 110,
            bourget_versailles: 140,
            disney_versailles: 140,
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
            le_bourget: 130,
            disney: 130,
            cdg_orly: 150,
            cdg_bourget: 80,
            cdg_disney: 130,
            cdg_versailles: 160,
            orly_bourget: 150,
            orly_disney: 150,
            orly_versailles: 150,
            bourget_disney: 130,
            bourget_versailles: 160,
            disney_versailles: 160,
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
            le_bourget: 200,
            disney: 200,
            cdg_orly: 180,
            cdg_bourget: 100,
            cdg_disney: 200,
            cdg_versailles: 220,
            orly_bourget: 180,
            orly_disney: 180,
            orly_versailles: 180,
            bourget_disney: 200,
            bourget_versailles: 220,
            disney_versailles: 220,
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
    address: "92 Avenue Henri Martin, 75016 Paris",
    email: "parislimousinetransfer@gmail.com",
    phone: "+33 6 95 83 35 71",
    copyright: "© Copyright 2012 - 2025 • Paris Taxi • All Rights Reserved"
};
