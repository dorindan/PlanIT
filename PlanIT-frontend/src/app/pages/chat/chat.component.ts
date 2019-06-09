import {Component, OnInit} from '@angular/core';
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import * as $ from "jquery";
import {UserService} from "../../services/user.service";
import {User} from "../../model/User";
import {RoomService} from "../../services/room.service";
import {Room} from "../../model/Room";
import {Message} from "../../model/Message";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {


  private serverUrl = 'http://localhost:8080/api/socket'
  private title = 'WebSockets chat';
  private stompClient = null;
  private users: User[];
  private currentRoom: Room;
  private messages: Message[];
  private friendMessages: Message[];
  private loggedUserUsername:string;
  private clickedUser:User;
  private currentRoomName:String;

  ngOnInit() {
    this.loggedUserUsername = sessionStorage.getItem('token');
    this.userService.getAllUsers().subscribe(response => {
       console.log(response);
      this.users = response;
    });

  }

  constructor(
    private userService: UserService,
    private roomService: RoomService
  ){

    // this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection(room){
    if (this.stompClient != null)
      for (const sub in this.stompClient.subscriptions) {
        if (this.stompClient.subscriptions.hasOwnProperty(sub)) {
          this.stompClient.unsubscribe(sub);
        }
      }
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    let mess : string;

    this.stompClient.connect({}, (frame) =>{
      let rooom = that.currentRoomName;
      that.stompClient.subscribe("/privateRoom/" + room, (message) => {
        // console.log("bai deci eu am primit asa: " + message.body)
        console.log(this.currentRoomName + "  yuhuuuuu");
        if(message.body) {
          // $(".msg_history").append("<div class='outgoing_msg'>  <div class='sent_msg'> <p>" + message.body + "</p> <span class='time_date'> 11:01 AM    |    June 9</span></div> </div>");
          // $(".chat").append("<div class='message'>"+message.body+"</div>")
          this.messages.push(new Message(message.body, this.loggedUserUsername));
          // console.log(message.body);
        }
      });
    });
  }

  sendMessage(message){
    $(function () {
      $('#message').val("");
    });
    var names: string[] =[this.clickedUser.username, this.loggedUserUsername];
    names.sort();
    console.log(this.currentRoomName);
    this.stompClient.send("/app/" + this.currentRoomName + "/" + this.loggedUserUsername, {}, message);
    $('#input').val('');
  }

  openChat(user){
    this.clickedUser = user;
    var names: string[] =[user.username, this.loggedUserUsername];
    names.sort();
    this.currentRoomName = names[0] + "_" + names[1];
    this.initializeWebSocketConnection(this.currentRoomName);
    this.roomService.getRoom(names[0] + "_" + names[1]).subscribe(response => {
      // this.currentRoom = response;
      this.messages = response.messages;
    });
  }

  sortArray(personCommunicatingWith:string, loggedUser:string){
    var names: string[] =[personCommunicatingWith, loggedUser];
    names.sort();
    return names;
  }


}
