import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StaticHeaderComponent } from "./components/static-header/static-header.component";
import { MaterialModule } from "../material/material.module";
import { HeaderComponent } from "./components/header/header.component";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule],
  declarations: [StaticHeaderComponent, HeaderComponent],
  exports: [StaticHeaderComponent, HeaderComponent]
})
export class SharedModule {}
