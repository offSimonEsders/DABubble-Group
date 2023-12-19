import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[bubbleStyle]',
  standalone: true,
})
export class BubbleStyle implements OnInit {
  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    this.elRef.nativeElement.style.backgroundColor = '#797EF3';
    this.elRef.nativeElement.style.color = 'white';
    this.elRef.nativeElement.style.borderRadius = '30px 0px 30px 30px';
  }
}
