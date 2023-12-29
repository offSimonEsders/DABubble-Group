import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { StorageService } from '../../../services/storage.service';
import { CheckInputService } from '../../../services/check-input.service';

@Component({
  selector: 'app-choose-acharacter',
  standalone: true,
  imports: [],
  templateUrl: './choose-acharacter.component.html',
  styleUrl: './choose-acharacter.component.scss'
})
export class ChooseACharacterComponent implements AfterViewInit {
  @Input() userData!: any;
  @Input() resetRegistrationForm!: Function;
  @ViewChild('characterpreviewimg') characterpreviewimg!: any;
  @ViewChild('selectfile') selectfile!: any;
  @ViewChild('userfeedback') userfeedback!: any;

  registerframe!: HTMLDivElement;
  chosecharacterframe!: HTMLDivElement;

  reader = new FileReader();

  storageUrL: string = 'userAvatars/person.svg';
  loadownimage: boolean = false;
  fileWithNewName!: any;

  constructor(private authservice: AuthService, private storageservice: StorageService, private checkinputservice: CheckInputService) {
  }

  ngAfterViewInit() {
    this.registerframe = <HTMLDivElement>document.querySelector('.register-frame');
    this.chosecharacterframe = <HTMLDivElement>document.querySelector('.choose-a-character-frame');
  }

  validateUserData(): boolean {
    if(this.userData.username == '' || !this.checkinputservice.isValidUseremail(this.userData.useremail) || !this.checkinputservice.isValidUserpassword(this.userData.userpassword)) {
      this.showRegister();
      return true;
    }
    return false;
  }


  showRegister() {
    this.registerframe.style.display = 'flex';
    this.chosecharacterframe.style.display = 'none';
  }

  changeCharacterPreview(path: string, UrL: string) {
    this.characterpreviewimg.nativeElement.src = path;
    this.storageUrL = UrL;
    console.log(this.storageUrL);
  }

  loadimg() {
    this.loadownimage = true;
    const file = this.selectfile.nativeElement.files[0];
    const newName = "personalAvatar";
    this.fileWithNewName = new File([file], newName, { type: file.type });
    this.characterpreviewimg.nativeElement.src = URL.createObjectURL(this.fileWithNewName);
  }

  async registerNewUser() {
    if(this.validateUserData()) {
      this.resetRegistrationForm();
      return;
    }
    let Uid = await this.authservice.authServiceSignUpWithEmailAndPassword(this.userData.useremail, this.userData.userpassword);
    if (this.loadownimage) {
      const halfUid = Uid.substring(0, Uid.length / 2);
      this.authservice.authServiceCreateNewAccount(this.userData.username, this.userData.useremail, `userAvatars/individual/${halfUid}personalAvatar`, Uid);
      this.storageservice.uploadFileToFirestorage(this.fileWithNewName, Uid);
      this.showAnimationAndLoadogin();
      return;
    }
    this.authservice.authServiceCreateNewAccount(this.userData.username, this.userData.useremail, this.storageUrL, Uid);
    this.showAnimationAndLoadogin();
  }

  showAnimationAndLoadogin() {
    this.userfeedback.nativeElement.style.display = 'flex';
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

}