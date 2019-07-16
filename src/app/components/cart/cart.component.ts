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
  oldPrice = 0;

  totalPriceCalc: any;
  priceAfterPercentage: number;
  priceAfterMinus: number;
  priceAfterSlice: number;
  priceAfterBestOffer: number;
  loadStatus: boolean;

  constructor(private storageService: StorageService) {}
  deleteBookFromcart(i): void {
    this.storageService.deleteBook(i);
    this.booksInCart = this.storageService.getBooksInCart();
    if (this.booksInCart.length > 1)
      this.storageService.getPromotions().subscribe(e => {
        this.offers = e;
      });
  }

  caclulateTotalPrice() {
    let price = 0;
    for (let book of this.booksInCart) {
      price += book.price;
    }
    this.oldPrice = price;
  }

  ngOnInit() {
    this.booksInCart = this.storageService.getBooksInCart();
    this.priceOfTheOnlyBook = this.booksInCart[0].price;

    if (this.booksInCart.length > 1) {
      this.loadStatus = true;
      this.storageService.getPromotions().subscribe(e => {
        this.offers = e;
        this.caclulateTotalPrice();
        // calculate price after offer for each offer
        for (let offer of this.offers.offers) {
          if (offer.type === "percentage") {
            this.priceAfterPercentage = this.oldPrice * (1 - offer.value / 100);
          } else if (offer.type === "minus") {
            this.priceAfterMinus = this.oldPrice - offer.value;
          } else if (
            offer.type === "slice" &&
            this.oldPrice / offer.sliceValue >= 1
          ) {
            this.priceAfterSlice =
              this.oldPrice -
              Math.floor(this.oldPrice / offer.sliceValue) * offer.value;
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
  ngOnDestroy() {
    this.storageService.resetIsbnsToZero();
  }
}
