import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectFilterModule } from 'mat-select-filter';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';

const materialComponent = [
  MatCardModule,
  MatSelectModule,
  MatSelectFilterModule,
  MatCheckboxModule,
  MatInputModule,
  MatRadioModule,
  MatIconModule,
  MatFormFieldModule,
  FormsModule,
  MatButtonModule,
  ReactiveFormsModule,
  MatTableModule,
  MatPaginatorModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatSortModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  NgxSpinnerModule,
];
@NgModule({
  declarations: [],
  imports: [CommonModule, materialComponent],
  exports: [materialComponent],
})
export class MaterialModule {}
