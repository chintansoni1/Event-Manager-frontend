import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "../services/authentication/authentication.service";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { AppService } from "../../services/app.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"]
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  isError = false;
  token: string;
  constructor(
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private appService: AppService
  ) {
    this.token = this.route.snapshot.params.token;
    this.appService.setToken(this.token);
    this.initResetPasswordForm();
  }

  initResetPasswordForm() {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(5)
      ])
    });
  }

  ngOnInit() {}

  resetPassword() {
    this.isError = false;
    let data = this.resetPasswordForm.value;
    data.token = this.token;
    this.authService.resetPassword(data).subscribe(
      (res: any) => {
        this.openSnackBar("Password has been reset successfully", "Ok");
      },
      err => {
        if (err.status === 403) {
          this.openSnackBar("Token is expired", "Ok");
        } else if (err.status === 404) {
          this.openSnackBar("User not found", "Ok");
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
