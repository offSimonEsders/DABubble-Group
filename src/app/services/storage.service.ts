import { Injectable } from '@angular/core';
import { Storage, uploadBytes, ref } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  uploadFileToFirestorage(file: any, Uid: any) {
    const filePath = `userAvatars/individual/${Uid}personalAvatar`;
    const fileUrl = 'assets/img/checkbox_checked.svg'; // Adjust this path if necessary
    const storageRef = ref(this.storage, filePath);
    uploadBytes(storageRef, file)
      .catch((error) => {
        console.log("upload")
      })
  }

}
