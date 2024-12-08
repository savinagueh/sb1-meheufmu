import { SecureStorage } from '@nativescript/secure-storage';
import { BiometricAuth } from '@nativescript/biometrics';

export class AuthService {
  private secureStorage: SecureStorage;
  private biometricAuth: BiometricAuth;

  constructor() {
    this.secureStorage = new SecureStorage();
    this.biometricAuth = new BiometricAuth();
  }

  async login(username: string, password: string): Promise<boolean> {
    try {
      // Implement login logic
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  async authenticateWithBiometrics(): Promise<boolean> {
    try {
      const result = await this.biometricAuth.verifyFingerprintWithCustomFallback({
        message: 'Scan your fingerprint to continue',
        fallbackMessage: 'Use PIN instead'
      });
      return result.code === 0;
    } catch (error) {
      console.error('Biometric authentication error:', error);
      return false;
    }
  }
}