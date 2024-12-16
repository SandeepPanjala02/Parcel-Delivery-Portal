import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../common/user';

@Component({
  selector: 'app-user-edit',
  standalone: false,


  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent {
  userFormGroup: FormGroup
  user: User = new User();
  userId: number;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit() {
    this.userFormGroup = this.formBuilder.group({
      user: this.formBuilder.group({
        userName: ['', [Validators.required, Validators.pattern('[a-z A-Z]+')]],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        role: ['', [Validators.required]],
      }),
    });

    this.userId = this.activatedRoute.snapshot.params['userId'];

    this.userService
      .getUser(this.userId)
      .subscribe((data) => {
        this.user = data;
        console.log(this.user)

      });


  }

  get userName() {
    return this.userFormGroup.get('user.userName');
  }
  get email() {
    return this.userFormGroup.get('user.email');
  }
  get phoneNumber() {
    return this.userFormGroup.get('user.phoneNumber');
  }
  get role() {
    return this.userFormGroup.get('user.role');
  }
  onSubmit() {
    if (this.userFormGroup.invalid) {
      this.userFormGroup.markAllAsTouched();
      alert("Inavlid Form");
      return;
    }


     if (confirm('Are you sure to update')) {
       this.userService
        .updateUser(this.userId, this.user)
        .subscribe((data) => {
          alert(' user details are updated!');
          this.router.navigateByUrl('/user-list');
        });
    }

  }

}
