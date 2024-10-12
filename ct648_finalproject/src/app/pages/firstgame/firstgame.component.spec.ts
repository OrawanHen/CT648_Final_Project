import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstgameComponent } from './firstgame.component';

describe('FirstgameComponent', () => {
  let component: FirstgameComponent;
  let fixture: ComponentFixture<FirstgameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstgameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
