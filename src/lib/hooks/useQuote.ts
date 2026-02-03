import { useMemo } from 'react';
import { FLEET, LocationId, FixedRates } from '../constants';

interface QuoteRequest {
    departure: LocationId | '';
    arrival: LocationId | '';
    vehicleId: string;
}

interface QuoteResult {
    price: number | null; // null means "Sur devis" or "Hourly"
    isFixedRate: boolean;
    rateType: 'fixed' | 'hourly' | 'custom';
}

export function useQuote({ departure, arrival, vehicleId }: QuoteRequest): QuoteResult {
    return useMemo(() => {
        if (!departure || !arrival || !vehicleId) {
            return { price: null, isFixedRate: false, rateType: 'custom' };
        }

        const vehicle = FLEET.find((v) => v.id === vehicleId);
        if (!vehicle) {
            return { price: null, isFixedRate: false, rateType: 'custom' };
        }

        // Check for fixed rates
        // The fixedRates object in FLEET is structured as { destination: price } assuming start is Paris
        // We need to handle:
        // 1. Paris -> Destination (Direct lookup)
        // 2. Destination -> Paris (Reverse lookup, assuming symmetric pricing)

        let price: number | undefined;

        // Case 1: Departure is Paris
        if (departure === 'paris') {
            // We check if the arrival is a key in fixedRates
            // We need to cast arrival to keyof FixedRates to satisfy TS, 
            // but we also need to check if it actually exists in the object
            price = vehicle.fixedRates[arrival as keyof FixedRates];
        }

        // Case 2: Arrival is Paris (Reverse)
        else if (arrival === 'paris') {
            price = vehicle.fixedRates[departure as keyof FixedRates];
        }

        // Case 3: Special Inter-location rates (e.g. CDG <-> Orly)
        // We define a helper to check bidirectional keys
        const checkRate = (loc1: string, loc2: string, rateKey: keyof FixedRates) => {
            return (departure === loc1 && arrival === loc2) || (departure === loc2 && arrival === loc1) ? vehicle.fixedRates[rateKey] : undefined;
        };

        const interLocationPrice =
            checkRate('cdg', 'orly', 'cdg_orly') ||
            checkRate('cdg', 'le_bourget', 'cdg_bourget') ||
            checkRate('cdg', 'disney', 'cdg_disney') ||
            checkRate('cdg', 'versailles', 'cdg_versailles') ||
            checkRate('orly', 'le_bourget', 'orly_bourget') ||
            checkRate('orly', 'disney', 'orly_disney') ||
            checkRate('orly', 'versailles', 'orly_versailles') ||
            checkRate('le_bourget', 'disney', 'bourget_disney') ||
            checkRate('le_bourget', 'versailles', 'bourget_versailles') ||
            checkRate('disney', 'versailles', 'disney_versailles');

        if (interLocationPrice !== undefined) {
            price = interLocationPrice;
        }

        if (price !== undefined) {
            return { price, isFixedRate: true, rateType: 'fixed' };
        }

        // If no fixed price found, it's likely an hourly or custom quote scenario
        // For the purpose of the calculator, if we select "Hourly" mode (which might be a separate toggle in UI),
        // we would return the baseRate. 
        // But based on just locations, if it's not a fixed route, return null (Quote).

        return { price: null, isFixedRate: false, rateType: 'custom' };

    }, [departure, arrival, vehicleId]);
}
