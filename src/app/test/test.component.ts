import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  public display = false;
  public counter = 0;
click() {
  this.display = !this.display;
  this.counter += 1;
}

  constructor() { }

  ngOnInit(): void {
  }

}
