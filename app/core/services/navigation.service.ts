import { Frame } from '@nativescript/core';

export class NavigationService {
  static navigate(page: string, context?: any) {
    Frame.topmost().navigate({
      moduleName: `pages/${page}`,
      context,
      clearHistory: false
    });
  }

  static navigateWithClearHistory(page: string, context?: any) {
    Frame.topmost().navigate({
      moduleName: `pages/${page}`,
      context,
      clearHistory: true
    });
  }

  static goBack() {
    Frame.topmost().goBack();
  }
}