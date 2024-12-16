import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../common/user';
import { UserService } from '../../services/user.service';
import { ParcelService } from '../../services/parcel.service';
import { Router } from '@angular/router';
import { Parcel } from '../../common/parcel';


@Component({
  selector: 'app-parcel-create',
  standalone: false,

  templateUrl: './parcel-create.component.html',
  styleUrl: './parcel-create.component.css'
})
export class ParcelCreateComponent {
  parcelFormGroup: FormGroup
  userList: User[] = []
statusOptions: any;

  constructor(
    private formBuilder: FormBuilder,
    private parcelService: ParcelService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.parcelFormGroup = this.formBuilder.group({
      parcel: this.formBuilder.group({
        senderName: ['', [Validators.required]],
        receiverName: ['', [Validators.required]],
        pickupAddress: ['', [Validators.required]],
        deliveryAddress: ['', [Validators.required]],
        status: ['', [Validators.required]],
        user: ['', [Validators.required]]

      }),
    });
    this.listUser(); // Fetch user List
  }

  get senderName() {
    return this.parcelFormGroup.get('parcel.senderName');
  }

  get receiverName() {
    return this.parcelFormGroup.get('parcel.receiverName');
  }
  get pickupAddress() {
    return this.parcelFormGroup.get('parcel.pickupAddress');
  }
  get deliveryAddress() {
    return this.parcelFormGroup.get('parcel.deliveryAddress');
  }
  get status() {
    return this.parcelFormGroup.get('parcel.status');
  }
  get user() {
    return this.parcelFormGroup.get('parcel.user');
  }

  listUser() {
    this.userService.getUserList().subscribe((data) => {
      this.userList = data;
      console.log(data);
    });
  }

  onSubmit() {
    if (this.parcelFormGroup.invalid) {
      this.parcelFormGroup.markAllAsTouched();
      console.log( this.parcelFormGroup.value);
      alert("Invalid Form")
      return;
    }


    //if form is valid
    let parcel = new Parcel();
    parcel = this.parcelFormGroup.controls['parcel'].value

    this.parcelService
       .createParcel(parcel.user.userId, parcel)
       .subscribe((data) => {
        alert('New Parcel is added!');
        this.router.navigateByUrl('/parcel-list');

      });


  }

}
