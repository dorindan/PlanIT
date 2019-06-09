import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {User} from "../model/User";
import {Observable} from "rxjs";
import {Room} from "../model/Room";

@Injectable({
  providedIn: 'root'
})
export class RoomService{

  constructor(
    private apiService: ApiService
  ){}

  getRoom(name:string): Observable<Room>{
    return this.apiService.getRequest("api/room/" + name);
  }
}
