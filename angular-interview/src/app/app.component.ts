import { Component } from '@angular/core';

@Component({
  selector: 'book-list',
  template: `
    <h1>{{title}}</h1>
    <table class="book-list">
      <tr *ngFor="let book of books">
        <table class="book-header">
          <tr (click)="onDisplayDetails(book.id)">
            <td>{{book.id}}</td>
            <td><b>{{book.title | titlecase}}</b></td>
            <td><i>{{book.author | titlecase}}</i></td>
            <td *ngIf="isBookAvailable(book.borrowers)">Available</td>
            <td *ngIf="!isBookAvailable(book.borrowers)">Not available</td>
          </tr>
        </table>
        <div [class.displayDetails]="book.id===selectedBookId" class="book-details">
          <table *ngIf="book.borrowers">
            <thead>
              <tr>
              <th>Borrower</th>
              <th>Borrowed date</th>
              <th>Returned date</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let borrower of book.borrowers">
                <td>{{borrower.name}}</td>
                <td>{{borrower.borrowedDate | date:'d MMM, y'}}</td>
                <td>{{borrower.returnedDate | date:'d MMM, y'}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </tr>
    </table>
  `,
  styles: [
    `
    .book-header tr {
      cursor:pointer;
      background-color:#eee;
    }
    .book-header tr td {
      padding : 5px;
    }
    .book-details {
      overflow : hidden;
      padding-left : 25px;
      max-height: 0;
      transition: 0.5s;
    }
    .book-details.displayDetails {
      max-height : 100px;
      overflow : scroll;
      transition: 0.5s;
    }`
  ]
})
export class AppComponent {
  title = 'Book list';

  selectedBookId = null;

  books = [
    {
    'id':1,
    'title':'Learning C#: A Practival Approach (Volume 2)',
    'author': 'bruce e. scurter',
    'borrowers':
      [
        {
          'name':'john doe',
          'borrowedDate':'2017-12-22',
      	  'returnedDate':'2018-01-19'
      	 },
      	 {
          'name':'greg stuart',
          'borrowedDate':'2018-02-25',
      	  'returnedDate':null
      	 }
      ]
    },
    {
    'id':2,
    'title':'Python: For Beginners: A Crash Course Guide to Learn Python in 1 Week',
    'author': 'timothy c. needham',
    'borrowers':
      [
         {
          'name':'philip stans',
          'borrowedDate':'2016-09-12',
      	  'returnedDate':'2016-09-30'
      	 },
         {
          'name':'chris vons',
          'borrowedDate':'2018-04-01',
          'returnedDate':'2018-04-02'
         },
         {
          'name':'keith jones',
          'borrowedDate':'2018-08-01',
          'returnedDate':'2018-04-02'
         }
      ]
    }
  ];

  onDisplayDetails(id: Number) : void {
    if(this.selectedBookId === id)
    {
      this.selectedBookId = null;
    }
    else
    {
      this.selectedBookId = id;
    }
  };

  isBookAvailable(borrowers: Array) : Boolean {
    for(let borrower of borrowers)
    {
      if(borrower.returnedDate === null) return false;
    }
    return true;
  }
}
