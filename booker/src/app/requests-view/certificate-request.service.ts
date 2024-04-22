import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CertificateRequestDTO} from "./model/CertificateRequestDTO";
import {environment} from "../../env/env";
import {RejectRequestDTO} from "./model/RejectRequestDTO";

@Injectable({
  providedIn: 'root'
})
export class CertificateRequestService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<CertificateRequestDTO[]> {
    return this.http.get<CertificateRequestDTO[]>(environment.apiHostSecurity + "api/certificate_requests/all");
  }

  acceptRequest(id: number) {
    return this.http.put(environment.apiHostSecurity + `api/certificate_requests/accept/${id}`, id);
  }

  rejectRequest(rejectionReason: any) {
    return this.http.put(environment.apiHostSecurity + `api/certificate_requests/reject`, rejectionReason);
  }

  add(createRequest: any): Observable<CertificateRequestDTO> {
    return this.http.post<CertificateRequestDTO>(environment.apiHostSecurity + "api/certificate_requests/create", createRequest);
  }
}
