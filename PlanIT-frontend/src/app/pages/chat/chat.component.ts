import {Component, OnInit} from '@angular/core';
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import * as $ from "jquery";
import {UserService} from "../../services/user.service";
import {User} from "../../model/User";
import {RoomService} from "../../services/room.service";
import {Room} from "../../model/Room";
import {Message} from "../../model/Message";
import {GoogleObj} from "../../model/GoogleObj";
import {GoogletranslateService} from "../../services/googletranslate";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

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
  private usersCopy: User[];
  private currentRoom: Room;
  private messages: Message[];
  private friendMessages: Message[];
  private loggedUserUsername:string;
  private clickedUser:User;
  private currentRoomName:String;
  private translateBtnMe: any;
  private translateBtnFriend: any;
  private translatedMessage: string;
  private currentMessageDocument: any;
  private currentMessage: string;
  private div: HTMLElement;
  private txtValue: any
  private target: string = 'ro';
  private languages: string[] = ['English', 'French', 'German', 'Italian', 'Japanese', 'Korean', 'Portugese', 'Romanian' , 'Spanish'];
  private currentLanguage: string;
  private myControl = new FormControl();
  private filteredLanguages: Observable<string[]>;



  ngOnInit() {
    this.loggedUserUsername = sessionStorage.getItem('token');
    this.userService.getAllUsers().subscribe(response => {
      this.users = response;
      this.usersCopy = response;
    });

    this.filteredLanguages = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterLanguages(value))
      );
  }

  private filterLanguages(value: string): string[] {
    console.log(value);
    const filterValue = value.toLowerCase();
    console.log(this.languages);
    return this.languages.filter(option => option.toLowerCase().includes(filterValue));
  }

  translateMyText(message) {
    const googleObj: GoogleObj = {
      q: message,
      target: this.target,
    };

    this.translateBtnMe = document.getElementById('translatebtneu');
    this.translateBtnMe.disabled = true;
    this.google.translate(googleObj).subscribe(
      (res: any) => {
        this.translateBtnMe.disabled = false;
        this.currentMessage = res.data.translations[0].translatedText;
      },
      err => {
        console.log(err);
      });

    setTimeout(() =>
      {
        this.reloadMessages(message, this.currentMessage);;
      },
      1000);
  }
  //['English', 'French', 'German','Italian', 'Korean', 'Portugese', 'Romanian' , 'Spanish'];
  chooseLanguage(language){
    if (language === 'English'){
      this.target = 'en';
    }
    if (language === 'French'){
      this.target = 'fr';
    }
    if (language === 'German'){
      this.target = 'de';
    }
    if (language === 'Italian'){
      this.target = 'it';
    }
    if (language === 'Japanese'){
      this.target = 'ja';
    }
    if (language === 'Korean'){
      this.target = 'ko';
    }
    if (language === 'Portugese'){
      this.target = 'pt';
    }
    if (language === 'Romanian'){
      this.target = 'ro';
    }
    if (language === 'Spanish'){
      this.target = 'es';
    }

  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  reloadMessages(oldMessage, newMessage){
    var message, i;
    for (i=0; i<this.messages.length; i++){
      if (this.messages[i].message === oldMessage){
        this.messages[i].message = newMessage;
      }
    }
  }


  translateFriendText(message) {
    const googleObj: GoogleObj = {
      q: message,
      target: this.target,
    };

    this.translateBtnMe = document.getElementById('translatebtnala');
    this.translateBtnMe.disabled = true;
    this.google.translate(googleObj).subscribe(
      (res: any) => {
        this.translateBtnMe.disabled = false;
        this.currentMessage = res.data.translations[0].translatedText;
      },
      err => {
        console.log(err);
      });

    setTimeout(() =>
      {
        this.reloadMessages(message, this.currentMessage);;
      },
      1000);
  }

  constructor(
    private userService: UserService,
    private roomService: RoomService,
    private google: GoogletranslateService
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
      that.stompClient.subscribe("/privateRoom/" + room, (mesaj) => {
        let mesaju = JSON.parse(mesaj.body);
        if(mesaju.message) {
          this.messages.push(new Message(mesaju.message, mesaju.username));
        }
      });
    });
  }

  sendMessage(message){
    var messageBody = document.querySelector('#messageBody');
    $(function () {
      $('#message').val("");
    });
    var names: string[] =[this.clickedUser.username, this.loggedUserUsername];
    names.sort();
    this.stompClient.send("/app/" + this.currentRoomName + "/" + this.loggedUserUsername, {}, message);
    $('#input').val('');
    $(".messages").animate({ scrollTop: $(document).height() }, "slow");
    setTimeout(function(){
      var messageBody = document.querySelector('#messageBody');
      messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    }, 200);
  }

  openChat(user){
    this.clickedUser = user;
    var names: string[] =[user.username, this.loggedUserUsername];
    names.sort();
    this.currentRoomName = names[0] + "_" + names[1];
    this.initializeWebSocketConnection(this.currentRoomName);
    this.roomService.getRoom(names[0] + "_" + names[1]).subscribe(response => {
      this.messages = response.messages;
    });
    setTimeout(function(){
      var messageBody = document.querySelector('#messageBody');
      messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    }, 200);

  }

  sortArray(personCommunicatingWith:string, loggedUser:string){
    var names: string[] =[personCommunicatingWith, loggedUser];
    names.sort();
    return names;
  }

  filterItem(name){
    if(!name){
      this.assignCopy();
    } // when nothing has typed

    this.users = Object.assign([], this.usersCopy).filter(
      item => item.username.toLowerCase().indexOf(name.toLowerCase()) > -1
    )
  }

  assignCopy(){
    this.users = Object.assign([], this.usersCopy);
  }

  myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    this.div = document.getElementById("myDropdown");
    a = this.div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      this.txtValue = a[i].textContent || a[i].innerText;
      if (this.txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }

}
