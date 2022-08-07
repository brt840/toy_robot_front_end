import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameMonitorComponent } from './game-monitor.component';

describe('GameMonitorComponent', () => {
  let component: GameMonitorComponent;
  let fixture: ComponentFixture<GameMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameMonitorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
