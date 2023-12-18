import {
  Directive,
  OnInit,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appHoverStyle]',
  standalone: true,
})
export class HoverStyleDirective implements OnInit {
  @Input() onMainChat!: string;

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    if (this.onMainChat) {
      this.elRef.nativeElement.style.width = '227px';
      this.elRef.nativeElement.style.padding = '6px 10px 6px 0px';
    }
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    if (this.onMainChat) {
      this.elRef.nativeElement.style.width = 'auto';
    }
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    if (this.onMainChat) {
      this.elRef.nativeElement.style.width = '227px';
    }
  }
}
