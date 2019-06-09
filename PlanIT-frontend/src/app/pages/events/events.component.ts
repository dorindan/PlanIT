import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatTableDataSource} from "@angular/material";
import {Event} from "../../model/Event";
import {EventDetailsComponent} from "../event-details/event-details.component";
import {EventService} from "../../services/event.service";
import {User} from "../../model/User";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})



export class EventsComponent implements OnInit {

  displayedColumns: string[] = ['sport', 'location', 'dateAndHour', 'pricePerPerson'];
  dataSource = new MatTableDataSource<Event>();
  checked = false;
  events : Event[];
  loggedUserEvents : Event[] = [];
  private loggedUserUsername:string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog,
              public eventService : EventService) { }

  openDialog(element) {
    let dialogRef = this.dialog.open(EventDetailsComponent, {
      data: element
    });
  }

  ngOnInit() {
    this.loggedUserUsername = sessionStorage.getItem('token');
    this.eventService.getEvents().subscribe(response => {
      console.log(response);
      this.dataSource.data = response;
      this.events = response;
    });
    // this.events.push(new Event('a','a',12,'asd',4,'asfg',new User('a','b')))
    this.dataSource.paginator = this.paginator;
  }

  changeEvents(){
    this.loggedUserEvents = [];
    this.events.forEach( value => {
      if (value.owner.username === this.loggedUserUsername){
        this.loggedUserEvents.push(value);
      }
    });
    if (this.checked === true){
      this.dataSource.data = this.loggedUserEvents;
    }
    else {
      this.dataSource.data = this.events;
    }
  }


}
