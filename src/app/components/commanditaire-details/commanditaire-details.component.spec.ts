import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommanditaireDetailsComponent } from './commanditaire-details.component';

describe('CommanditaireDetailsComponent', () => {
  let component: CommanditaireDetailsComponent;
  let fixture: ComponentFixture<CommanditaireDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommanditaireDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommanditaireDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
