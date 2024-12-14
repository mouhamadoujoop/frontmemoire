import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';

import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-project-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatListModule,
    
  ],
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss'],
  providers: [DatePipe],
})
export class ProjectDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe
  ) {  // Formater les dates dans le format dd/MM/yyyy
    if (this.data.dateDebut) {
      this.data.dateDebut = this.datePipe.transform(this.data.dateDebut, 'dd/MM/yyyy');
    }
    if (this.data.dateFin) {
      this.data.dateFin = this.datePipe.transform(this.data.dateFin, 'dd/MM/yyyy');
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    // Format des données avant de sauvegarder (si nécessaire)
    this.data.dateDebut = this.datePipe.transform(this.data.dateDebut, 'yyyy-MM-dd');
    this.data.dateFin = this.datePipe.transform(this.data.dateFin, 'yyyy-MM-dd');
    this.dialogRef.close(this.data);
  }
}
