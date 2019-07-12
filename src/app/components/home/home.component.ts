import { Component, OnInit } from "@angular/core";

import { BooksService } from "src/services/books.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  books: Object;

  constructor(private booksService: BooksService) {}

  ngOnInit() {
    this.booksService.getBooks().subscribe(e => {
      this.books = e;
      console.log(e);
    });
  }
}
