import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommanditaireService } from '../../services/commanditaire.service';
import { MatCardModule } from '@angular/material/card';  // Importez MatCardModule ici
import { MatButtonModule } from '@angular/material/button';  // Importez MatButtonModule
import { CommonModule } from '@angular/common';  // Importez CommonModule


@Component({
  selector: 'app-commanditaire-details',
  standalone: true,
  templateUrl: './commanditaire-details.component.html',
  styleUrls: ['./commanditaire-details.component.scss'],
  imports: [MatCardModule, MatButtonModule, CommonModule],
})
export class CommanditaireDetailsComponent implements OnInit {
  commanditaire: any;
  commanditaireId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private commanditaireService: CommanditaireService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du commanditaire depuis l'URL
    this.commanditaireId = this.route.snapshot.paramMap.get('id');

    if (this.commanditaireId) {
      // Charger les informations du commanditaire
      this.commanditaireService.getCommanditaireById(this.commanditaireId).subscribe((data) => {
        this.commanditaire = data;
      });
    }
  }
}
