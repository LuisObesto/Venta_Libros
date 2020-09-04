import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibrosNewComponent } from './libros-new.component';


const routes: Routes = [
  {
    path : '', component : LibrosNewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibrosNewRoutingModule { }
