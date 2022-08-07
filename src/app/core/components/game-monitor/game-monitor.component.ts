import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageHandlerService } from '../../services/message-handler.service';
import *  as Settings from '../../../shared/game-config';
import { GameMessage } from '../../models/game-message.model';

@Component({
  selector: 'game-monitor',
  templateUrl: './game-monitor.component.html',
  styleUrls: ['./game-monitor.component.css']
})
export class GameMonitorComponent implements OnDestroy {

  messages = new Array<GameMessage>();
  messageHandlerSubscription: Subscription;
  showVerboseMessages: boolean = false;
  
  constructor(private messageHandlerService: MessageHandlerService) {

    this.messages.push(new GameMessage(Settings.welcomeMessage, false));

    this.messageHandlerSubscription = this.messageHandlerService.readMessage().subscribe(message => {

      if(message) {
        const m = message as GameMessage;
        if(this.showVerboseMessages) {
          this.messages.push(m);
        }else {
          if(m.verbose === false) {
            this.messages.push(m);
          }
        }
      }
    });
  }
  
  ngOnDestroy(): void {
    this.messageHandlerSubscription.unsubscribe();
  }

  

}
