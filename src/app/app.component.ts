import { Component, OnInit } from "@angular/core";
import { AppService } from "./services/app.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "app";

  constructor(private appService: AppService) {
    window.onbeforeunload = e => {
      this.appService.storeToken();
    };
  }
  ngOnInit(): void {}
}
