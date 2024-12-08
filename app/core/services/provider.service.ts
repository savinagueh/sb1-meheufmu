import { Observable } from '@nativescript/core';
import { Provider } from '../models/transfer.model';

export class ProviderService extends Observable {
  private providers: Provider[] = [
    {
      id: 'mpesa',
      name: 'M-Pesa',
      logo: '~/assets/providers/mpesa.png',
      countries: ['KE', 'TZ', 'GH'],
      minimumAmount: 100,
      maximumAmount: 150000
    },
    {
      id: 'orange',
      name: 'Orange Money',
      logo: '~/assets/providers/orange.png',
      countries: ['SN', 'CI', 'ML'],
      minimumAmount: 500,
      maximumAmount: 200000
    },
    {
      id: 'mtn',
      name: 'MTN Mobile Money',
      logo: '~/assets/providers/mtn.png',
      countries: ['NG', 'UG', 'ZA'],
      minimumAmount: 1000,
      maximumAmount: 300000
    }
  ];

  getProviders(countryCode: string): Provider[] {
    return this.providers.filter(provider => 
      provider.countries.includes(countryCode)
    );
  }

  getProviderById(providerId: string): Provider | undefined {
    return this.providers.find(provider => provider.id === providerId);
  }
}