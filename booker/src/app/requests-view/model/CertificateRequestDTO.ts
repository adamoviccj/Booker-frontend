import {CertificateType} from "../../enums/certificate-type";
import {RequestStatus} from "../../enums/certificate-request-status.enum";


export interface CertificateRequestDTO {
  id: number;
  subjectUID: string;
  subjectCN: string;
  subjectOrganization: string;
  subjectOrganizationalUnit: string;
  subjectCountry: string;
  subjectEmail: string;
  date: Date;
  certificateType: CertificateType;
  requestStatus: RequestStatus;
  rejectionReason: string;
}
