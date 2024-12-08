import { firebase } from '@nativescript/firebase';

export async function initializeFirebase() {
  try {
    const initialized = await firebase.init({
      // Firebase configuration would go here
      persist: true,
      showNotifications: true,
      showNotificationsWhenInForeground: true
    });

    console.log('Firebase initialized:', initialized);
    return initialized;
  } catch (error) {
    console.error('Firebase initialization error:', error);
    throw error;
  }
}

export async function signInWithEmailAndPassword(email: string, password: string) {
  try {
    const user = await firebase.login({
      type: firebase.LoginType.PASSWORD,
      passwordOptions: {
        email,
        password
      }
    });
    return user;
  } catch (error) {
    console.error('Firebase login error:', error);
    throw error;
  }
}