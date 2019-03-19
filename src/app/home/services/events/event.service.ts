import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export interface Event {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  invitedUsers: Array<string>;
}

export const EVENTS: Event[] = [
  {
    id: "1",
    name: "Birthday Celebration",
    description: "",
    startDate: "20/03/2019",
    endDate: "21/03/2019",
    invitedUsers: ["John Doe", "Dummy User"]
  }
];

@Injectable({
  providedIn: "root"
})
export class EventService {
  constructor(private http: HttpClient) {}

  getEvents() {
    // return EVENTS;
    return this.http.get("event/user/me");
  }

  getEventsInvitedIn() {
    return this.http.get("event/user/me?invite=true");
  }

  addEvent(eventData) {
    return this.http.post("event", eventData);
  }

  getUsers() {
    return this.http.get("user");
  }
}
