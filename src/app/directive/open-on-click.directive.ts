import { Directive, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appOpenOnClick]'
})
export class OpenOnClickDirective {

  constructor() { }

  @HostBinding('class.open') isToggleOpen = false;
  @HostListener('click') onclick(eventData: Event){
    this.isToggleOpen = !this.isToggleOpen;
  }
}
