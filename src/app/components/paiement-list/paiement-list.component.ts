import { Component, OnInit } from '@angular/core';
import { PaiementService } from '../../services/paiement.service';
import { CommanditaireService } from '../../services/commanditaire.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';  // Assurez-vous que FormsModule est importé

@Component({
  selector: 'app-paiement-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    CommonModule,
    FormsModule  // Importation de FormsModule pour ngModel
  ],
  templateUrl: './paiement-list.component.html',
  styleUrls: ['./paiement-list.component.scss'],
})
export class PaiementListComponent implements OnInit {
  paiements: any[] = [];
  commanditaires: any[] = [];
  newPaiement: any = {
    commanditaireId: '',
    montant: '',
    date: '',
    statut: 'En attente',
  };

  displayedColumns: string[] = ['commanditaire', 'montant', 'date', 'statut', 'actions'];

  constructor(
    private paiementService: PaiementService,
    private commanditaireService: CommanditaireService
  ) {}

  ngOnInit(): void {
    this.loadPaiements();
    this.loadCommanditaires();
  }

  loadPaiements(): void {
    this.paiementService.getPaiements().subscribe((paiements) => {
      this.paiements = paiements;
    });
  }

  loadCommanditaires(): void {
    this.commanditaireService.getCommanditaires().subscribe((commanditaires) => {
      this.commanditaires = commanditaires;
    });
  }

  addPaiement(): void {
    this.paiementService.addPaiement(this.newPaiement).subscribe((paiement) => {
      this.paiements.push(paiement);
      this.newPaiement = { commanditaireId: '', montant: '', date: '', statut: 'En attente' }; // Réinitialiser le formulaire
    });
  }

  deletePaiement(id: string): void {
    this.paiementService.deletePaiement(id).subscribe(() => {
      this.paiements = this.paiements.filter((paiement) => paiement.id !== id);
    });
  }
}
