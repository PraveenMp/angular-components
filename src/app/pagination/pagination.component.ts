import { TitleService } from './../shared/services/title.service';
import { Component, OnInit } from '@angular/core';

// Add Pagination service to your compoenent
import { PagerService } from './../shared/services/pagination.service';
import * as _ from 'underscore';

@Component({
  templateUrl: './pagination-component.html',
})

export class PaginationComponent implements OnInit  {
public sampleJSon: any = [];
public serviceCode: any;
public componentTsCode: any;
public componentHtmlCode: any;
// pager object
pager: any = {};
// paged items
pagedItems: any[];

  // consume the service
  constructor(title: TitleService, private pagerService: PagerService) {
    title.setTitle('Pagination');
  }

  ngOnInit() {
    this.sampleJSon = [{
      'id': 1,
      'first_name': 'Jeanette',
      'last_name': 'Penddreth',
      'email': 'jpenddreth0@census.gov',
      'gender': 'Female',
      'ip_address': '26.58.193.2'
    }, {
      'id': 2,
      'first_name': 'Giavani',
      'last_name': 'Frediani',
      'email': 'gfrediani1@senate.gov',
      'gender': 'Male',
      'ip_address': '229.179.4.212'
    }, {
      'id': 3,
      'first_name': 'Noell',
      'last_name': 'Bea',
      'email': 'nbea2@imageshack.us',
      'gender': 'Female',
      'ip_address': '180.66.162.255'
    }, {
      'id': 4,
      'first_name': 'Willard',
      'last_name': 'Valek',
      'email': 'wvalek3@vk.com',
      'gender': 'Male',
      'ip_address': '67.76.188.26'
    }]
    this.setPage(1);
    this.getAllCode();

  }



  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    // Pass your json Object here in the example we have passed this.sampleJSon and count 3
    this.pager = this.pagerService.getPager(this.sampleJSon.length, page, 3);

    // get current page of items
    this.pagedItems = this.sampleJSon.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  public getAllCode() {
    this.serviceCode = `  import { Injectable } from '@angular/core'
    import * as _ from 'underscore';

    @Injectable()
    export class PagerService {
        getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
            // calculate total pages
            let totalPages = Math.ceil(totalItems / pageSize);

            let startPage: number, endPage: number;

            if (totalPages <= 10) {
                // less than 10 total pages so show all
                startPage = 1;
                endPage = totalPages;
            } else {
                // more than 10 total pages so calculate start and end pages
                if (currentPage <= 6) {
                    startPage = 1;
                    endPage = 10;
                } else if (currentPage + 4 >= totalPages) {
                    startPage = totalPages - 9;
                    endPage = totalPages;
                } else {
                    startPage = currentPage - 5;
                    endPage = currentPage + 4;
                }
            }

            // calculate start and end item indexes
            let startIndex = (currentPage - 1) * pageSize;
            let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

            // create an array of pages to ng-repeat in the pager control
            let pages = _.range(startPage, endPage + 1);

            // return object with all pager properties required by the view
            return {
                totalItems: totalItems,
                currentPage: currentPage,
                pageSize: pageSize,
                totalPages: totalPages,
                startPage: startPage,
                endPage: endPage,
                startIndex: startIndex,
                endIndex: endIndex,
                pages: pages
            };
        }
    }
`;
    this.componentTsCode = `
    import { TitleService } from './../shared/services/title.service';
    import { Component, OnInit } from '@angular/core';

    // Add Pagination service to your compoenent
    import { PagerService } from './../shared/services/pagination.service';
    import * as _ from 'underscore';

    @Component({
      templateUrl: './pagination-component.html',
    })

    export class PaginationComponent implements OnInit  {
    public sampleJSon: any = [];
    // pager object
    pager: any = {};
    // paged items
    pagedItems: any[];

      // consume the service
      constructor(title: TitleService, private pagerService: PagerService) {
        title.setTitle('Pagination');
      }

      ngOnInit() {
        this.sampleJSon = [{
          'id': 1,
          'first_name': 'Jeanette',
          'last_name': 'Penddreth',
          'email': 'jpenddreth0@census.gov',
          'gender': 'Female',
          'ip_address': '26.58.193.2'
        }, {
          'id': 2,
          'first_name': 'Giavani',
          'last_name': 'Frediani',
          'email': 'gfrediani1@senate.gov',
          'gender': 'Male',
          'ip_address': '229.179.4.212'
        }, {
          'id': 3,
          'first_name': 'Noell',
          'last_name': 'Bea',
          'email': 'nbea2@imageshack.us',
          'gender': 'Female',
          'ip_address': '180.66.162.255'
        }, {
          'id': 4,
          'first_name': 'Willard',
          'last_name': 'Valek',
          'email': 'wvalek3@vk.com',
          'gender': 'Male',
          'ip_address': '67.76.188.26'
        }]

        // Don't forget to initialize pager method
        this.setPage(1);
      }



      setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
          return;
        }

        // get pager object from service
        // Pass your json Object here in the example we have passed this.sampleJSon and count 3
        this.pager = this.pagerService.getPager(this.sampleJSon.length, page, 3);

        // get current page of items
        this.pagedItems = this.sampleJSon.slice(this.pager.startIndex, this.pager.endIndex + 1);
      }


    }

    `;
    this.componentHtmlCode = `   <table class="table table-bordered" style="margin:15px 0px;">
    <thead>
        <tr>
            <th>#</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Gender</th>
        </tr>
    </thead>
    <tbody *ngIf="!errorMessage">
        <tr *ngFor="let agent of pagedItems;let i=index">
            <td>{{i+1}}</td>
            <td>{{agent.first_name}}</td>
            <td>{{agent.last_name}}</td>
            <td>{{agent.email}}</td>
            <td>{{agent.gender}}</td>
        </tr>
    </tbody>
</table>
<nav aria-label="Page navigation example">
<ul *ngIf="pager.pages && pager.pages.length" class="pagination">
    <li [ngClass]="{disabled:pager.currentPage === 1}" class="page-item">
        <a (click)="setPage(1)" class="page-link">First</a>
    </li>
    <li [ngClass]="{disabled:pager.currentPage === 1}" class="page-item">
        <a (click)="setPage(pager.currentPage - 1)" class="page-link">Previous</a>
    </li>
    <li *ngFor="let page of pager.pages" [ngClass]="{active:pager.currentPage === page}" class="page-item">
        <a (click)="setPage(page)" class="page-link">{{page}}</a>
    </li>
    <li [ngClass]="{disabled:pager.currentPage === pager.totalPages}" class="page-item">
        <a (click)="setPage(pager.currentPage + 1)" class="page-link">Next</a>
    </li>
    <li [ngClass]="{disabled:pager.currentPage === pager.totalPages}" class="page-item">
        <a (click)="setPage(pager.totalPages)" class="page-link">Last</a>
    </li>
</ul>
</nav>`;
  }


}
