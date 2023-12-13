import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccommodationListingDto} from "./accommodation/model/accommodation-listing.model";
import {environment} from "../../env/env";
import {AccommodationViewDto} from "./accommodation/model/accommodation-view";
import {CreateAccommodation} from "./create-accommodation/model/create-accommodation.model";
import {ReservationRequest} from "./accommodation/model/ReservationRequest";
import {UserService} from "../user/user.service";
import {Owner} from "../user/owner-view/model/owner.model";
import {Filter} from "./accommodation/model/Filter";
import {Amenity} from "./accommodation/model/Amenity";
import {PriceType} from "../enums/price-type.enum";

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  private accListings: AccommodationListingDto[] = [];

  constructor(private http: HttpClient, private userService: UserService) { }

  searchAccommodations(startDate: string, endDate: string, location: string, people: number): Observable<AccommodationListingDto[]> {
    return this.http.get<AccommodationListingDto[]>(environment.apiHost + 'api/accommodations/' + 'search/' + startDate + '/' + endDate + '/' + location + '/' + people);
  }

  searchAndFilterAccommodations(startDate: string, endDate: string, location: string, people: number, filters: Filter[]): Observable<AccommodationListingDto[]> {
    const requestBody = JSON.stringify(filters);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<AccommodationListingDto[]>(environment.apiHost + 'api/accommodations/' + 'search/' + startDate + '/' + endDate + '/' + location + '/' + people + '/filter',
      requestBody,
      {headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200'}});
  }

  getAccommodation(id: number): Observable<AccommodationViewDto> {
    return this.http.get<AccommodationViewDto>(environment.apiHost + 'api/accommodations/' + id)
  }


  add(createAccommodation: CreateAccommodation): Observable<CreateAccommodation> {
    return this.http.post<CreateAccommodation>(environment.apiHost + 'api/accommodations/add', createAccommodation)
  }
  makeReservationRequest(request: ReservationRequest): Observable<ReservationRequest> {
    return this.http.post<ReservationRequest>(environment.apiHost + 'api/requests', request)
  }

  getOwner(id: number): Observable<Owner> {
    return this.userService.getOwnerById(id);
  }

  getAmenityNames() {
    return this.http.get<string[]>(environment.apiHost + 'api/amenities/names');
  }

  getPriceType(id: number | undefined) {
    return this.http.get<PriceType>(environment.apiHost + 'api/accommodations/priceType/' + id);
  }

  getPrice(id: number | undefined, startDate: string | undefined, endDate: string | undefined, people: number) {
    return this.http.get<number>(environment.apiHost + 'api/prices/' + id + '/' + startDate + '/'
    + endDate + '/' + people);
  }
}
