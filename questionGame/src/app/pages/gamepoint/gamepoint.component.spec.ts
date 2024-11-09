import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamepointComponent } from './gamepoint.component';

describe('GamepointComponent', () => {
  let component: GamepointComponent;
  let fixture: ComponentFixture<GamepointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamepointComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamepointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
