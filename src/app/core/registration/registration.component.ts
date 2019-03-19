import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "../services/authentication/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"]
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  isSignupError = false;
  isUserExists = false;
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.initSignupForm();
  }

  ngOnInit() {}

  initSignupForm() {
    this.registrationForm = new FormGroup(
      {
        firstName: new FormControl("", [Validators.required]),
        lastName: new FormControl("", [Validators.required]),
        emailId: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", [
          Validators.required,
          Validators.minLength(5)
        ]),
        confirmPassword: new FormControl("", [Validators.required])
      },
      this.checkPasswords
    );
  }

  register() {
    this.isSignupError = false;
    this.isUserExists = false;
    this.authService.register(this.registrationForm.value).subscribe(
      (res: any) => {
        this.router.navigateByUrl("/login");
      },
      err => {
        if (err.status === 409) {
          this.isUserExists = true;
        } else {
          this.isSignupError = true;
        }
      }
    );
  }

  checkPasswords(group: FormGroup) {
    const password = group.controls.password.value;
    let confirmPassword = group.controls.confirmPassword.value;

    return password === confirmPassword ? null : { isPasswordNotEqual: true };
  }
}
