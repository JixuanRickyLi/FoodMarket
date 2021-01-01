import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {UserModel} from '../models/user.model';
import {environment} from '../../environments/environment';
import {ReturnModel} from '../models/return.model';
import {Subject} from 'rxjs';
import {PasswordModel} from '../models/password.model';


@Injectable()
export class AuthService {
  tempuser = new UserModel(1,
  'youareremoved', 'ohoh123', 'Three Zhang',
  'abc@gmail.com', '1234567', '124124 sdfka, QC');
  userChanged = new Subject<UserModel>();
  user: UserModel;

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    let myParams = new HttpParams();
    myParams = myParams.append('username', String(username));
    myParams = myParams.append('password', String(password));
    return this.http
      .post<ReturnModel>(
        environment.baseUrl + environment.user + environment.login,
        {},
        {
          headers: new HttpHeaders({ withCredentials: 'true'}),
          params: myParams
        }
      );
  }

  changePassword(passwordModel: PasswordModel) {
    return this.http
      .put<ReturnModel>(
        environment.baseUrl + environment.user + environment.pwdchange,
        passwordModel,
        {
          headers: new HttpHeaders({ withCredentials: 'true'}),
        }
      );
  }

  signup(userModel: UserModel) {
    return this.http
      .post<ReturnModel>(
        environment.baseUrl + environment.user + environment.new,
        userModel,
        {
          headers: new HttpHeaders({ withCredentials: 'true'}),
        }
      );
  }

  changeInfo(userModel: UserModel) {
    return this.http
      .put<ReturnModel>(
        environment.baseUrl + environment.user + environment.infochange,
        userModel,
        {
          headers: new HttpHeaders({ withCredentials: 'true'}),
        }
      );
  }
}
