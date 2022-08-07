import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'game-shell',
  templateUrl: './game-shell.component.html',
  styleUrls: ['./game-shell.component.css']
})
export class GameShellComponent implements OnInit {

  @Output() onActionPerformed = new EventEmitter<string>();

  commandInput: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  sendCommand() {
    this.onActionPerformed.emit(this.commandInput);
  }

}
