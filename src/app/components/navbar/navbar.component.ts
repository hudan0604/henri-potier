import { Component, OnInit } from "@angular/core";

import { BehaviorSubject } from "rxjs";
import { StorageService } from "src/services/storage/storage.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  books: number;

  constructor(private storageService: StorageService) {}
  getBooksInCart(): number {
    return this.storageService.getBooksInCart().length;
  }

  ngOnInit() {}
}
