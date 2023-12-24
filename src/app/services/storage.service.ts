import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage, uploadBytes, ref, listAll, getMetadata, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  async uploadFileToFirestorage(file: any, Uid: any) {
    const halfUid = Uid.substring(0, Uid.length / 2);
    const fileUrl = `userAvatars/individual/${halfUid}personalAvatar`;
    const storageRef = ref(this.storage, fileUrl);
    uploadBytes(storageRef, file)
      .catch((error) => {
      })
  }

  async getImageUrl(Uid: string) {
    const halfUid = Uid.substring(0, Uid.length / 2);
    const fileUrl = `userAvatars/individual/${halfUid}personalAvatar`
    const storageRef = ref(this.storage, fileUrl)
    const url = await getDownloadURL(storageRef);
    return url;
  }

}
