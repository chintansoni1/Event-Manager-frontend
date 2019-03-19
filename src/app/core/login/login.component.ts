import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication/authentication.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoginError = false;
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private appService: AppService
  ) {
    this.loginForm = new FormGroup({
      emailId: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required])
    });
  }

  ngOnInit() {}

  login() {
    this.isLoginError = false;
    this.authService.login(this.loginForm.value).subscribe(
      (res: any) => {
        this.appService.setToken(res.token);
        this.router.navigateByUrl("/home");
      },
      err => {
        if (err.status === 404) {
          this.isLoginError = true;
        }
      }
    );
    // if (this.authService.login(this.loginForm.value)) {
    //   this.router.navigateByUrl("/home");
    // } else {
    //   this.isLoginError = true;
    // }
  }
}
