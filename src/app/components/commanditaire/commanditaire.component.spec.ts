import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommanditaireComponent } from './commanditaire.component';

describe('CommanditaireComponent', () => {
  let component: CommanditaireComponent;
  let fixture: ComponentFixture<CommanditaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommanditaireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommanditaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
