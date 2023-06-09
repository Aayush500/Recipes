import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'alert-dialog',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent{
    @Input() message: string;
    @Output() closeEvent = new EventEmitter<void>();

    constructor(){}

    onClose(){
        this.closeEvent.emit();
    }
}