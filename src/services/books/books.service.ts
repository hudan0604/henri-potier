import { API_ENDPOINT } from "../../settings/appsettings";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BooksService {
  constructor(private http: HttpClient) {}

  public getBooks(): Observable<Object> {
    return this.http.get("http://" + API_ENDPOINT);
  }
}
