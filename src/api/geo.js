import { Geolocation } from '@capacitor/geolocation';

export async function getCurrentPosition() {
  try {
    const coordinates = await Geolocation.getCurrentPosition();
    return {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude
    };
  } catch (error) {
    console.error('Error getting location', error);
    return null;
  }
}