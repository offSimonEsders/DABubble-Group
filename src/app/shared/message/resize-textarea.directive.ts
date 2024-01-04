import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[autoSize]',
  standalone: true,
})
export class ResizeTextareaDirective implements OnInit {
  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {}

  @HostListener('document:keyup', ['$event'])
  KeyUpEvent(e: KeyboardEvent) {
    const target = e.target as HTMLTextAreaElement;
    this.elRef.nativeElement.style.height = '25px';
    let scHeight = target.scrollHeight;
    this.elRef.nativeElement.style.height = `${scHeight}px`;
  }
}
