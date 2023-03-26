import { Component } from "@angular/core";

@Component({
    selector: 'app-loading-spinner',
    styleUrls: ['./spinner.component.css'],
    template: '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>'
})
export class SpinnerComponent{}