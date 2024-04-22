import {Component, Input, OnInit} from '@angular/core';
import {CertificateRequestDTO} from "./model/CertificateRequestDTO";
import {CertificateRequestService} from "./certificate-request.service";
import {OwnerCommentDTO} from "../user/dto/OwnerCommentDTO";
import {MatDialog} from "@angular/material/dialog";
import {RejectRequestComponent} from "../reject-request/reject-request.component";

@Component({
  selector: 'app-requests-view',
  templateUrl: './requests-view.component.html',
  styleUrls: ['./requests-view.component.css']
})
export class RequestsViewComponent implements OnInit{
  podaci: CertificateRequestDTO[] = [];
  displayedColumns: string[] = ['ID', 'SubjectUID', 'SubjectCN', 'Subject Organization', 'Subject Organizational Unit', 'Subject Country', 'Subject Email','Date', 'Request Type', 'RequestStatus', 'Rejection reason'];
  dataSource = this.podaci;

  constructor(private requestService : CertificateRequestService,
              private dialog : MatDialog) {
  }

  ngOnInit(): void {
    this.dobaviPodatke();
  }

  dobaviPodatke(): void {
    this.requestService.getAll()
      .subscribe(podaci => {
        this.podaci = podaci;
        this.dataSource = this.podaci;
      });
  }

  protected readonly Date = Date;

  accept(id:number){
    this.requestService.acceptRequest(id).subscribe({
      next:(data) =>{
        alert("Approved comment!");
        this.requestService.getAll().subscribe({
          next: (data : CertificateRequestDTO[]) => {
            this.podaci = data;
          },
          error: (_)=> {
            console.log("Accepted request!");
          }
        });
      },
      error(_){
        console.log("Error with request accepting!");
      }
    })
  }

  openRejectDialog(id: number): void {
    const dialogRef = this.dialog.open(RejectRequestComponent, {
      width: '400px',
      data: {id} // Dodajte podatke ako je potrebno
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog zatvoren', result);
      // Ovde možete dodati logiku za obradu rezultata ako je potrebno
    });
  }
}



