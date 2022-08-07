import { Component } from '@angular/core';
import { GameMessage } from './core/models/game-message.model';
import { GameUtilsService } from './core/services/game-utils.service';
import { MessageHandlerService } from './core/services/message-handler.service';
import * as GameSettings from './shared/game-config';
import *  as Constants from './shared/game-constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  rows: number = GameSettings.grid.rows;
  columns:number = GameSettings.grid.columns;
  table;

  currentRow: number;
  currentColumn: number;
  currentOrientation: string;
  isRobotOnTable: boolean = false;

  constructor(private gameService: GameUtilsService,
    private messageService: MessageHandlerService) {
    this.table = new Array(this.rows);
    for(let i = 0; i < this.table.length; i++) {
      this.table[i] = new Array<number>(this.columns);
    }
  }

  onActionPerformed(action) {
    const devMessage = new GameMessage(
      "Action performed " + action,
      true
    );
    this.messageService.sendMessage(devMessage);

    const actionResult = this.gameService.actionCheck(action, this.currentRow, this.currentColumn, this.currentOrientation);
    if(actionResult.isActionValid) {
      if(actionResult.actionPerformed === Constants.commands.PLACE) {
        this.isRobotOnTable = true;
      }
      if(!this.isRobotOnTable) {
        const message = new GameMessage(
          "The robot has not been placed on the table!",
          false
        );
        this.messageService.sendMessage(message);
      }else {
        if(actionResult.actionPerformed.toUpperCase() === Constants.commands.REPORT) {
          const message = new GameMessage(
            "REPORT: X is " + actionResult.column + ", Y is " + actionResult.row + ", ORIENTATION is " + actionResult.orientation,
            false
          )
          this.messageService.sendMessage(message);
        }
        else {
          this.currentColumn = actionResult.column;
          this.currentRow = actionResult.row;
          this.currentOrientation = actionResult.orientation;
        }
      }
      
      
    }else {
      const devMessage = new GameMessage(
        "Wrong command " + action,
        true
      );
      this.messageService.sendMessage(devMessage);
    }
    
  }

  isSelectedSquare(rowIndex: number, columnIndex:number) {
    return rowIndex === this.currentRow && 
           columnIndex === this.currentColumn;
  }
}
