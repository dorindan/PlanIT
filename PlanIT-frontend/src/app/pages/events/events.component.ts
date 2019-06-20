import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatTableDataSource} from "@angular/material";
import {Event} from "../../model/Event";
import {EventDetailsComponent} from "../event-details/event-details.component";
import {EventService} from "../../services/event.service";
import {User} from "../../model/User";
import {forEach} from "@angular/router/src/utils/collection";
import {Router} from "@angular/router";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})



export class EventsComponent implements OnInit {

  displayedColumns: string[] = ['sport', 'location', 'dateAndHour', 'pricePerPerson'];
  dataSource = new MatTableDataSource<Event>();
  checked = false;
  checked2 = false;
  events : Event[];
  subscribedevents : Event[];
  loggedUserEvents : Event[] = [];
  private loggedUserUsername:string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog,
              private router: Router,
              public eventService : EventService) { }

  openDialog(element) {
    console.log(element);
    console.log(this.subscribedevents);
    let subscribed : boolean = false;
    this.subscribedevents.forEach(event =>{
      if (event.id === element.id){
        subscribed = true
      }
    })
    let loggedUserUsername : string = this.loggedUserUsername;
    let dialogRef = this.dialog.open(EventDetailsComponent, {
      data: {
        event : element,
        subscribed,
        loggedUserUsername
      }
    });
  }

  ngOnInit() {
    this.loggedUserUsername = sessionStorage.getItem('token');
    this.eventService.getEvents().subscribe(response => {
      // console.log(response);
      this.dataSource.data = response;
      this.events = response;
    });
    // this.events.push(new Event('a','a',12,'asd',4,'asfg',new User('a','b')))
    this.dataSource.paginator = this.paginator;


    this.eventService.getSubscribedEvents(this.loggedUserUsername).subscribe(response => {
      // console.log(response);
      this.subscribedevents = response;
    });
  }

  changeEventsToCreatedEvents(){
    this.loggedUserEvents = [];
    this.events.forEach( value => {
      if (value.owner.username === this.loggedUserUsername){
        this.loggedUserEvents.push(value);
      }
    });

    if (this.checked2 === true && this.checked === true){
      this.dataSource.data = this.loggedUserEvents;
    }

    else if (this.checked === false && this.checked2 === true){
      this.dataSource.data = this.subscribedevents;
    }

    else if (this.checked === true){
      this.dataSource.data = this.loggedUserEvents;
    }
    else {
      this.dataSource.data = this.events;
    }
  }

  changeEventsToSubscribedEvents(){
    if (this.checked2 === true && this.checked === true){
      this.dataSource.data = this.loggedUserEvents;
    }

    else if (this.checked2 === false && this.checked === true){
      this.dataSource.data = this.loggedUserEvents;
    }

    else if (this.checked2 === true){
      this.dataSource.data = this.subscribedevents;
    }
    else {
      this.dataSource.data = this.events;
    }
  }

  subscribed(event : Event){
    // console.log(this.subscribedevents);
    return this.subscribedevents.includes(event);
  }

  routeIT(){
    this.router.navigate(['add-events']);
  }

}
