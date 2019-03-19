import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AppService {
  private token: string = "";
  baseUrl: string = "http://localhost:4000/";
  constructor(private httpClient: HttpClient) {}

  redirectToLogin() {}

  getBaseUrl() {
    return this.httpClient.get("assets/settings.json");
  }

  setToken(token) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  storeToken() {
    localStorage.setItem("event-auth-token", this.token);
  }

  getTokenFromStorage() {
    this.setToken(localStorage.getItem("event-auth-token"));
  }
}
