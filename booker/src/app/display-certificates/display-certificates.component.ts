import {Component, OnInit} from '@angular/core';
import {DisplayCertificateDTO} from "./model/DisplayCertificateDTO";
import {CertificateService} from "../requests-view/certificate.service";

@Component({
  selector: 'app-display-certificates',
  templateUrl: './display-certificates.component.html',
  styleUrls: ['./display-certificates.component.css']
})
export class DisplayCertificatesComponent implements OnInit{
  podaci: DisplayCertificateDTO[] = [];
  dataSource = this.podaci;

  constructor(private certificateService : CertificateService) {
  }

  ngOnInit(): void {
    this.dobaviPodatke();
  }

  dobaviPodatke(): void {
    this.certificateService.getAll().subscribe(
      podaci => {
        this.podaci = podaci;
        this.dataSource = this.podaci;
      }
    )
  }
}
