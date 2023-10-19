import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CursoRoutingModule } from './curso-routing.module';
import { CursoComponent } from './curso.component';

@NgModule({
  declarations: [CursoComponent],
  imports: [
    CommonModule,
    CursoRoutingModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
})
export class CursoModule {}
