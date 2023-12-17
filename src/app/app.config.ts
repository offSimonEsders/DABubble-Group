import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'da-bubble-group',
          appId: '1:85078507240:web:3b75c6c208046e424d935d',
          storageBucket: 'da-bubble-group.appspot.com',
          apiKey: 'AIzaSyBJTYaikRBczppYRH2LQT4x-k7nbE5BPGE',
          authDomain: 'da-bubble-group.firebaseapp.com',
          messagingSenderId: '85078507240',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
};
