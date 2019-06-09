export class Message{

  private _message: string;
  private _username: string;


  constructor(message: string, username: string) {
    this._message = message;
    this._username = username;
  }


  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }
}
