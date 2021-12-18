import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.css'],
})
export class MainComponentComponent implements OnInit {
  constructor() {}
  bindTask: any;

  ngOnInit(): void {}

  updateData(event: any) {
    this.bindTask = event;
  }
}
