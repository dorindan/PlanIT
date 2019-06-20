import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl,FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import {MatDatepickerInputEvent, MatSnackBar} from "@angular/material";
import {Event} from "../../model/Event";
import {User} from "../../model/User";
import {EventService} from "../../services/event.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent implements OnInit {
  sport: string;
  isLinear = false;
  locatie: string;
  totalCost: number;
  currentDate = new Date();
  month: number;
  date = '';
  events: string[] = [];
  time = '00:00';
  hours: string[] = [];
  hourControl = new FormControl('', [Validators.required]);
  maximumNumberOfPersons: number;
  description: string;
  loggedUser: User;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder,
              public userService : UserService,
              public eventService : EventService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.fifthFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.sixthFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.fillHours();
    this.userService.getUserByUsername(sessionStorage.getItem('token')).subscribe(response => {
      console.log(response);
      this.loggedUser = response;
    });
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.key;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
  }

  onChange(event) {
    this.time = event.value;
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['snackbar']
    });
  }

  addDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.month = event.value.getMonth() + 1;
    this.date = event.value.getDate() + '/' + this.month + '/' + event.value.getFullYear();
  }

  validateHour(time: string) {
    const splittedHour = time.split(':', 2);
    const splittedDate = this.date.split('/', 3);
    const day = +splittedDate[0];
    const month = +splittedDate[1];
    const year = +splittedDate[2];
    const hour = +splittedHour[0];
    const minutes = +splittedHour[1];
    if (this.currentDate.getFullYear() < year) {
      return true;
    }
    if (this.currentDate.getMonth() + 1 < month) {
      return true;
    }
    if (this.currentDate.getDate() < day) {
      return true;
    }
    if (hour < this.currentDate.getHours()) {
      return false;
    }
    return !(hour === this.currentDate.getHours() && minutes <= this.currentDate.getMinutes());
  }

  fillHours() {
    let i: number;
    let j: number;
    for (i = 0; i < 24; i++) {
      for (j = 0; j <= 55; j += 5) {
        if (j === 0) {
          this.hours.push(i + ':' + '00');
        } else if (j === 5) {
          this.hours.push(i + ':' + '05');
        } else {
          this.hours.push(i + ':' + j);
        }
      }
    }
  }

  concatenate() {
    let dateTime: string = this.date.concat(' ').concat(this.time);
    let event: Event = new Event(this.sport,this.locatie, this.totalCost, dateTime, this.maximumNumberOfPersons, this.description, this.loggedUser);
    console.log(event);
    this.eventService.createEvent(event)
      .subscribe(data => {
        this.showSnackbar('Event created successfully.');
      }, Error => {
        this.showSnackbar('Event creation failed. Please try again.');
      });
  }

}
