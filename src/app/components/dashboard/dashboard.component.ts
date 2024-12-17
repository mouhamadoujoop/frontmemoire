import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Chart, registerables } from 'chart.js';
import { ProjectService } from '../../services/project.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  projectsInProgress = 0;
  projectsCompleted = 0;
  totalBudget = 0;

  recentActivities: any[] = [];
  budgetChart: any;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadStatistics();
    this.loadRecentActivities();
  }

  loadStatistics(): void {
    this.projectService.getStatistics().subscribe((stats) => {
      this.projectsInProgress = stats.projectsInProgress;
      this.projectsCompleted = stats.projectsCompleted;
      this.totalBudget = stats.budgetAllocated;
      this.initializeCharts(); // Initialise les graphiques après avoir chargé les données
    });
  }

  loadRecentActivities(): void {
    this.projectService.getRecentActivities().subscribe((activities) => {
      this.recentActivities = activities;
    });
  }

  initializeCharts(): void {
    const ctx = document.getElementById('budgetChart') as HTMLCanvasElement;
    if (ctx) {
      this.budgetChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Projets en cours', 'Projets terminés'],
          datasets: [
            {
              data: [this.projectsInProgress, this.projectsCompleted],
              backgroundColor: ['#42A5F5', '#66BB6A'],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
          },
        },
      });
    }
  }
  
}
