import { Accuracy, getCurrentLocation, enableLocationRequest } from '@nativescript/geolocation';

export async function initializeGeolocation() {
  try {
    const hasPermission = await enableLocationRequest();
    console.log('Location permission granted:', hasPermission);
    return hasPermission;
  } catch (error) {
    console.error('Geolocation initialization error:', error);
    throw error;
  }
}

export async function getCurrentPosition() {
  try {
    const location = await getCurrentLocation({
      desiredAccuracy: Accuracy.high,
      maximumAge: 5000,
      timeout: 20000
    });
    return location;
  } catch (error) {
    console.error('Get current position error:', error);
    throw error;
  }
}