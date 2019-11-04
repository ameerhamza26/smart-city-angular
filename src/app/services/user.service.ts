import { Injectable } from '@angular/core';
import { JwtService} from './jwt.service'
import { ApiService } from './api.service'
import { HttpClient } from '@angular/common/http';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';
import { map ,  distinctUntilChanged } from 'rxjs/operators';
import { User } from '../models/user.model'

@Injectable()
export class UserService {

  private userObject = new BehaviorSubject({});
  currentUser = this.userObject.asObservable();

  constructor(private jwtService: JwtService,
    private apiService: ApiService) {}

  setAuth(data) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(data.data.token);
    //window.localStorage['user'] = JSON.stringify(data.data.user);
    this.changeUser(data.data.user)
  }

  changeUser(user) {
    window.localStorage['user'] = JSON.stringify(user);
    this.userObject.next(JSON.stringify(user))
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    window.localStorage.removeItem('user');
  }

  getCurrentUser() {
    return window.localStorage['user'];
  }

  login(credentials): Observable<User> {
    const route = '/login';
    return this.apiService.post(route, {user: credentials})
      .pipe(map(
      data => {
        this.setAuth(data);
        return data;
      }
    ));
  }

  register(credentials): Observable<User> {
    const body = {
        user : credentials
    }
    console.log(body)
    const route = '/register';
    return this.apiService.post(route, body)
      .pipe(map(
      data => {
        return data;
      }
    ));
  }

  createUser(formdata): Observable<User> {
    const route = '/create-user';
    return this.apiService.post(route, formdata)
      .pipe(map(
      data => {
        return data;
      }
    ));
  }

  updateUser(formdata): Observable<User> {
    const route = '/update-user';
    return this.apiService.post(route, formdata)
      .pipe(map(
      data => {
        return data;
      }
    ));
  }

  createPost(formdata): Observable<User> {
    const route = '/post/create';
    return this.apiService.post(route, formdata)
      .pipe(map(
      data => {
        return data;
      }
    ));
  }

  createBrand(formdata): Observable<User> {
    const route = '/brand/create';
    return this.apiService.post(route, formdata)
      .pipe(map(
      data => {
        return data;
      }
    ));
  }

  createBrandOffer(offer): Observable<User> {
    const route = '/brand/offer/create';
    return this.apiService.post(route, {offer: offer})
      .pipe(map(
      data => {
        return data;
      }
    ));
  }

  getPosts(): Observable<User> {
    const route = '/post/getAll';
    return this.apiService.get(route)
      .pipe(map(
      data => {
        return data;
      }
    ));
  }

  getDeals(): Observable<User> {
    const route = '/brand/offers/all';
    return this.apiService.get(route)
      .pipe(map(
      data => {
        return data;
      }
    ));
  }

  getUsers(): Observable<User> {
    const route = '/users';
    return this.apiService.get(route)
      .pipe(map(
      data => {
        return data;
      }
    ));
  }

  getUserById(userid): Observable<User> {
    const route = '/users/'+userid;
    return this.apiService.get(route)
      .pipe(map(
      data => {
        return data;
      }
    ));
  }

  getBrandByUserId(userid): Observable<User> {
    const route = '/user/brand/'+userid;
    return this.apiService.get(route)
      .pipe(map(
      data => {
        return data;
      }
    ));
  }

  getPostForApprovals(userid): Observable<User> {
    const route = '/post/approvals/'+userid;
    return this.apiService.get(route)
      .pipe(map(
      data => {
        return data;
      }
    ));
  }

  getPostTypes():  Observable<User> {
    const route = '/post/types';
    return this.apiService.get(route)
      .pipe(map(
      data => {
        return data;
      }
    ));
  }

  verifyEmail(token) : Observable<any> {
    const route = '/verify-email';
    return this.apiService.post(route, {token: token})
      .pipe(map(
      data => {
        return data;
      }
    ));
  }

  setPassword(email, password) : Observable<any> {
    const route = '/set-password';
    return this.apiService.post(route, {email: email,password: password })
      .pipe(map(
      data => {
        return data;
      }
    ));
  }

  approvePost(post_id, account_id) : Observable<any> {
    const route = '/post/approve'
    return this.apiService.post(route, {post_id: post_id, account_id: account_id})
      .pipe(map(
      data => {
        return data;
      }
    ));
  }

  availOffer(offerid, userid) : Observable<any> {
    const route = '/offer/avail'
    return this.apiService.post(route, {offerid: offerid, userid: userid})
      .pipe(map(
      data => {
        return data;
      }
    ));
  }

}