import { TitleService } from './../shared/services/title.service';
import { Component,OnInit } from '@angular/core';
@Component({
  templateUrl: './title-component.html',
})

export class TitleComponent implements OnInit  {
public componentCode: any;
public serviceCode: any;
public moduleCode: any;
public indexCode: any;
  constructor(title: TitleService) {
    title.setTitle('How to set page specific title in Angular');
  }

  ngOnInit() {
    this.componentCode = `
    import { TitleService } from './../shared/services/title.serives';
    import { Component } from '@angular/core';

      @Component({
        templateUrl: './some-componet.html',
      })

      export class SomeComponent  {

        constructor(title: TitleService) {
          title.setTitle('Set page specific title in Angular');
        }

      }`;
      this.serviceCode = `
      import { Title } from '@angular/platform-browser';
      import { Injectable } from '@angular/core';

      @Injectable()
      export class TitleService {
        private currentTitle: string;

        constructor(private title: Title) {
        }

        public setTitle(val: string) {
          this.currentTitle = 'Angular Components - ' + (val || '');
          this.title.setTitle(this.currentTitle);
        }

        public getTitle() {
          return this.currentTitle;
        }
      }`;
      this.moduleCode = `
      import { BrowserModule } from '@angular/platform-browser';
      import { NgModule } from '@angular/core';

      import { AppComponent } from './app.component';
      import { TitleComponent } from './title/title.component';

      import { AppRouterModule } from './app.routing';
      import { TitleService } from 'app/shared/services/title.serives';

      @NgModule({
        declarations: [
          AppComponent,
          TitleComponent
        ],
        imports: [
          BrowserModule,
          AppRouterModule,

        ],
        providers: [TitleService],
        bootstrap: [AppComponent]
      })
      export class AppModule {

      }`;

      this.indexCode = `<!doctype html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Angular Components</title>
        <base href="/">
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        <app-root></app-root>
      </body>
      </html>
     `;
  }

}
