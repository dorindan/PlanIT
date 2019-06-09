import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {Room} from "../model/Room";
import {Event} from "../model/Event";

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
}
