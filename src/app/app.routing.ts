import { PaginationComponent } from './pagination/pagination.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TitleComponent } from './title/title.component';
import { PageNotFoundComponent } from './shared/components/pagenotfound.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: TitleComponent
    },
    {
        path: 'title',
        component: TitleComponent
    },
    {
      path: 'pagination',
      component: PaginationComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    declarations: [
        PageNotFoundComponent
    ],
    exports: [RouterModule]
})

export class AppRouterModule {
}
