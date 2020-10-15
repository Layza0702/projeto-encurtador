import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaEncurtadorComponent } from './tela-encurtador.component';

describe('TelaEncurtadorComponent', () => {
  let component: TelaEncurtadorComponent;
  let fixture: ComponentFixture<TelaEncurtadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaEncurtadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaEncurtadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
