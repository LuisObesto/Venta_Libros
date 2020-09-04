import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { LibroComponent } from './components/libro/libro.component';
import { AuthGuard } from './guardians/auth.guard';
import { CarritoComponent } from './components/carrito/carrito.component';


const routes: Routes = [

  {path : 'create-edit/libro/new',canActivate : [AuthGuard], loadChildren : () => import('./components/libros-new/libros-new.module').then(m=>m.LibrosNewModule)},
  {path : 'libro/:id', component : LibroComponent},
  {path : 'index',component : IndexComponent},
  {path : 'login',loadChildren : ()=>import ('./components/login/login.module').then(m=> m.LoginModule)},
  {path : 'registro', loadChildren : ()=>import ('./components/registro/registro.module').then(m=> m.RegistroModule)},
  {path : 'carrito',component : CarritoComponent},
  {path : '**', redirectTo : 'index'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
