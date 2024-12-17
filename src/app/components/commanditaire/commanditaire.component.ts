// import { Component, OnInit } from '@angular/core';
// import { CommanditaireService } from '../../services/commanditaire.service';
// import { MatCardModule } from '@angular/material/card';  // Import de MatCardModule
// import { MatButtonModule } from '@angular/material/button';  // Import de MatButtonModule
// import { CommonModule } from '@angular/common';  // Import de CommonModule

// @Component({
//   selector: 'app-commanditaire',
//   standalone: true,
//   imports: [MatCardModule, MatButtonModule, CommonModule],  // Ajoutez les modules nécessaires ici
//   templateUrl: './commanditaire.component.html',
//   styleUrls: ['./commanditaire.component.scss'],
// })
// export class CommanditaireComponent implements OnInit {
//   commanditaires: any[] = [];

//   constructor(private commanditaireService: CommanditaireService) {}

//   ngOnInit(): void {
//     this.loadCommanditaires();
//   }

//   loadCommanditaires(): void {
//     this.commanditaireService.getCommanditaires().subscribe((data) => {
//       this.commanditaires = data;
//     });
//   }

//   viewProjects(commanditaire: any): void {
//     commanditaire.showProjects = !commanditaire.showProjects;  // Toggle the display of projects
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommanditaireService } from '../../services/commanditaire.service';
import { MatCardModule } from '@angular/material/card';  // Importez MatCardModule ici
import { MatButtonModule } from '@angular/material/button';  // Importez MatButtonModule
import { CommonModule } from '@angular/common';  // Importez CommonModule


@Component({
  selector: 'app-commanditaire',
  standalone: true,
  templateUrl: './commanditaire.component.html',
  styleUrls: ['./commanditaire.component.scss'],
  imports: [MatCardModule, MatButtonModule, CommonModule],
})
export class CommanditaireComponent implements OnInit {
  commanditaires: any[] = [];

  constructor(
    private commanditaireService: CommanditaireService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCommanditaires();
  }

  loadCommanditaires(): void {
    this.commanditaireService.getCommanditaires().subscribe((data) => {
      this.commanditaires = data;
    });
  }

  viewProjects(commanditaire: any): void {
    this.router.navigate(['/commanditaires', commanditaire.id]);  // Rediriger vers la page de détails
  }
}
