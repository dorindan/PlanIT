import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {User} from "../../model/User";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};
  hide = true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private userService: UserService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    sessionStorage.setItem('token', '');
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['snackbar']
    });
  }

  login() {
    const user = new User(this.model.username, this.model.password);
    // console.log(user);
      this.userService.login(user).subscribe(rez => {
        sessionStorage.setItem(
          'token',
          rez.username
        );
        this.router.navigate(['chat']);
      }, error1 => {
        this.showSnackbar('Username or password is incorrect. Please try again.');
      });
  }

}
