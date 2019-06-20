import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {Room} from "../model/Room";
import {Event} from "../model/Event";
import {User} from "../model/User";

@Injectable({
  providedIn: 'root'
})

export class EventService{

  constructor(
    private apiService: ApiService
  ){}

  getEvents(): Observable<Event[]>{
    return this.apiService.getRequest("api/event/all");
  }

  getSubscribedEvents(username): Observable<Event[]>{
    return this.apiService.getRequest("api/user/" + username + "/events");
  }

  subscribe(username: string, eventId : number): Observable<any> {
    return this.apiService.postRequest('api/event/subscribe/' + username + '/' + eventId, null);
  }

  unsubscribe(username: string, eventId : number): Observable<any> {
    return this.apiService.postRequest('api/event/unsubscribe/' + username + '/' + eventId, null);
  }

  createEvent(event: Event): Observable<any> {
    return this.apiService.postRequest('api/event/createEvent', event);
  }

  deleteById(eventId : number): Observable<any> {
    return this.apiService.postRequest('api/event/deleteById/' + eventId, null);
  }
}
