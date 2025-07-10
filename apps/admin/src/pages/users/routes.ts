import { Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./users'),
    },
    {
        path: 'create',
        loadComponent: () => import('./create/user-create'),
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./create/user-create'),
    },
];

export default routes;