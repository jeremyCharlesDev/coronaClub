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
          // {
          //   path: 'ajout-match',
          //   loadChildren: () =>
          //     import('../home/ajout-match/ajout-match.module').then(m => m.AjoutMatchPageModule)
          // }
        ]
      },
      {
        path: 'match',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../match/match.module').then(m => m.MatchPageModule)
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
