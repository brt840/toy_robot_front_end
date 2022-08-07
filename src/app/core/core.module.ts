import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SquareComponent } from './components/square/square.component';
import { GameShellComponent } from './components/game-shell/game-shell.component';
import { FormsModule } from '@angular/forms';
import { GameConsoleComponent } from './components/game-console/game-console.component';
import { GameMonitorComponent } from './components/game-monitor/game-monitor.component';



@NgModule({
  declarations: [
    SquareComponent,
    GameShellComponent,
    GameConsoleComponent,
    GameMonitorComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SquareComponent,
    GameShellComponent,
    GameConsoleComponent,
    GameMonitorComponent
  ]
})
export class CoreModule { }
