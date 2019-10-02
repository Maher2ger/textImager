import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule,
  MatProgressBarModule, MatRadioModule, MatSelectModule, MatStepperModule, MatTabsModule, MatTreeModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRadioModule,
    MatStepperModule,
    MatSelectModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatTabsModule,
    MatTreeModule
  ],
  exports: [
    MatProgressBarModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatDialogModule,
    MatCheckboxModule,
    MatRadioModule,
    MatStepperModule,
    MatSelectModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatTabsModule,
    MatTreeModule
  ]
})
export class MaterialModule { }
