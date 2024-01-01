import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { initializeAppCheck, ReCaptchaEnterpriseProvider, provideAppCheck, ReCaptchaV3Provider } from '@angular/fire/app-check';

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
    importProvidersFrom(provideStorage(() => getStorage())),
    importProvidersFrom(provideFirebaseApp(() => initializeApp({ "projectId": "da-bubble-group", "appId": "1:85078507240:web:3b75c6c208046e424d935d", "storageBucket": "da-bubble-group.appspot.com", "apiKey": "AIzaSyBJTYaikRBczppYRH2LQT4x-k7nbE5BPGE", "authDomain": "da-bubble-group.firebaseapp.com", "messagingSenderId": "85078507240" }))),
    /**
     * importProvidersFrom(provideAppCheck(() => {
      // TODO get a reCAPTCHA Enterprise here https://console.cloud.google.com/security/recaptcha?project=_
      const provider = new ReCaptchaEnterpriseProvider("6LfyBkIpAAAAAH2IllsapgOEoOMZUO6H2EblU2J2");
      return initializeAppCheck(undefined, { provider, isTokenAutoRefreshEnabled: true });
    })),
     */
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideStorage(() => getStorage())),
  ],
};
