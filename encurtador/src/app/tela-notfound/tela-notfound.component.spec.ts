import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaNotfoundComponent } from './tela-notfound.component';

describe('TelaNotfoundComponent', () => {
  let component: TelaNotfoundComponent;
  let fixture: ComponentFixture<TelaNotfoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaNotfoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaNotfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
