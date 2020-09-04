import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibrosNewRoutingModule } from './libros-new-routing.module';
import { LibrosNewComponent } from './libros-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LibrosNewComponent],
  imports: [
    CommonModule,
    LibrosNewRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LibrosNewModule { }
