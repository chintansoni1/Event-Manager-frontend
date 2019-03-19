import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}
  login(user) {
    return this.http.post("user/login", user);
  }

  register(user) {
    return this.http.post("user/sign-up", user);
  }

  forgotPassword(user) {
    return this.http.put("user/forgot-password", user);
  }

  resetPassword(data) {
    return this.http.put("user/reset-password", data);
  }
}
