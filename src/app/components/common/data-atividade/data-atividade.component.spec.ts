import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAtividadeComponent } from './data-atividade.component';

describe('DataAtividadeComponent', () => {
  let component: DataAtividadeComponent;
  let fixture: ComponentFixture<DataAtividadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataAtividadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAtividadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
