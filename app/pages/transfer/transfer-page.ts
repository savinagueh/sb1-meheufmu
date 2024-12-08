import { EventData, Page } from '@nativescript/core';
import { TransferViewModel } from './transfer-view-model';

export function onNavigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new TransferViewModel();
}