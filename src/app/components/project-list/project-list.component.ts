// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MatTableModule } from '@angular/material/table';
// import { ProjectService, Project } from '../../services/project.service';

// @Component({
//   selector: 'app-project-list',
//   standalone: true,
//   imports: [CommonModule, MatTableModule],
//   templateUrl: './project-list.component.html',
//   styleUrls: ['./project-list.component.scss'],
// })
// export class ProjectListComponent implements OnInit {
//   projects: Project[] = [];

//   constructor(private projectService: ProjectService) {}

//   ngOnInit(): void {
//     this.loadProjects();
//   }

//   loadProjects(): void {
//     this.projectService.getProjects().subscribe((projects) => {
//       this.projects = projects;
//     });
//   }
// }


// src/app/components/project-list/project-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for standalone components
import { MatTableModule } from '@angular/material/table'; // Material Table module
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // Material Dialog module
import { MatButtonModule } from '@angular/material/button'; // Material Button module
import { ProjectService, Project } from '../../services/project.service'; // Service and interface for projects
import { ProjectDialogComponent } from '../project-dialog/project-dialog.component'; // Dialog component
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatSidenavModule, 
    MatListModule,
  ],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }

  openDialog(project?: Project): void {
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      width: '400px',
      data: project ? { ...project } : { status: 'En préparation' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.id) {
          this.projectService.updateProject(result).subscribe(() => this.loadProjects());
        } else {
          this.projectService.addProject(result).subscribe(() => this.loadProjects());
        }
      }
    });
  }

  deleteProject(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      this.projectService.deleteProject(id).subscribe(() => this.loadProjects());
    }
  }
}
