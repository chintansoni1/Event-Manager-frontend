import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import {
  MatAutocomplete,
  MatChipInputEvent,
  MatAutocompleteSelectedEvent,
  MatSnackBar
} from "@angular/material";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { startWith, map } from "rxjs/operators";
import { EventService } from "../services/events/event.service";
import { Router } from "@angular/router";
import * as moment from "moment";

@Component({
  selector: "app-add-event",
  templateUrl: "./add-event.component.html",
  styleUrls: ["./add-event.component.scss"]
})
export class AddEventComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  inviteUserCtrl = new FormControl();
  filteredUsers: Observable<string[]>;
  selectedUsers: Array<any> = [];
  allUsers: Array<any> = [];
  addEventForm: FormGroup;
  isServerError = false;

  @ViewChild("inviteUserInput") inviteUserInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;
  constructor(
    private snackBar: MatSnackBar,
    private eventService: EventService,
    private router: Router
  ) {
    this.initAddEventForm();
    this.filteredUsers = this.inviteUserCtrl.valueChanges.pipe(
      startWith(null),
      map((user: any | null) =>
        user ? this._filter(user) : this.allUsers.slice()
      )
    );
  }

  ngOnInit() {
    this.eventService.getUsers().subscribe(
      (res: any) => {
        this.allUsers = res;
      },
      err => {
        this.allUsers = [];
      }
    );
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || "").trim()) {
        this.selectedUsers.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = "";
      }

      this.inviteUserCtrl.setValue(null);
    }
  }

  remove(user: string): void {
    const index = this.selectedUsers.indexOf(user);

    if (index >= 0) {
      this.selectedUsers.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const isItemExists = this.selectedUsers.find(
      user => user.id === event.option.value.id
    );
    if (isItemExists) {
      this.openSnackBar("User is already selected", "Dismiss");
    } else {
      this.selectedUsers.push(event.option.value);
      this.inviteUserInput.nativeElement.value = "";
      this.inviteUserCtrl.setValue(null);
    }
  }

  private _filter(value: any): string[] {
    let filterValue;
    if (typeof value === "string") {
      filterValue = value.toLowerCase();
    } else {
      filterValue = value.name.toLowerCase();
    }
    return this.allUsers.filter(
      user => user.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  initAddEventForm() {
    this.addEventForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required,Validators.minLength(10)]),
      startDate: new FormControl("", [Validators.required]),
      endDate: new FormControl("", [Validators.required])
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  addEvent() {
    let eventData = this.addEventForm.value;
    eventData.invitedUsers = [];
    this.selectedUsers.forEach(item => {
      eventData.invitedUsers.push(item.id);
    });
    eventData.startDate = moment(eventData.startDate).format("YYYY-MM-DD");
    eventData.endDate = moment(eventData.endDate).format("YYYY-MM-DD");
    this.eventService.addEvent(this.addEventForm.value).subscribe(
      res => {
        this.openSnackBar("Event created successfully", "Ok");
        this.router.navigateByUrl("/home");
      },
      err => {
        this.isServerError = true;
      }
    );
  }
}
