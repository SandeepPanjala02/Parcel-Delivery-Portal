import { Component } from '@angular/core';
import { Parcel } from '../../common/parcel';
import { ParcelService } from '../../services/parcel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parcel-list',
  standalone: false,

  templateUrl: './parcel-list.component.html',
  styleUrl: './parcel-list.component.css'
})
export class ParcelListComponent {
  parcels: Parcel[] = [] ;
  parcelsList: any;


  constructor(private parcelService: ParcelService,
    private router: Router
  ) { }

  listParcels() {
    this.parcelService.getParcelsList().subscribe((data) => {
      this.parcels = data;
      console.log(data);

    })
  }

  ngOnInit() {
    this.listParcels();
  }

  removeParcel(id : number) {
    if( confirm('Are you sure to delete')) {
      this.parcelService
       .deleteParcel(id)
       .subscribe((data)=>{
        alert('Parcel is removed!');
        this.listParcels();
       });
      
    }
  }

  showParcelEdit(id: number) {
    this.router.navigate(['parcel-edit',id]);
  }

}
