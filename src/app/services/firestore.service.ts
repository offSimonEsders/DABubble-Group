import { Injectable, inject } from '@angular/core';
import { Firestore, collection, deleteDoc, doc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  db = inject(Firestore);

  //-------------------------------- Erste Ebene um Accounts/Channels/Chats auszulesen oder zu löschen----------------------------------
  /**
   * The function returns a reference to a collection in the Firestore.
   * @param {string} collId - Name of the collection in the Firestore. Can be 'accounts', 'channels' or 'chats'.
   * @returns a reference to a collection in the Firestore.
   */
  getCollectionRef(collId: string) {
    return collection(this.db, collId);
  }

  /**
   * The function returns a reference to a specific document in a Firestore collection.
   * @param {string} collId - Name to identify the specific collection where the document is located. Can be 'accounts', 'channels' or 'chats'.
   * @param {string} docId - ID of a specific document within a collection.
   * @returns a reference to a specific document in a collection.
   */
  getDocRef(collId: string, docId: string) {
    return doc(collection(this.db, collId), docId);
  }

  /**
   * The function deletes a document from a specified collection in the Firestore.
   * @param {string} collId - Name to identify the collection in which the document is located. Can be 'accounts', 'channels' or 'chats'.
   * @param {string} docId - ID of the document you want to delete.
   */
  async deleteDoc(collId: string, docId: string) {
    await deleteDoc(doc(this.db, collId, docId)).catch((err) => {
      // show an Errormessage
    });
  }

  //---------------------------------- Zweite Ebene um Messages aus Channels/Chats auszulesen oder zu löschen----------------------------
  /**
   * The function returns a reference to the collection of messages for a given channel ID.
   * @param {string} collId - Name used to identify a specific collection in the Firestore. Can be 'channels' or 'chats'.
   * @param {string} channelId - ID of a channel or chat.
   * @returns a reference to the 'messages' collection within the 'channels' collection in the Firestore.
   */
  getMessageCollRef(collId: string, channelId: string) {
    return collection(this.db, collId, channelId, 'messages');
  }

  /**
   * The function returns a reference to a specific document in a messages collection within a specified channel.
   * @param {string} collId - Name used to identify a specific collection in the Firestore. Can be 'channels' or 'chats'.
   * @param {string} channelId - ID to specify the channel or chat in which the message document is located.
   * @param {string} docId - ID of a specific message document within a messages subcollection of a channel document.
   * @returns a document reference to a specific message in a specific channel.
   */
  getMessageDocRef(collId: string, channelId: string, docId: string) {
    return doc(this.db, collId, channelId, 'messages', docId);
  }

  /**
   * The function deletes a specific message from a channel or chat in the Firestore.
   * @param {string} collId - Name used to identify a specific collection in the Firestore. Can be 'channels' or 'chats'.
   * @param {string} channelId - ID of the channel or chat where the message is located, used to specify the document path in the Firestore.
   * @param {string} docId - ID of the message document that you want to delete.
   */
  async deleteMessage(collId: string, channelId: string, docId: string) {
    await deleteDoc(doc(this.db, collId, channelId, 'messages', docId)).catch(
      (err) => {
        // show an Errormessage
      }
    );
  }

  //---------------------------------- Dritte Ebene um Answers aus Messages auszulesen oder zu löschen----------------------------
  /**
   * The function returns a reference to the "answers" collection within a specific channel and message in the Firestore.
   * @param {string} channelId - ID of the channel where the message is located.
   * @param {string} messageId - ID of a message within a channel.
   * @returns a reference to the 'answers' collection within the 'channels' collection in the Firestore.
   */
  getChannelAnswerCollRef(channelId: string, messageId: string) {
    return collection(
      this.db,
      'channels',
      channelId,
      'messages',
      messageId,
      'answers'
    );
  }

  /**
   * The function  returns a reference to a specific answer document within a nested collection structure in Firestore.
   * @param {string} channelId - ID used to locate the specific channel in the Firestore.
   * @param {string} messageId - ID of a message within a channel.
   * @param {string} docId - ID of the answer document you want to retrieve.
   * @returns a reference to a answer in a specific message of a specific channel.
   */
  getAnswerDocRef(channelId: string, messageId: string, docId: string) {
    return doc(
      this.db,
      'channels',
      channelId,
      'messages',
      messageId,
      'answers',
      docId
    );
  }

  /**
   * The function deletes a specific answer from a message in the Firestore.
   * @param {string} channelId - ID of the channel where the message is located.
   * @param {string} messageId - ID of the message that contains the answer you want to delete.
   * @param {string} docId - ID of the answer document that you want to delete.
   */
  async deleteAnswer(channelId: string, messageId: string, docId: string) {
    await deleteDoc(
      doc(
        this.db,
        'channels',
        channelId,
        'messages',
        messageId,
        'answers',
        docId
      )
    ).catch((err) => {
      // show an Errormessage
    });
  }
}
