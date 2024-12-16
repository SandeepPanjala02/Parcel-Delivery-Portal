import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../common/user';

@Component({
  selector: 'app-user-create',
  standalone: false,

  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent {
  userFormGroup: FormGroup
  user: string | number | null;

 
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
    
  ) { }

  ngOnInit() {
      this.userFormGroup = this.formBuilder.group({
      user: this.formBuilder.group({
        userName: ['', [Validators.required, Validators.pattern('[a-z A-Z]+')]],
        email:['',[Validators.required, Validators.email]],
        phoneNumber:['',[Validators.required, Validators.pattern('^[0-9]{10}$')]],
        role:['',[Validators.required]],
      }),
    });

    
  }
  get userName() {
    return this.userFormGroup.get ('user.userName');
  }
  get email() {
    return this.userFormGroup.get ('user.email');
  }
  get phoneNumber() {
    return this.userFormGroup.get ('user.phoneNumber');
  }
  get role() {
    return this.userFormGroup.get ('user.role');
  }
  onSubmit() {
    if (this.userFormGroup.invalid) {
      this.userFormGroup.markAllAsTouched();
      alert("Inavlid Form");
      return;
    }
    
   //if form is valid
    let user = new User();
    user = this.userFormGroup.controls['user'].value;

    this.userService
    .createUser(user)
    .subscribe((data) => {
      alert('New user is added!');
      this.router.navigateByUrl('/user-list');
    });

  }
  
}
  


  

    

    
