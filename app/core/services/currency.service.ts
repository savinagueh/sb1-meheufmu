import { Observable } from '@nativescript/core';
import axios from 'axios';
import { ExchangeRate } from '../models/transfer.model';

export class CurrencyService extends Observable {
  private readonly API_BASE_URL = 'https://api.africonnect.com/v1';
  private readonly MARKUP_RATE = 0.01; // 1% markup

  async getExchangeRate(sourceCurrency: string, targetCurrency: string): Promise<ExchangeRate> {
    try {
      const response = await axios.get(
        `${this.API_BASE_URL}/exchange-rates/${sourceCurrency}/${targetCurrency}`
      );
      
      const baseRate = response.data.rate;
      const rateWithMarkup = baseRate * (1 + this.MARKUP_RATE);
      
      return {
        sourceCurrency,
        targetCurrency,
        rate: rateWithMarkup,
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('Exchange rate fetch error:', error);
      throw new Error('Failed to fetch exchange rate');
    }
  }

  async getSupportedCurrencies(): Promise<string[]> {
    try {
      const response = await axios.get(`${this.API_BASE_URL}/currencies`);
      return response.data.currencies;
    } catch (error) {
      console.error('Supported currencies fetch error:', error);
      throw new Error('Failed to fetch supported currencies');
    }
  }
}