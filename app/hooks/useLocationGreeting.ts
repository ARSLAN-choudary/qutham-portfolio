// hooks/useLocationGreeting.ts
import { useState, useEffect } from 'react';
import { locationTimeService, GreetingData, LocationData } from '../lib/services/localizationService';
import toast from 'react-hot-toast';

interface UseLocationGreetingReturn {
    location: LocationData | null;
    greeting: GreetingData | null;
    isLoading: boolean;
    error: string | null;
}

export const useLocationGreeting = (): UseLocationGreetingReturn => {
    const [location, setLocation] = useState<LocationData | null>(null);
    const [greeting, setGreeting] = useState<GreetingData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);

              
                // Get location
                const locationData = await locationTimeService.getLocation();
                setLocation(locationData);
                    const currentHour = locationTimeService.getCurrentHour(locationData.timezone);
           
                // Get greeting data
                const greetingData = locationTimeService.getGreetingData(currentHour, locationData.country);
                setGreeting(greetingData);
          
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to load location data';
                setError(errorMessage);
               
                toast.error("Sorry, Error in useLocationGreeting");
                // Fallback: Use local time
                const fallbackHour = new Date().getHours();
                const fallbackGreeting = locationTimeService.getGreetingData(fallbackHour, 'US');
                setGreeting(fallbackGreeting);
                setLocation({ city: 'Local', country: 'US', timezone: 'local' });
            } finally {
                setIsLoading(false);
             
            }
        };

        fetchData();
    }, []);

    return {
        location,
        greeting,
        isLoading,
        error
    };
};