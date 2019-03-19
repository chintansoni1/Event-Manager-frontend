import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { AuthenticationService } from "../services/authentication/authentication.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"]
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  isError = false;
  isUserExists = true;
  constructor(
    private authService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {
    this.forgotPasswordForm = new FormGroup({
      emailId: new FormControl("", [Validators.required, Validators.email])
    });
  }

  ngOnInit() {}

  forgotPassword() {
    this.isError = false;
    this.isUserExists = true;
    this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe(
      (res: any) => {
        this.openSnackBar("Email has been sent successfully", "Ok");
      },
      err => {
        if (err.status === 404) {
          this.isUserExists = false;
        } else {
          this.isError = true;
        }
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
