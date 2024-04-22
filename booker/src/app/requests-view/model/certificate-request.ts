
import {RequestStatus} from "../../enums/certificate-request-status.enum";
import {CertificateType} from "../../enums/certificate-type";

export interface CertificateRequest {
  id: number;
  subjectCN: string;
  subjectSurname: string;
  subjectGN: string;
  subjectOrganization: string;
  subjectOrganizationalUnit: string;
  subjectCountry: string;
  subjectEmail: string;
  subjectUID: string;
  date: Date;
  certificateType: CertificateType;
  requestStatus: RequestStatus;
  rejectionReason: string;
}
