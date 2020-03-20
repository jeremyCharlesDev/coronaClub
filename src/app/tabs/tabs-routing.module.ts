import { AuthGuard } from './../auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then(m => m.HomePageModule)
          },
          {
            path: 'login',
            loadChildren: () =>
              import('../home/login/login.module').then(m => m.LoginPageModule)
          },
          {
            path: 'edit-home',
            loadChildren: () =>
              import('../home/edit-home/edit-home.module').then(m => m.EditHomePageModule)
          },
          {
            path: 'forgotpw',
            loadChildren: () =>
              import('../home/forgotpw/forgotpw.module').then(m => m.ForgotpwPageModule)
          }
        ]
      },
      {
        path: 'match',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../match/match.module').then(m => m.MatchPageModule)
          },
          {
            path: 'ajout-match',
            loadChildren: () =>
              import('../match/ajout-match/ajout-match.module').then(m => m.AjoutMatchPageModule)
          },
          {
            path: 'gestion-match',
            loadChildren: () =>
              import('../match/gestion-match/gestion-match.module').then(m => m.GestionMatchPageModule)
          }
        ]
      },
      {
        path: 'players',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../players/players.module').then(m => m.PlayersPageModule)
          },
          {
            path: 'add-players',
            loadChildren: () =>
              import('../players/add-players/add-players.module').then(m => m.AddPlayersPageModule)
          },
          {
            path: 'gestion-players',
            loadChildren: () =>
              import('../players/gestion-players/gestion-players.module').then(m => m.GestionPlayersPageModule)
          },
          {
            path: 'maj-players',
            loadChildren: () =>
              import('../players/maj-players/maj-players.module').then(m => m.MajPlayersPageModule)
          },
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
