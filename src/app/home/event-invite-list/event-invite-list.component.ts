import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { EventService, Event, EVENTS } from "../services/events/event.service";
import * as moment from "moment";
@Component({
  selector: "app-event-invite-list",
  templateUrl: "./event-invite-list.component.html",
  styleUrls: ["./event-invite-list.component.scss"]
})
export class EventInviteListComponent implements OnInit {
  isRecordFound = true;
  isServerError = false;
  filter = new FormControl("");
  displayedColumns: string[] = [
    "index",
    "name",
    "startDate",
    "endDate",
    "description",
    "organizer"
  ];
  dataSource = new MatTableDataSource<Event>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions = [10, 20, 50];
  constructor(private eventService: EventService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    /**
     * Mock data
     */
    // this.dataSource.data = EVENTS;
    /**
     * Data from api
     */

    this.eventService.getEventsInvitedIn().subscribe(
      (res: any) => {
        this.isRecordFound = res.length ? true : false;
        res.forEach((item, index) => {
          item.index = index + 1;
          item.startDate = moment(item.startDate).format("DD-MMM-YYYY");
          item.endDate = moment(item.endDate).format("DD-MMM-YYYY");
        });
        this.dataSource.data = res;
      },
      err => {
        if (err.status === 404) {
          this.isRecordFound = false;
        } else {
          this.isServerError = true;
        }
      }
    );

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
