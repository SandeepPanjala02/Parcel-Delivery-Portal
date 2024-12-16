import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Parcel } from '../../common/parcel';
import { ParcelService } from '../../services/parcel.service';

import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-parcel-edit',
  standalone: false,

  templateUrl: './parcel-edit.component.html',
  styleUrl: './parcel-edit.component.css'
})
export class ParcelEditComponent {
  parcelFormGroup: FormGroup

  parcel: Parcel = new Parcel();
  parcelId: number;

  constructor(
    private formBuilder: FormBuilder,
    private parcelService: ParcelService,
    private router: Router,
    private activatedRoute: ActivatedRoute


  ) { }

  ngOnInit() {
    this.parcelFormGroup = this.formBuilder.group({
      parcel: this.formBuilder.group({
        senderName: ['', [Validators.required]],
        receiverName: ['', [Validators.required]],
        pickupAddress: ['', [Validators.required]],
        deliveryAddress: ['', [Validators.required]],
        status: ['', [Validators.required]],
      }),
    });

    this.parcelId = this.activatedRoute.snapshot.params['parcelId']

    this.parcelService
      .getParcel(this.parcelId)
      .subscribe((data) => {
        this.parcel = data;
        console.log(this.parcel);

      });
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

  onSubmit() {
    console.log(this.parcelFormGroup.value); 
    if (this.parcelFormGroup.invalid) {
      this.parcelFormGroup.markAllAsTouched();
      alert("Inavlid Form");
      return;

    }
    if (confirm('Are you sure to Update?')) {
      const updatedParcel = this.parcelFormGroup.value.parcel;
      this.parcelService.updateParcel(this.parcelId, updatedParcel).subscribe(
        (response) => {
          alert('Parcel details are updated!');
          this.router.navigateByUrl('/parcel-list');
        },
        (error) => {
          console.error('Error updating parcel:', error); // Debug API errors
          alert('Failed to update parcel.');
        }
      );
    }
    

    
    
  }

}
