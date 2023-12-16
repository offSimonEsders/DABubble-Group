import { Injectable, inject } from '@angular/core';
import { Firestore, collection, deleteDoc, doc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  db = inject(Firestore);

  getCollectionRef(collId: string) {
    return collection(this.db, collId);
  }

  getDocumentRef(collId: string, docId: string) {
    return doc(collection(this.db, collId), docId);
  }

  async deleteDocument(collId: string, docId: string) {
    await deleteDoc(doc(this.db, collId, docId)).catch((err) => {
      // show an Errormessage
    });
  }
}
