import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'atelier',
    renderMode: RenderMode.Server,
  },
  {
    path: 'atelier/add',
    renderMode: RenderMode.Server,
  },
  {
    path: 'atelier/edit/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'atelier/detail/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
