import { ComponentFixture, TestBed, async } from "@angular/core/testing";

import { CartComponent } from "./cart.component";
import { StorageService } from "src/services/storage/storage.service";

describe("CartComponent", () => {
  let component: CartComponent;
  let storageService: StorageService;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CartComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should get books", () => {
    spyOn(storageService, "getBooksInCart");
    component.ngOnInit();
    expect(storageService.getBooksInCart).toHaveBeenCalled();
  });
});
