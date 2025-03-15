import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';

export const routes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'registro', component: RegistroComponent},
    { path: 'confirmacion', component: ConfirmacionComponent}
];
