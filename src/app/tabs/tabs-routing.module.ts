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
          }
        ]
      },
      {
        path: 'match',
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
          }
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
