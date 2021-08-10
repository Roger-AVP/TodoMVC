import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutofocusModule } from 'angular-autofocus-fix';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { TodoComponent } from './todo/todo.component';
import { TodoService } from './todo.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChechTokenGuardGuard } from './guards/chech-token-guard.guard';


const routes: Routes = [
    { path: '', component: LoginComponent, canActivate: [ChechTokenGuardGuard], },
    { path: 'todos', component: TodoComponent, pathMatch: 'full' },
    { path: ':filter', component: TodoComponent },

];

@NgModule({
    declarations: [
        AppComponent,
        TodoComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AutofocusModule,
        HttpClientModule,
        RouterModule.forRoot(routes)
    ],
    providers: [TodoService, LoginComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}