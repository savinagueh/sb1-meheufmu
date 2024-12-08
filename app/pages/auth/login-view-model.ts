import { Observable } from '@nativescript/core';
import { AuthService } from '../../core/services/auth.service';
import { NavigationService } from '../../core/services/navigation.service';
import { signInWithEmailAndPassword } from '../../core/services/firebase.service';

export class LoginViewModel extends Observable {
  private authService: AuthService;
  public email: string = '';
  public password: string = '';
  public isLoading: boolean = false;

  constructor() {
    super();
    this.authService = new AuthService();
  }

  async onLogin() {
    if (!this.email || !this.password) {
      // Show validation error
      return;
    }

    this.set('isLoading', true);

    try {
      await signInWithEmailAndPassword(this.email, this.password);
      const success = await this.authService.login(this.email, this.password);
      
      if (success) {
        NavigationService.navigateWithClearHistory('home/home-page');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Show error dialog
    } finally {
      this.set('isLoading', false);
    }
  }

  async onBiometricLogin() {
    this.set('isLoading', true);

    try {
      const success = await this.authService.authenticateWithBiometrics();
      if (success) {
        NavigationService.navigateWithClearHistory('home/home-page');
      }
    } catch (error) {
      console.error('Biometric login error:', error);
      // Show error dialog
    } finally {
      this.set('isLoading', false);
    }
  }

  onRegister() {
    NavigationService.navigate('auth/register-page');
  }
}