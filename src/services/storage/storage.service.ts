import { API_ENDPOINT } from "../../settings/appsettings";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  booksInCart = [];
  isbns = [];

  constructor(private http: HttpClient) {}

  /*
   * Add book to array of books in cart
   * then add the whole array to local storage
   */
  addToCart(book): void {
    this.booksInCart = this.getBooksInCart();
    this.booksInCart.push(book);
    localStorage.setItem("booksInCart", JSON.stringify(this.booksInCart));
  }

  deleteBook(index): void {
    console.log(this.getBooksInCart());
    this.booksInCart = this.getBooksInCart().filter(
      e => e.title !== this.getBooksInCart()[index].title
    );
    localStorage.setItem("booksInCart", JSON.stringify(this.booksInCart));
  }
  //return the books in cart
  getBooksInCart(): any[] {
    return JSON.parse(localStorage.getItem("booksInCart"));
  }
  getPromotions(): any {
    this.isbns = [];
    let books = this.getBooksInCart();
    for (let book of books) {
      this.isbns.push(book.isbn);
    }

    let stringOfIsbns = this.isbns.join(",");

    return this.http.get(
      "http://" + API_ENDPOINT + stringOfIsbns + "/commercialOffers"
    );
  }
  resetIsbnsToZero() {
    this.isbns = [];
  }
}
