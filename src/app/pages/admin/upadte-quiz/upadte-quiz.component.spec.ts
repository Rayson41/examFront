import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpadteQuizComponent } from './upadte-quiz.component';

describe('UpadteQuizComponent', () => {
  let component: UpadteQuizComponent;
  let fixture: ComponentFixture<UpadteQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpadteQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpadteQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
