import { gql } from '@apollo/client';

export const SYNC_LOCATION = gql`
  mutation SyncLocation($workspaceId: String!) {
    syncLocation(workspaceId: $workspaceId) {
      success
    }
  }
`;
