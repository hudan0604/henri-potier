import { ChangeDetectorRef, Component, OnInit } from "@angular/core";

import { StorageService } from "src/services/storage/storage.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
  booksInCart: any;

  constructor(private storageService: StorageService) {}
  deleteBookFromcart(i): void {
    this.storageService.deleteBook(i);
    this.booksInCart = this.storageService.getBooksInCart();
  }

  ngOnInit() {
    this.booksInCart = this.storageService.getBooksInCart();
    console.log(this.booksInCart);
  }
}
