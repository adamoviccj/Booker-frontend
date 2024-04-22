import {CertificateType} from "../../enums/certificate-type";
import {CertificateRequestDTO} from "./CertificateRequestDTO";

export interface CreateCertificateRequestDTO {
  subjectCN: string;
  subjectSurname: string;
  subjectGN: string;
  subjectOrganization: string;
  subjectOrganizationalUnit: string;
  subjectCountry: string;
  subjectEmail: string;
  subjectUID: string;
  date: Date;
  requestType: CertificateType;

}
