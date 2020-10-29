import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelAtividadeAtualComponent } from './painel-atividade-atual.component';

describe('PainelAtividadeAtualComponent', () => {
  let component: PainelAtividadeAtualComponent;
  let fixture: ComponentFixture<PainelAtividadeAtualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PainelAtividadeAtualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PainelAtividadeAtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
