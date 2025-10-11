// components/DebugGreeting.tsx
'use client';

import { useLocationGreeting } from '../../hooks/useLocationGreeting';

export const DebugGreeting = () => {
    const { location, greeting, isLoading, error } = useLocationGreeting();

    if (isLoading) {
        return (
            <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
                <div className="font-bold">Loading greetings...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-100 border border-red-400 rounded">
                <div className="font-bold">Error:</div>
                <div>{error}</div>
            </div>
        );
    }

    return (
        <div className="p-4 bg-green-100 border border-green-400 rounded">
            <div className="font-bold">Debug Information:</div>
            <div>Location: {location?.city}, {location?.country}</div>
            <div>Timezone: {location?.timezone}</div>
            <div>Current Hour: {greeting?.hour}</div>
            <div>English: {greeting?.englishGreeting}</div>
            <div>Native: {greeting?.nativeGreeting}</div>
            <div>Time of Day: {greeting?.timeOfDay}</div>
            <div>Is Daytime: {greeting?.isDaytime ? 'Yes' : 'No'}</div>
        </div>
    );
};