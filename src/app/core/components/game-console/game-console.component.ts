import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import *  as Constants from '../../../shared/game-constants';

@Component({
  selector: 'game-console',
  templateUrl: './game-console.component.html',
  styleUrls: ['./game-console.component.css']
})
export class GameConsoleComponent implements OnInit {

  @Output() onActionPerformed = new EventEmitter<string>();
  
  xCoord: number = 0;
  yCoord: number = 0;
  orientation: string = Constants.orientation.NORTH;
  orientationList;

  constructor() { }

  ngOnInit(): void {
    this.orientationList = [
      Constants.orientation.NORTH,
      Constants.orientation.EAST,
      Constants.orientation.SOUTH,
      Constants.orientation.WEST
    ]
  }

  sendCommand(commandInput: string) {
    if(commandInput === Constants.commands.PLACE) {
      commandInput += " " + this.xCoord + " " + this.yCoord + " " + this.orientation;
    }
    this.onActionPerformed.emit(commandInput);
  }

}
