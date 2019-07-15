import { BehaviorSubject, Observable } from "rxjs";

import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  booksInCart = [];

  constructor() {}

  /*
   * Add book to array of books in cart
   * then add the whole array to local storage
   */
  addToCart(book): void {
    this.booksInCart.push(book);
    localStorage.setItem("booksInCart", JSON.stringify(this.booksInCart));
    this.booksInCart = this.getBooksInCart();
  }

  deleteBook(i): void {
    this.booksInCart.splice(i, 1);
    localStorage.setItem("booksInCart", JSON.stringify(this.booksInCart));
    this.booksInCart = this.getBooksInCart();
  }
  //return the books in cart
  getBooksInCart(): any[] {
    return JSON.parse(localStorage.getItem("booksInCart"));
  }
}
