import { Injectable } from '@angular/core';
import { Storage, uploadBytes, ref } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  uploadFileToFirestorage() {
    const filePath = 'userAvatars/checkbox_checked';
    const fileUrl = 'assets/img/checkbox_checked.svg'; // Adjust this path if necessary

    fetch(fileUrl)
      .then(response => response.blob())
      .then(blob => {
        const storageRef = ref(this.storage, filePath);
        uploadBytes(storageRef, blob)
          .then((snapshot) => {
            console.log('File uploaded successfully');
            // Handle success
          })
          .catch((error) => {
            console.log('File upload failed');
            // Handle error
          });
      })
      .catch((error) => {
        console.log('Failed to fetch the file');
        // Handle error
      });
  }

}
