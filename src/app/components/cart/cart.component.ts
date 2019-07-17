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

  constructor(private storageService: StorageService) {}
  deleteBookFromcart(i): void {
    this.storageService.deleteBook(i);
    this.caclulateTotalPrice();

    if (this.getNumberOfBooksInCart() > 1)
      this.storageService.getPromotions().subscribe(e => {
        this.offers = e;
      });
    else if (this.getNumberOfBooksInCart() === 1) {
      this.priceOfTheOnlyBook = this.storageService.getNumberOfBooksInCart()[0].price;
    }
    this.calculatePriceAfterOffers();
    this.booksInCart = this.storageService.getNumberOfBooksInCart();
  }

  caclulateTotalPrice() {
    let price = 0;
    this.booksInCart = this.storageService.getNumberOfBooksInCart();
    for (let book of this.booksInCart) {
      price += book.price;
    }
    this.totalPrice = price;
  }
  calculatePriceAfterOffers() {
    this.booksInCart = this.storageService.getNumberOfBooksInCart();

    if (this.booksInCart.length > 1) {
      this.loadStatus = true;
      this.priceOfTheOnlyBook = this.booksInCart[0].price;
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

        this.priceAfterSlice === undefined
          ? (this.priceAfterBestOffer = Math.min(
              this.priceAfterMinus,
              this.priceAfterPercentage
            ))
          : (this.priceAfterBestOffer = Math.min(
              this.priceAfterMinus,
              this.priceAfterPercentage,
              this.priceAfterSlice
            ));
        this.loadStatus = false;
      });
    }
  }
  getNumberOfBooksInCart(): number {
    return this.storageService.getNumberOfBooksInCart().length;
  }
  ngOnInit() {
    this.calculatePriceAfterOffers();
  }
  ngOnDestroy() {
    this.storageService.resetIsbnsToZero();
  }
}
