/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { interval, Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Logger } from './core/logger.service';
import { HtmlService } from './data/service/html.service';
import { IUser, User } from './data/types/user';
import { LogoutPromptComponent } from './shared/components/logout-prompt/logout-prompt.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  sub: Subscription | undefined;
  htmlData!: string;
  user!: User;

  customerNumber = 'HM2600';
  username = 'bkowal';
  name = 'Bryan Kowal';
  email = 'bkowal@hmidoors.com';
  password = 'password';
  remember = true;

  // private readonly apiUrl = '//laravel.local:8000';
  private readonly apiUrl = '//dev-oo.hmidomain.net';

  constructor(
    private html: HtmlService,
    private http: HttpClient,
    private modal: NgbModal
  ) {}

  ngOnInit() {
    const logger = new Logger('App Component');

    this.sub = interval(1000).subscribe((value) => {
      console.log(
        `value %c${value}`,
        'background: #222; color: #fff; padding: 5px;'
      );
    });

    // let baseHref = window.location.pathname;
    const baseHref = '/app/quote/test';
    console.log(baseHref);

    this.html.get('test.html').subscribe((res) => {
      this.htmlData = res;
      logger.info([baseHref, this.htmlData]);
    });

    // withCredentials must be set to true for the browser to accept cookies in the response
    this.http
      .get(`${this.apiUrl}/sanctum/csrf-cookie`, { withCredentials: true })
      .subscribe(() => console.log('CSRF token received'));
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  testModal() {
    // const modalContent: ModalContent = {
    //   title: 'Proceed?',
    //   body: 'Perform this action?',
    //   confirmBtnText: 'OK',
    //   dismissBtnText: 'Cancel',
    // };
    // const modalRef = this.modal.open(ConfirmModalComponent);
    // modalRef.componentInstance.modalContent = modalContent;
    // modalRef.closed.subscribe((result) => console.log(result));
    this.modal
      .open(LogoutPromptComponent)
      .closed.subscribe((result) => console.log(result));
  }

  register() {
    console.log('Register');
    const payload = {
      customer_number: this.customerNumber,
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
      password_confirmation: this.password,
    };
    this.http
      .post(`${this.apiUrl}/register`, payload, { withCredentials: true })
      .subscribe(console.log);
  }

  forgotPassword() {
    console.log('Forgot password');
    const payload = {
      email: this.email,
    };
    this.http
      .post(`${this.apiUrl}/forgot-password`, payload, {
        withCredentials: true,
      })
      .subscribe(console.log);
  }

  login() {
    console.log('Login');
    const payload = {
      customer_number: this.customerNumber,
      username: this.username,
      password: this.password,
      remember: this.remember,
    };
    this.http
      .post(`${this.apiUrl}/login`, payload, { withCredentials: true })
      .pipe(catchError(this.handleError))
      .subscribe(console.log);
  }

  checkLogin() {
    console.log('Check Login');
    // withCredentials must be set to true for Angular to include cookies in the request
    this.http
      .get<IUser>(`${this.apiUrl}/api/user`, { withCredentials: true })
      .subscribe((user) => {
        console.log(user);
        this.user = new User(user);
        console.log(this.user);
        console.log(this.user.test());
      });
  }

  checkPermissions() {
    console.log('Check Permissions');
    this.http
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .get<any>(`${this.apiUrl}/api/user/permissions`, {
        withCredentials: true,
      })
      .subscribe((data) => {
        this.user.permissions = data.permissions;
        console.log(this.user.permissions);
        console.log(this.user.can('publish articles'));
      });
  }

  logout() {
    console.log('Logout');
    this.http
      .post(`${this.apiUrl}/logout`, {}, { withCredentials: true })
      .subscribe(console.log);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
