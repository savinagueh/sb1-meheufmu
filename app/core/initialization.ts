import { SecureStorage } from '@nativescript/secure-storage';
import { initializeFirebase } from './services/firebase.service';
import { setupBiometrics } from './services/biometrics.service';
import { initializeGeolocation } from './services/geolocation.service';

export async function initializeApp() {
  const secureStorage = new SecureStorage();
  
  try {
    await initializeFirebase();
    await setupBiometrics();
    await initializeGeolocation();
    
    console.log('App initialization completed successfully');
  } catch (error) {
    console.error('Error during app initialization:', error);
  }
}