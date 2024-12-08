import { Observable } from '@nativescript/core';
import { TransferService } from '../../core/services/transfer.service';
import { CurrencyService } from '../../core/services/currency.service';
import { ProviderService } from '../../core/services/provider.service';
import { TransferDetails, Provider, ExchangeRate } from '../../core/models/transfer.model';

export class TransferViewModel extends Observable {
  private transferService: TransferService;
  private currencyService: CurrencyService;
  private providerService: ProviderService;

  public amount: string = '';
  public recipientId: string = '';
  public description: string = '';
  public currencies: string[] = [];
  public countries: string[] = [];
  public availableProviders: Provider[] = [];
  public selectedCurrencyIndex: number = 0;
  public selectedCountryIndex: number = 0;
  public exchangeRate: ExchangeRate | null = null;

  constructor() {
    super();
    this.transferService = new TransferService();
    this.currencyService = new CurrencyService();
    this.providerService = new ProviderService();
    this.initializeData();
  }

  private async initializeData() {
    try {
      // Load currencies
      const currencies = await this.currencyService.getSupportedCurrencies();
      this.set('currencies', currencies);

      // Load countries (simplified for demo)
      this.set('countries', ['Kenya', 'Nigeria', 'Ghana', 'South Africa']);

      this.updateAvailableProviders();
      this.updateExchangeRate();
    } catch (error) {
      console.error('Initialization error:', error);
    }
  }

  private updateAvailableProviders() {
    const countryCode = this.getCountryCode(this.countries[this.selectedCountryIndex]);
    const providers = this.providerService.getProviders(countryCode);
    this.set('availableProviders', providers);
  }

  private async updateExchangeRate() {
    if (!this.amount) return;

    try {
      const sourceCurrency = this.currencies[this.selectedCurrencyIndex];
      const targetCurrency = 'USD'; // Default target currency
      const rate = await this.currencyService.getExchangeRate(sourceCurrency, targetCurrency);
      this.set('exchangeRate', rate);
      this.updateDisplayValues();
    } catch (error) {
      console.error('Exchange rate update error:', error);
    }
  }

  private updateDisplayValues() {
    if (!this.exchangeRate || !this.amount) return;

    const amountNum = parseFloat(this.amount);
    const transferFee = amountNum * 0.01; // 1% fee
    const totalAmount = amountNum + transferFee;
    const receivingAmount = totalAmount * this.exchangeRate.rate;

    this.set('exchangeRateDisplay', `1 ${this.exchangeRate.sourceCurrency} = ${this.exchangeRate.rate} ${this.exchangeRate.targetCurrency}`);
    this.set('transferFeeDisplay', `${transferFee.toFixed(2)} ${this.exchangeRate.sourceCurrency}`);
    this.set('totalAmountDisplay', `${totalAmount.toFixed(2)} ${this.exchangeRate.sourceCurrency}`);
    this.set('receivingAmountDisplay', `${receivingAmount.toFixed(2)} ${this.exchangeRate.targetCurrency}`);
  }

  private getCountryCode(country: string): string {
    const countryCodes: { [key: string]: string } = {
      'Kenya': 'KE',
      'Nigeria': 'NG',
      'Ghana': 'GH',
      'South Africa': 'ZA'
    };
    return countryCodes[country] || '';
  }

  public get isValid(): boolean {
    return !!(
      this.amount &&
      parseFloat(this.amount) > 0 &&
      this.recipientId &&
      this.selectedCountryIndex >= 0 &&
      this.availableProviders.length > 0
    );
  }

  public async onContinue() {
    if (!this.isValid) return;

    try {
      const transferDetails: TransferDetails = {
        amount: parseFloat(this.amount),
        sourceCurrency: this.currencies[this.selectedCurrencyIndex],
        targetCurrency: 'USD',
        recipientId: this.recipientId,
        provider: this.availableProviders[0].id,
        description: this.description
      };

      const success = await this.transferService.initiateTransfer(transferDetails);
      if (success) {
        // Navigate to confirmation page
        console.log('Transfer initiated successfully');
      }
    } catch (error) {
      console.error('Transfer initiation error:', error);
    }
  }
}