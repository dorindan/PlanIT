import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatSnackBar} from "@angular/material";
import {Event} from "../../model/Event";
import {EventService} from "../../services/event.service";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  subscribed : boolean;
  loggedUserUsername : string;
  pricePerPerson : number;
  event : Event;
  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public eventService : EventService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.subscribed = this.data.subscribed;
    this.event = this.data.event;
    this.loggedUserUsername = this.data.loggedUserUsername;
    this.pricePerPerson = Math.round(this.event.cost * 100.0 / this.event.maximumPersons) / 100;
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['snackbar']
    });
  }

  subscribe(){
    this.eventService.subscribe(this.loggedUserUsername,this.event.id).subscribe(rez => {
      // this.router.navigate(['chat']);
    }, error1 => {
      this.showSnackbar('Number of subscribed persons is already full');
    });
  }

  unsubscribe(){
    this.eventService.unsubscribe(this.loggedUserUsername,this.event.id).subscribe(rez => {
      // this.router.navigate(['chat']);
    }, error1 => {
      this.showSnackbar('Something went wrong. Please try again.');
    });
  }

  isOwner(){
    return this.event.owner.username === this.loggedUserUsername;
  }

  deleteEvent(){
    this.eventService.deleteById(this.event.id).subscribe(rez => {
    }, error1 => {
      this.showSnackbar('Something went wrong. Please try again.');
    });
  }

}
