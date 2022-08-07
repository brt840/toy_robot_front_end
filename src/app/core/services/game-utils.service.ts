import { Injectable } from '@angular/core';
import *  as Constants from '../../shared/game-constants';
import * as GameSettings from '../../shared/game-config';


@Injectable({
  providedIn: 'root'
})
export class GameUtilsService {

  constructor() { }

  orientationList = [Constants.orientation.NORTH, Constants.orientation.EAST, Constants.orientation.SOUTH, Constants.orientation.WEST];


  actionCheck(action, currentRow, currentColumn, currentOrientation) {
    
    const value = action.toUpperCase();
    if(value === Constants.commands.MOVE){
      switch(currentOrientation) {
        case Constants.orientation.NORTH:
          if(currentRow > 0){
            return {isActionValid: true, row: currentRow - 1, column: currentColumn, orientation: Constants.orientation.NORTH, actionPerformed: action};
          }else {
            return { isActionValid: false }
          }
        case Constants.orientation.WEST:
          if(currentColumn > 0) {
            return {isActionValid: true, row: currentRow, column: currentColumn - 1, orientation: Constants.orientation.WEST, actionPerformed: action};
          }else {
            return { isActionValid: false }
          }
        case Constants.orientation.EAST:
          if(currentColumn < GameSettings.grid.columns) {
            return {isActionValid: true, row: currentRow, column: currentColumn + 1, orientation: Constants.orientation.EAST, actionPerformed: action};
          }else {
            return { isActionValid: false }
          }
        case Constants.orientation.SOUTH:
          if(currentRow < GameSettings.grid.rows) {
            return {isActionValid: true, row: currentRow + 1, column: currentColumn , orientation: Constants.orientation.SOUTH, actionPerformed: action};
          }else {
            return { isActionValid: false }
          }
        default:
          return { isActionValid: false }
      }
      
      }
    if(value === Constants.commands.LEFT) {

      return {isActionValid: true, row: currentRow, column: currentColumn , orientation: this.rotateLeft(currentOrientation), actionPerformed: action};

    }
    if(value === Constants.commands.RIGHT) {
      return {isActionValid: true, row: currentRow, column: currentColumn , orientation: this.rotateRight(currentOrientation), actionPerformed: action};

    }
    if(value === Constants.commands.REPORT) {
      return {isActionValid: true, row: currentRow, column: currentColumn , orientation: currentOrientation, actionPerformed: action};

    }

    if(value.indexOf(Constants.commands.PLACE) > -1) {
      const params = value.split(" ");
      if(params.length !=  4) {
        return { isActionValid: false }
      }
      if(params[0] === Constants.commands.PLACE &&
        this.isNumericAndValid(params[1], "columnCheck") &&
        this.isNumericAndValid(params[2], "rowCheck") &&
        (params[3] === Constants.orientation.EAST || 
          params[3] === Constants.orientation.NORTH ||
          params[3] === Constants.orientation.WEST ||
          params[3] === Constants.orientation.SOUTH
        )) {
          return {isActionValid: true, row: Number(params[2]), column: Number(params[1]) , orientation: params[3], actionPerformed: Constants.commands.PLACE};
        }else {
          return { isActionValid: false }
        }
    }

    return {isActionValid: false};
  }

  
  isNumericAndValid(val: string, rowOrCol) : boolean {
    const n = Number(val);
    if(isNaN(n)) {
      return false;
    }
    if(rowOrCol === "columnCheck") {
      return n >= 0 && n < GameSettings.grid.columns;
    }
    else if(rowOrCol === "rowCheck") {
      return n >= 0 && n < GameSettings.grid.rows;
    }
    return true;
  }

 rotateLeft(currentOrientation: string) {
  if(currentOrientation === Constants.orientation.NORTH) {
    return Constants.orientation.WEST;
  }
  return this.orientationList[this.orientationList.findIndex(x => x === currentOrientation) - 1];
 }

 rotateRight(currentOrientation: string) {
  if(currentOrientation === Constants.orientation.WEST) {
    return Constants.orientation.NORTH;
  }
  return this.orientationList[this.orientationList.findIndex(x => x === currentOrientation) +1];
 }
}
