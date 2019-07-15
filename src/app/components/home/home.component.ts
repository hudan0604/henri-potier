import { Component, OnInit } from "@angular/core";

import { BehaviorSubject } from "rxjs";
import { BooksService } from "src/services/books/books.service";
import { StorageService } from "src/services/storage/storage.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  books: Object;

  constructor(
    private booksService: BooksService,
    private storageService: StorageService
  ) {}

  /*
   **
   *send book to storage service
   */
  addToCart(book): void {
    //console.log(book);
    this.storageService.addToCart(book);
  }

  ngOnInit() {
    this.booksService.getBooks().subscribe(e => {
      this.books = e;
      console.log(e);
    });
  }
}
