import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {

  constructor() { }

  _selected: boolean = false;
  _orientation: string = "";

  @Input() set orientation(value: string) { this._orientation = value; }
  get orientation() { return this._orientation; }

  @Input() set selected(value: boolean) { this._selected = value; }
  get selected() { return this._selected; }


  ngOnInit(): void {
  }

  orientationCheck(orientation) {
    return orientation === this.orientation && this.selected;
  }

}
