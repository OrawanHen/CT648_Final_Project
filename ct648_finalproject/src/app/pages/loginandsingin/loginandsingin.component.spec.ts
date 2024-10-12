import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginandsinginComponent } from './loginandsingin.component';

describe('LoginandsinginComponent', () => {
  let component: LoginandsinginComponent;
  let fixture: ComponentFixture<LoginandsinginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginandsinginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginandsinginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
