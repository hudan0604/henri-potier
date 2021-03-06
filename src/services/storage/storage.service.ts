import { API_ENDPOINT } from "../../settings/appsettings";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

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
  /*
   * Delete book from cart
   */
  deleteBook(index): void {
    this.booksInCart = this.getBooksInCart().filter(
      e => e.title !== this.getBooksInCart()[index].title
    );
    localStorage.setItem("booksInCart", JSON.stringify(this.booksInCart));
  }
  /*
   * Returns the books in local storage
   */
  getBooksInCart(): any[] {
    return JSON.parse(localStorage.getItem("booksInCart"));
  }
  /*
   * Sends the http request
   * to catch the different
   * promotional offers
   */
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
