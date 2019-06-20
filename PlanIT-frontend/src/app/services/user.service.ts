import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {User} from "../model/User";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private apiService: ApiService
  ){}

  getAllUsers(): Observable <User[]>{
    return this.apiService.getRequest("api/user/all");
  }

  login(authData: User): Observable<any> {
    return this.apiService.postRequest('api/user/login', authData);
  }

  getUserByUsername(username: string): Observable<User>{
    return this.apiService.getRequest("api/user/" + username);
  }
}
