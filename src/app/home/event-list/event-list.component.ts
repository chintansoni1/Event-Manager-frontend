import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { EventService, Event, EVENTS } from "../services/events/event.service";
import { FormControl } from "@angular/forms";
import {
  MatTableDataSource,
  MatSort,
  MatRow,
  MatPaginator
} from "@angular/material";
import * as moment from "moment";
@Component({
  selector: "app-event-list",
  templateUrl: "./event-list.component.html",
  styleUrls: ["./event-list.component.scss"]
})
export class EventListComponent implements OnInit, AfterViewInit {
  filter = new FormControl("");
  displayedColumns: string[] = [
    "index",
    "name",
    "startDate",
    "endDate",
    "description",
    "invitedUsers"
  ];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  isRecordFound = true;
  isServerError = false;
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

    this.eventService.getEvents().subscribe(
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
