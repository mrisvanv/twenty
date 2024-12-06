import { gql } from '@apollo/client';

export const SEARCH_PATIENTS = gql`
  mutation SearchPatients($searchQuery: String!, $workspaceId: String!) {
    searchPatients(searchQuery: $searchQuery, workspaceId: $workspaceId) {
      result {
        patientId
        firstName
        lastName
      }
      message
    }
  }
`;
