import { Component, OnDestroy, OnInit } from "@angular/core";

import { StorageService } from "src/services/storage/storage.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit, OnDestroy {
  booksInCart = [];
  offers;
  priceOfTheOnlyBook: number;
  totalPrice = 0;

  totalPriceCalc: any;
  priceAfterPercentage: number;
  priceAfterMinus: number;
  priceAfterSlice: number;
  priceAfterBestOffer: number;
  loadStatus: boolean;
  numberOfBooks: any;

  constructor(private storageService: StorageService) {}

  /*
   * delete a book from cart
   */
  deleteBookFromcart(i): void {
    this.storageService.deleteBook(i);
    this.caclulateTotalPrice();

    /*
     * if there is only one product in cart
     * then set the books array to empty array
     */
    if (this.getNumberOfBooksInCart() === 1) {
      this.priceOfTheOnlyBook = this.storageService.getBooksInCart()[0].price;
    } else if (this.getNumberOfBooksInCart() > 1)
      /*
       * else if there is more than one product in cart
       * then make http request to get the promotions
       */
      this.storageService.getPromotions().subscribe(e => {
        this.offers = e;
      });
    // calculate new price after promotions
    this.calculatePriceAfterOffers();
    // visualize the books in storage after book deletion
    this.booksInCart = this.storageService.getBooksInCart();
  }

  caclulateTotalPrice() {
    let price = 0;
    this.booksInCart = this.storageService.getBooksInCart();
    for (let book of this.booksInCart) {
      price += book.price;
    }
    this.totalPrice = price;
  }

  calculatePriceAfterOffers() {
    this.booksInCart = this.storageService.getBooksInCart();
    if (this.getNumberOfBooksInCart() === 1)
      this.priceOfTheOnlyBook = this.booksInCart[0].price;
    if (this.booksInCart.length > 1) {
      this.loadStatus = true;

      this.storageService.getPromotions().subscribe(e => {
        this.offers = e;
        this.caclulateTotalPrice();
        // calculate price after offer for each offer
        for (let offer of this.offers.offers) {
          if (offer.type === "percentage") {
            this.priceAfterPercentage =
              this.totalPrice * (1 - offer.value / 100);
          } else if (offer.type === "minus") {
            this.priceAfterMinus = this.totalPrice - offer.value;
          } else if (
            offer.type === "slice" &&
            this.totalPrice / offer.sliceValue >= 1
          ) {
            this.priceAfterSlice =
              this.totalPrice -
              Math.floor(this.totalPrice / offer.sliceValue) * offer.value;
          }
        }
        /*
         * if the total price is lower than the slice value
         * then calculate minimum of afterMinus and afterPercentage
         */
        this.priceAfterSlice === undefined
          ? (this.priceAfterBestOffer = Math.min(
              this.priceAfterMinus,
              this.priceAfterPercentage
            ))
          : // else calculate the minimum price between all offers
            (this.priceAfterBestOffer = Math.min(
              this.priceAfterMinus,
              this.priceAfterPercentage,
              this.priceAfterSlice
            ));
        this.loadStatus = false;
      });
    }
  }
  getNumberOfBooksInCart(): number {
    return this.storageService.getBooksInCart().length;
  }
  ngOnInit() {
    this.calculatePriceAfterOffers();
    console.log(this.getNumberOfBooksInCart());
  }
  ngOnDestroy() {
    this.storageService.resetIsbnsToZero();
  }
}
