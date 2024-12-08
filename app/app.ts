import { Application } from '@nativescript/core';
import { initializeApp } from './core/initialization';

// Initialize core services
initializeApp();

Application.run({ moduleName: 'app-root' });