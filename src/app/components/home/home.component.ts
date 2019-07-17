import { Component, OnInit } from "@angular/core";

import { BooksService } from "src/services/books/books.service";
import { StorageService } from "src/services/storage/storage.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  books = [];

  loadStatus: boolean;

  constructor(
    private booksService: BooksService,
    private storageService: StorageService
  ) {}

  /*
   * get books from http request
   * and put spinner to make user
   * wait during the request
   */
  getAllBooks() {
    this.loadStatus = true;
    this.booksService.getBooks().subscribe(e => {
      this.books = e;
      this.loadStatus = false;
    });
  }

  /*
   *send book to storage service
   */
  addToCart(book): void {
    this.storageService.addToCart(book);
  }
  search(value) {
    let searchValue = value.toLowerCase();

    this.books = this.books.filter(e => {
      for (let paragraph of e.synopsis) {
        return paragraph.toLowerCase().includes(searchValue);
      }
    });

    /*
     * if the user deletes his search,
     * request the server to
     * reset all the books
     */
    if (value == "") {
      this.getAllBooks();
    }
  }

  ngOnInit() {
    this.getAllBooks();
  }
}
