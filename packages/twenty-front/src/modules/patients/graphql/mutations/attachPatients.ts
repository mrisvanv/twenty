import { gql } from '@apollo/client';

export const ATTACH_PATIENT = gql`
  mutation AttachPatient(
    $leadId: String!
    $patientId: Int!
    $categorySingularApiName: String!
  ) {
    attachPatient(
      leadId: $leadId
      patientId: $patientId
      categorySingularApiName: $categorySingularApiName
    ) {
      success
      message
    }
  }
`;
