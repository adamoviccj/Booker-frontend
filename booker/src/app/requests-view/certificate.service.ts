import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DisplayCertificateDTO} from "../display-certificates/model/DisplayCertificateDTO";
import {environment} from "../../env/env";

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<DisplayCertificateDTO[]> {
    return this.http.get<DisplayCertificateDTO[]>(environment.apiHostSecurity + "api/certificates/all");
  }
}
