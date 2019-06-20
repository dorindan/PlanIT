export class User {
  public username: string;
  public password: string;
  public events: Event[];

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
