import { Component } from '@angular/core';
import { User } from '../../common/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-list',
  standalone: false,

  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  user: User[] = [];



  constructor(private userservice: UserService,
    private router: Router) { }

  listUser() {
    this.userservice.getUserList().subscribe((data) => {
      this.user = data;
      console.log(data);

    });
  }
  ngOnInit() {
    this.listUser();
  }

  removeUser(id: number) {
    if(confirm('Are you sure to delete')) {
      this.userservice
      .deleteUser(id)
      .subscribe((data)=> {
        alert('User is removed!');
        this.listUser();

      });
    }

  }

  showUserEdit(id:number) {
    this.router.navigate(['user-edit',id]);
  }


}
