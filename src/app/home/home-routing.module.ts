import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { EventListComponent } from "./event-list/event-list.component";
import { AddEventComponent } from "./add-event/add-event.component";
import { EventInviteListComponent } from "./event-invite-list/event-invite-list.component";
import { SessionGuard } from "../guard/session.guard";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [SessionGuard],
    children: [
      { path: "", redirectTo: "/home/events", pathMatch: "full" },
      { path: "events", component: EventListComponent },
      { path: "events/create", component: AddEventComponent },
      { path: "events/invites", component: EventInviteListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
