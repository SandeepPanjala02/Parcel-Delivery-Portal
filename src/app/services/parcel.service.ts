import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { map } from 'rxjs';

import { Parcel } from '../common/parcel';

@Injectable({
  providedIn: 'root'
})
export class ParcelService {

  constructor(private http: HttpClient) { }

  getParcelsList() {
    const url = 'http://localhost:8181/api/parcels';

     return this.http
     .get<GetResponseParcels>(url)
     .pipe(map((response) => response._embedded.parcels));
  }
   
  //add parcel details
  createParcel(id: number,parcel: Parcel) {
    const url = 'http://localhost:8181/api/v1/user/'+ id + '/parcels';
    return this.http.post<Parcel>(url, parcel);
  }

  deleteParcel(id:number) {
    const url = 'http://localhost:8181/api/parcels/'+id;
    return this.http.delete<Parcel>(url);
  
  }

  getParcel(id: number) {
    const url = 'http://localhost:8181/api/parcels/'+id;
    return this.http.get<Parcel>(url);

  }

  updateParcel(id: number,parcel: Parcel) {
    const url = 'http://localhost:8181/api/parcels/'+id;
    return this.http.put<Parcel>(url,parcel);
  }
  



}

interface GetResponseParcels {
    _embedded: {
    parcels: Parcel[];
  };
}
