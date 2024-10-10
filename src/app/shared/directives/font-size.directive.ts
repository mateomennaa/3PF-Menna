import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appFontSize]'
})
export class FontSizeDirective implements OnChanges {
  @Input()
  size = '20px'; 

  constructor(private el: ElementRef<HTMLElement>) {
    this.applyStyles();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['size']) {
      this.applyStyles();
    }
  }

  applyStyles(): void {
    this.el.nativeElement.style.fontSize = this.size; 
}
}