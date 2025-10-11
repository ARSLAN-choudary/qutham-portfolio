import toast from "react-hot-toast";

// lib/services/locationTimeService.ts
export interface LocationData {
    city: string;
    country: string;
    timezone: string;
}

export interface GreetingData {
    englishGreeting: string;
    nativeGreeting: string;
    hour: number;
    isDaytime: boolean;
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
}

class LocationTimeService {
    private ipinfoToken = '94ae7398d43255';

    async getLocation(): Promise<LocationData> {
        try {
            const response = await fetch(`https://ipinfo.io/json?token=${this.ipinfoToken}`);
            if (!response.ok) throw new Error('Failed to fetch location');

            const data = await response.json();
       
            return {
                city: data.country === 'HK' ? 'Hong Kong' : data.city,
                country: data.country,
                timezone: data.timezone
            };
        } catch (error) {
            
            toast.error("Sorry, Error fetching location");
            throw error;
        }
    }

    getCurrentHour(timezone: string): number {
        try {
      
            const now = new Date();
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                hour: 'numeric',
                hour12: false,
            });

            const parts = formatter.formatToParts(now);
            const hourPart = parts.find(part => part.type === 'hour');
            const hour = hourPart ? parseInt(hourPart.value) : now.getHours();

        
            return hour;

        } catch (error) {
          
            toast.error("Sorry, Error getting hour from timezone, using local time");
           
            return new Date().getHours();
        }
    }

    getGreetingData(hour: number, countryCode: string): GreetingData {
   
        let englishGreeting = '';
        let timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night' = 'morning';
        let isDaytime = true;

        if (hour >= 5 && hour < 12) {
            englishGreeting = 'Good Morning';
            timeOfDay = 'morning';
            isDaytime = true;
        } else if (hour >= 12 && hour < 17) {
            englishGreeting = 'Good Afternoon';
            timeOfDay = 'afternoon';
            isDaytime = true;
        } else if (hour >= 17 && hour < 22) {
            englishGreeting = 'Good Evening';
            timeOfDay = 'evening';
            isDaytime = false;
        } else {
            englishGreeting = 'Good Night';
            timeOfDay = 'night';
            isDaytime = false;
        }

        const nativeGreeting = this.getNativeGreeting(englishGreeting, countryCode);

      
        return {
            englishGreeting,
            nativeGreeting,
            hour,
            isDaytime,
            timeOfDay
        };
    }

    private getNativeGreeting(englishGreeting: string, countryCode: string): string {
        const greetings: { [key: string]: { [key: string]: string } } = {
            'Good Morning': {
                'PK': 'صبح بخیر', // Urdu - Pakistan
                'IN': 'सुप्रभात', // Hindi - India
                'AE': 'صباح الخير', // Arabic - UAE
                'SA': 'صباح الخير', // Arabic - Saudi Arabia
                'CN': '早上好', // Chinese - China
                'HK': '早晨', // Cantonese - Hong Kong
                'JP': 'おはよう', // Japanese - Japan
                'KR': '안녕하세요', // Korean - South Korea
                'FR': 'Bonjour', // French - France
                'DE': 'Guten Morgen', // German - Germany
                'ES': 'Buenos días', // Spanish - Spain
                'IT': 'Buongiorno', // Italian - Italy
                'BR': 'Bom dia', // Portuguese - Brazil
                'RU': 'Доброе утро', // Russian - Russia
                'TR': 'Günaydın', // Turkish - Turkey
                'NL': 'Goedemorgen', // Dutch - Netherlands
            },
            'Good Afternoon': {
                'PK': 'دوپہر بخیر',
                'IN': 'शुभ दोपहर',
                'AE': 'مساء الخير',
                'SA': 'مساء الخير',
                'CN': '下午好',
                'HK': '午安',
                'JP': 'こんにちは',
                'KR': '안녕하세요',
                'FR': 'Bon après-midi',
                'DE': 'Guten Tag',
                'ES': 'Buenas tardes',
                'IT': 'Buon pomeriggio',
                'BR': 'Boa tarde',
                'RU': 'Добрый день',
                'TR': 'Tünaydın',
                'NL': 'Goedemiddag',
            },
            'Good Evening': {
                'PK': 'شام بخیر',
                'IN': 'शुभ संध्या',
                'AE': 'مساء الخير',
                'SA': 'مساء الخير',
                'CN': '晚上好',
                'HK': '晚安',
                'JP': 'こんばんは',
                'KR': '안녕하세요',
                'FR': 'Bonsoir',
                'DE': 'Guten Abend',
                'ES': 'Buenas noches',
                'IT': 'Buona sera',
                'BR': 'Boa noite',
                'RU': 'Добрый вечер',
                'TR': 'İyi akşamlar',
                'NL': 'Goedenavond',
            },
            'Good Night': {
                'PK': 'شب بخیر',
                'IN': 'शुभ रात्रि',
                'AE': 'تصبح على خير',
                'SA': 'تصبح على خير',
                'CN': '晚安',
                'HK': '晚安',
                'JP': 'おやすみなさい',
                'KR': '안녕히 주무세요',
                'FR': 'Bonne nuit',
                'DE': 'Gute Nacht',
                'ES': 'Buenas noches',
                'IT': 'Buona notte',
                'BR': 'Boa noite',
                'RU': 'Спокойной ночи',
                'TR': 'İyi geceler',
                'NL': 'Goedenacht',
            }
        };

        const native = greetings[englishGreeting]?.[countryCode];
        return native || englishGreeting;
    }
}

export const locationTimeService = new LocationTimeService();