import { BiometricAuth } from '@nativescript/biometrics';

export async function setupBiometrics() {
  const biometricAuth = new BiometricAuth();
  
  try {
    const available = await biometricAuth.available();
    console.log('Biometrics available:', available);
    return available;
  } catch (error) {
    console.error('Biometrics setup error:', error);
    throw error;
  }
}

export async function verifyBiometrics(): Promise<boolean> {
  const biometricAuth = new BiometricAuth();
  
  try {
    const result = await biometricAuth.verifyFingerprintWithCustomFallback({
      message: 'Scan your fingerprint to continue',
      fallbackMessage: 'Use PIN instead'
    });
    return result.code === 0;
  } catch (error) {
    console.error('Biometric verification error:', error);
    return false;
  }
}