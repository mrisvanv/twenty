import { gql } from '@apollo/client';

export const CREATE_PATIENT = gql`
  mutation CreatePatient(
    $leadId: String!
    $workspaceId: String!
    $categorySingularApiName: String!
  ) {
    createPatient(
      leadId: $leadId
      workspaceId: $workspaceId
      categorySingularApiName: $categorySingularApiName
    ) {
      success
      patientId
      message
    }
  }
`;
