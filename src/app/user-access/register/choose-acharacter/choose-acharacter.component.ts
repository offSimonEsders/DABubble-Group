import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-choose-acharacter',
  standalone: true,
  imports: [],
  templateUrl: './choose-acharacter.component.html',
  styleUrl: './choose-acharacter.component.scss'
})
export class ChooseACharacterComponent implements AfterViewInit {
  registerframe!: HTMLDivElement;
  chosecharacterframe!: HTMLDivElement;

  ngAfterViewInit() {
    this.registerframe = <HTMLDivElement>document.querySelector('.register-frame');
    this.chosecharacterframe = <HTMLDivElement>document.querySelector('.choose-a-character-frame');
  }

  showRegister() {
    this.registerframe.style.display = 'flex';
    this.chosecharacterframe.style.display = 'none';
  }

}
