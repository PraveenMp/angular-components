import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule  } from '@angular/http';
import { HighlightModule } from 'ngx-highlightjs';

import { AppComponent } from './app.component';
import { TitleComponent } from './title/title.component';
import { PaginationComponent } from './pagination/pagination.component';
 import { AppRouterModule } from './app.routing';
 import { TitleService } from 'app/shared/services/title.service';
 import { PagerService } from 'app/shared/services/pagination.service';


@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    HttpModule,
    HighlightModule.forRoot({ theme: 'monokai-sublime'})
  ],
  providers: [
    TitleService,
    PagerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
