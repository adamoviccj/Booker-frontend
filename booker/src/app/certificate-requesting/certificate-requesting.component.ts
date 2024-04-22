import {Component, OnInit} from '@angular/core';
import {CertificateType} from "../enums/certificate-type";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CertificateRequestService} from "../requests-view/certificate-request.service";
import {CreateCertificateRequestDTO} from "../requests-view/model/CreateCertificateRequestDTO";
import {SnackBarComponent} from "../shared/snack-bar/snack-bar.component";
import {UserService} from "../user/user.service";
import {User} from "../user/model/user.model";

interface DisplayMessage {
  msgType: string;
  msgBody: string;
}

@Component({
  selector: 'app-certificate-requesting',
  templateUrl: './certificate-requesting.component.html',
  styleUrls: ['./certificate-requesting.component.css']
})
export class CertificateRequestingComponent implements OnInit{
  submitted: boolean = false;
  notification!: DisplayMessage;
  loginUserId: number = Number(localStorage.getItem("loggedId"));
  loggedInUser: User | undefined;
  loginRole: string = localStorage.getItem("loggedRole")!;
  returnUrl!: string;
  certificateTypesForDisplay = this.displayRequestTypes();
  formGroupPersonalData = new FormGroup({
    subjectCN: new FormControl('', [Validators.required]),
    subjectSurname: new FormControl('', [Validators.required]),
    subjectGN: new FormControl('', [Validators.required]),
    subjectCountry: new FormControl('', [Validators.required]),
    subjectEmail: new FormControl('', [Validators.required, Validators.email]),
  });

  formGroupOrganizationData = new FormGroup({
    subjectOrganization: new FormControl('', [Validators.required]),
    subjectOrganizationalUnit: new FormControl('', [Validators.required])
  });

  formGroupRequestType = new FormGroup(
    {
      requestType: new FormControl(CertificateType.END, [Validators.required])
    }
  );

  constructor(private requestService: CertificateRequestService,
              private snackBar: SnackBarComponent,
              private userService: UserService) {
  }
  ngOnInit(): void {
  }

  displayRequestTypes(): CertificateType[] {

    if (this.loginRole == "owners") {
      this.certificateTypesForDisplay = [CertificateType.END]
    } else if(this.loginRole == "admins") {
      this.certificateTypesForDisplay = [CertificateType.INTERMEDIATE, CertificateType.END]
    } else if (this.loginRole == "supers") {
      this.certificateTypesForDisplay = [CertificateType.ROOT, CertificateType.INTERMEDIATE, CertificateType.END]
    }

    console.log(this.certificateTypesForDisplay);
    return this.certificateTypesForDisplay;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.openSnackBar(message, action);
  }

  subjectEmail = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    if (this.subjectEmail.hasError('required')) {
      return 'You must enter a value';
    }

    return this.subjectEmail.hasError('email') ? 'Not a valid email' : '';
  }

  submitForm() {
    const request: CreateCertificateRequestDTO = {
      subjectCN: this.formGroupPersonalData.value.subjectCN!,
      subjectSurname: this.formGroupPersonalData.value.subjectSurname!,
      subjectGN: this.formGroupPersonalData.value.subjectGN!,
      subjectOrganization: this.formGroupOrganizationData.value.subjectOrganization!,
      subjectOrganizationalUnit: this.formGroupOrganizationData.value.subjectOrganizationalUnit!,
      subjectCountry: this.formGroupPersonalData.value.subjectCountry!,
      subjectEmail: this.formGroupPersonalData.value.subjectEmail!,
      subjectUID: "",
      date: new Date(),
      requestType: this.formGroupRequestType.value.requestType!
    };

    this.requestService.add(request).subscribe(
      (response) => {
        console.log("Certificate request successfully created!", response);
        this.openSnackBar("Success!", "Close");
      },
      (error) => {
        console.log("Error in certificate request creation!", error);
        this.openSnackBar("Error!", "Close");
      }
    )
  }

}
