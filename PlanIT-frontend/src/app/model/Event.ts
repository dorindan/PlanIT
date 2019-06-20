import {User} from "./User";

export class Event {
  public id: number;
  public sport: string;
  public location: string;
  public cost: number;
  public dateAndHour: string;
  public maximumPersons: number;
  public subscribedPersons: number;
  public description: string;
  public owner: User;
  public userList: User[]= [];


  constructor(sport: string, location: string, cost: number, dateAndHour: string, maximumPersons: number, description: string, owner: User) {
    this.sport = sport;
    this.location = location;
    this.cost = cost;
    this.dateAndHour = dateAndHour;
    this.maximumPersons = maximumPersons;
    this.description = description;
    this.owner = owner;
  }

}
