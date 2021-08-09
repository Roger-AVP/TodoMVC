import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private loginService: LoginService, private router: Router) {}
    email: string = "";
    password: string = "";
    error = "";

    ngOnInit() {}

    onSubmit() {
        if (this.email != "" && this.password != "") {
            this.loginService.login(this.email, this.password)
                .subscribe((user) => {
                    this.saveToken(user['token']);
                    this.router.navigate(['todos']);
                }, (error) => {
                    console.log("error: ", error);
                    this.error = error.error.messages;
                });
        }
    }

    public saveToken(token: string): void {
        localStorage.removeItem("token");
        localStorage.setItem("token", token);
    }

}