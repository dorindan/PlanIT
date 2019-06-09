import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";
import {Event} from "../../model/Event";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  pricePerPerson : number;
  event : Event;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Event) { }

  ngOnInit() {
    this.event = this.data;
    this.pricePerPerson = Math.round(this.event.cost * 100.0 / this.event.maximumPersons) / 100;
  }

}
