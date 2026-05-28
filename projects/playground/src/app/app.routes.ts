import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home-page').then((m) => m.HomePageComponent),
  },
  {
    path: 'docs',
    loadComponent: () => import('./pages/docs/docs-page').then((m) => m.DocsPageComponent),
    children: [
      { path: '', redirectTo: 'basics', pathMatch: 'full' },
      {
        path: 'basics',
        loadComponent: () => import('./pages/docs/sections/basics').then((m) => m.BasicsComponent),
      },
      {
        path: 'api',
        loadComponent: () => import('./pages/docs/sections/api-ref').then((m) => m.ApiRefComponent),
      },
      {
        path: 'styling',
        loadComponent: () =>
          import('./pages/docs/sections/styling').then((m) => m.StylingComponent),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
