import {User} from "./User";
import {Message} from "./Message";

export class Room{
  private _roomName: string;
  private _users: User[];
  private _messages: Message[];


  constructor(roomName: string, users: User[], messages: Message[]) {
    this._roomName = roomName;
    this._users = users;
    this._messages = messages;
  }


  get roomName(): string {
    return this._roomName;
  }

  set roomName(value: string) {
    this._roomName = value;
  }

  get users(): User[] {
    return this._users;
  }

  set users(value: User[]) {
    this._users = value;
  }

  get messages(): Message[] {
    return this._messages;
  }

  set messages(value: Message[]) {
    this._messages = value;
  }
}
