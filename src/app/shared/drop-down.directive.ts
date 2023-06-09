import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appdropdown]'
})
export class DropDownDirective{
    @HostBinding('class.open') isOpen = false;

    @HostListener('click') toggleOpen(){
        this.isOpen = !this.isOpen;
    }
}