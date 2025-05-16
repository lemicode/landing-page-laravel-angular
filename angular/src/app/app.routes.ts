import { HomeComponent } from './pages/home/home.component';
import { FormComponent } from './shared/components/form/form.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'form', component: FormComponent},
    {path: '**', redirectTo: ''}
];
