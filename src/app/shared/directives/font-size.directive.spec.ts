import { FontSizeDirective } from './font-size.directive';
import { ElementRef } from '@angular/core';

describe('FontSizeDirective', () => {
  it('should create an instance', () => {
    const elementRefMock = new ElementRef(document.createElement('div')); 
    const directive = new FontSizeDirective(elementRefMock); 
    expect(directive).toBeTruthy();
  });
});
