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
    this.booksInCart.push(book);
    localStorage.setItem("booksInCart", JSON.stringify(this.booksInCart));
    this.booksInCart = this.getBooksInCart();
  }

  deleteBook(index): void {
    console.log(this.getBooksInCart().splice(index, 1));
    this.getBooksInCart().length === 1
      ? (this.booksInCart = [])
      : (this.booksInCart = this.getBooksInCart().filter(e => {
          e !== this.getBooksInCart()[index].price;
        }));
    localStorage.setItem("booksInCart", JSON.stringify(this.booksInCart));

    //console.log(this.booksInCart);
  }
  //return the books in cart
  getBooksInCart(): any[] {
    if (localStorage.getItem("booksInCart")) {
      return JSON.parse(localStorage.getItem("booksInCart"));
    } else return [];
  }
  getPromotions(): any {
    this.isbns = [];
    let books = this.getBooksInCart();
    for (let book of books) {
      this.isbns.push(book.isbn);
    }

    let stringOfIsbns = this.isbns.join(",");
    console.log("list of isbns: ", stringOfIsbns);
    return this.http.get(
      "http://" + API_ENDPOINT + stringOfIsbns + "/commercialOffers"
    );
  }
  resetIsbnsToZero() {
    this.isbns = [];
  }
}
