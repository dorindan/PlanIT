import {User} from "./User";

export class Event {
  private _sport: string;
  private _location: string;
  private _cost: number;
  private _dateAndHour: string;
  private _maximumPersons: number;
  private _subscribedPersons: number;
  private _description: string;
  private _owner: User;
  private _userList: User[]= [];


  constructor(sport: string, location: string, cost: number, dateAndHour: string, maximumPersons: number, description: string, owner: User) {
    this._sport = sport;
    this._location = location;
    this._cost = cost;
    this._dateAndHour = dateAndHour;
    this._maximumPersons = maximumPersons;
    this._description = description;
    this._owner = owner;
  }


  get sport(): string {
    return this._sport;
  }

  set sport(value: string) {
    this._sport = value;
  }

  get location(): string {
    return this._location;
  }

  set location(value: string) {
    this._location = value;
  }

  get cost(): number {
    return this._cost;
  }

  set cost(value: number) {
    this._cost = value;
  }

  get dateAndHour(): string {
    return this._dateAndHour;
  }

  set dateAndHour(value: string) {
    this._dateAndHour = value;
  }

  get maximumPersons(): number {
    return this._maximumPersons;
  }

  set maximumPersons(value: number) {
    this._maximumPersons = value;
  }

  get subscribedPersons(): number {
    return this._subscribedPersons;
  }

  set subscribedPersons(value: number) {
    this._subscribedPersons = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get owner(): User {
    return this._owner;
  }

  set owner(value: User) {
    this._owner = value;
  }

  get userList(): User[] {
    return this._userList;
  }

  set userList(value: User[]) {
    this._userList = value;
  }
}
