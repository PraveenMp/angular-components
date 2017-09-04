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
}
