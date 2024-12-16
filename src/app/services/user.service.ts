import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../common/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserList() {
    const url = 'http://localhost:8181/api/user';

    return this.http
      .get<GetUserList>(url)
      .pipe(map((response) => response._embedded.User));
  }
   
  createUser(user: User) {
    const url = 'http://localhost:8181/api/user';
    return this.http.post<User>(url, user);
  }

  deleteUser(id: number) {
    const url = 'http://localhost:8181/api/user/'+id;
    return this.http.delete<User>(url);
  }

  getUser(id: number) {
    const url = 'http://localhost:8181/api/user/'+id;
    return this.http.get<User>(url);
  }

  updateUser(id: number,user: User) {
    const url = 'http://localhost:8181/api/user/'+id;
    return this.http.put<User>(url, user);
  }


}


interface GetUserList {
  _embedded: {
    "User": User[];
  };
}
