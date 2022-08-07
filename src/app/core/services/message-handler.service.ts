import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GameMessage } from '../models/game-message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageHandlerService {

  private subject = new Subject();

  constructor() { }

  sendMessage(gameMessage: GameMessage) {
    this.subject.next(gameMessage);
  }

  readMessage() {
    return this.subject.asObservable();
  }


}
