import { Injectable, inject } from '@angular/core';
import { FirestoreService } from './firestore.service';

@Injectable({ providedIn: 'root' })
export class AnswerService {
  firestore!: FirestoreService;

  constructor() {
    this.firestore = inject(FirestoreService);
  }
}
