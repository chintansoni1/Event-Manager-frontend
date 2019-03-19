import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { EventListComponent } from "./event-list/event-list.component";
import { HomeComponent } from "./home.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { MaterialModule } from "../material/material.module";
import { AddEventComponent } from "./add-event/add-event.component";
import { EventInviteListComponent } from "./event-invite-list/event-invite-list.component";

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbModule,
    FormsModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    EventListComponent,
    HomeComponent,
    AddEventComponent,
    EventInviteListComponent
  ]
})
export class HomeModule {}
