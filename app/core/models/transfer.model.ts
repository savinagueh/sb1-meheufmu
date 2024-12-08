export interface TransferDetails {
  amount: number;
  sourceCurrency: string;
  targetCurrency: string;
  recipientId: string;
  provider: string;
  description?: string;
}

export interface ExchangeRate {
  sourceCurrency: string;
  targetCurrency: string;
  rate: number;
  timestamp: number;
}

export interface TransferFees {
  transferFee: number;
  exchangeRate: number;
  totalAmount: number;
  receivingAmount: number;
}

export interface Provider {
  id: string;
  name: string;
  logo: string;
  countries: string[];
  minimumAmount: number;
  maximumAmount: number;
}