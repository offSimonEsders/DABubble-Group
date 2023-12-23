import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-choose-acharacter',
  standalone: true,
  imports: [],
  templateUrl: './choose-acharacter.component.html',
  styleUrl: './choose-acharacter.component.scss'
})
export class ChooseACharacterComponent implements AfterViewInit {
  @Input() userData!: any;
  @ViewChild('characterpreviewimg') characterpreviewimg!: any;

  registerframe!: HTMLDivElement;
  chosecharacterframe!: HTMLDivElement;

  storageUrL: string = 'userAvatars/person.svg';

  constructor() {
  }

  ngAfterViewInit() {
    this.registerframe = <HTMLDivElement>document.querySelector('.register-frame');
    this.chosecharacterframe = <HTMLDivElement>document.querySelector('.choose-a-character-frame');
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

  test() {
    console.log(this.userData);
  }

}
