
// Mock data from constants.ts
const FLEET = [
    {
        id: 'v-class',
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
    }
];

// Mock hook logic
function checkPrice(departure, arrival, vehicleId) {
    const vehicle = FLEET.find((v) => v.id === vehicleId);
    if (!vehicle) {
        console.log('Vehicle not found');
        return;
    }

    console.log(`Checking mock quote for Dep: ${departure}, Arr: ${arrival}, Vehicle: ${vehicleId}`);

    let price;

    if (departure === 'paris') {
        price = vehicle.fixedRates[arrival];
    }
    else if (arrival === 'paris') {
        price = vehicle.fixedRates[departure];
    }

    // Helper from useQuote.ts
    const checkRate = (loc1, loc2, rateKey) => {
        const match = (departure === loc1 && arrival === loc2) || (departure === loc2 && arrival === loc1);
        if (match) console.log(`Matched route ${loc1}<->${loc2} using key ${rateKey}. Value: ${vehicle.fixedRates[rateKey]}`);
        return match ? vehicle.fixedRates[rateKey] : undefined;
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

    console.log('Final Price:', price);
}

// Test case
checkPrice('cdg', 'disney', 'v-class');
