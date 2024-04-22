import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ReportUserService} from "../user/report-user.service";
import {SnackBarComponent} from "../shared/snack-bar/snack-bar.component";
import {CreateUserReportDTO} from "../user/dto/CreateUserReportDTO";
import {RejectRequestDTO} from "../requests-view/model/RejectRequestDTO";
import {RequestService} from "../requests/request.service";
import {CertificateRequestService} from "../requests-view/certificate-request.service";

@Component({
  selector: 'app-reject-request',
  templateUrl: './reject-request.component.html',
  styleUrls: ['./reject-request.component.css']
})
export class RejectRequestComponent {
  report_user_form = new FormGroup({
    reason: new FormControl('')
  })

  constructor(private requestService: CertificateRequestService,
              private snackBar: SnackBarComponent,
              private dialogRef: MatDialogRef<RejectRequestComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { id: number }) {
  }
  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.openSnackBar(message, action);
  }

  submitReport() {
    const userReport: RejectRequestDTO = {
      id: this.data.id,
      rejectionReason: this.report_user_form.value.reason!
    };

    this.requestService.rejectRequest(userReport).subscribe(
      (response) => {
        console.log("User report successfully added!", response);
        this.openSnackBar("Sucess!", "Close");
      },
      (error) => {
        console.log("Error in reporting user!", error);
        this.openSnackBar("Error", "Close");
      }
    );

    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }
}
