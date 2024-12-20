import { useApolloClient } from '@apollo/client';
import { useCallback } from 'react';

import { triggerCreateRecordsOptimisticEffect } from '@/apollo/optimistic-effect/utils/triggerCreateRecordsOptimisticEffect';
import { useObjectMetadataItem } from '@/object-metadata/hooks/useObjectMetadataItem';
import { useObjectMetadataItems } from '@/object-metadata/hooks/useObjectMetadataItems';
import { useGetRecordFromCache } from '@/object-record/cache/hooks/useGetRecordFromCache';
import { ObjectRecord } from '@/object-record/types/ObjectRecord';
import { sanitizeRecordInput } from '@/object-record/utils/sanitizeRecordInput';
import { v4 } from 'uuid';
import { isUndefinedOrNull } from '~/utils/isUndefinedOrNull';

import { useCreateOneRecord } from './useCreateOneRecord';
import { useDestroyOneRecord } from './useDestroyOneRecord';

type useMoveOneRecordProps = {
  fromObjectNameSingular: string;
  toObjectNameSingular: string;
};

export const useMoveOneRecord = ({
  fromObjectNameSingular,
  toObjectNameSingular,
}: useMoveOneRecordProps) => {
  const apolloClient = useApolloClient();

  const { objectMetadataItem: fromObjectMetadataItem } = useObjectMetadataItem({
    objectNameSingular: fromObjectNameSingular,
  });

  const { objectMetadataItem: toObjectMetadataItem } = useObjectMetadataItem({
    objectNameSingular: toObjectNameSingular,
  });

  const getRecordFromCache = useGetRecordFromCache({
    objectNameSingular: fromObjectNameSingular,
  });

  const { createOneRecord } = useCreateOneRecord({
    objectNameSingular: toObjectNameSingular,
  });

  const { destroyOneRecord } = useDestroyOneRecord({
    objectNameSingular: fromObjectNameSingular,
  });

  const { objectMetadataItems } = useObjectMetadataItems();

  const moveOneRecord = useCallback(
    async (idToMove: string, additionalDataToMove?: Partial<ObjectRecord>) => {
      // Get the original record from cache
      const originalRecord: ObjectRecord | null = getRecordFromCache(
        idToMove,
        apolloClient.cache,
      );

      if (!originalRecord) {
        throw new Error(`Record with id ${idToMove} not found`);
      }

      const removeTypename = <T>(obj: T): T => {
        if (typeof obj !== 'object' || obj === null) {
          return obj;
        }

        if (Array.isArray(obj)) {
          return obj.map(removeTypename) as T;
        }

        const newObj: Record<string, unknown> = {};
        for (const key in obj) {
          if (key !== '__typename' && key !== 'createdBy') {
            newObj[key] = removeTypename((obj as Record<string, unknown>)[key]);
          }
        }

        return newObj as T;
      };
      try {
        // Sanitize and prepare the record for the new object type
        const sanitizedInput = sanitizeRecordInput({
          objectMetadataItem: toObjectMetadataItem,
          recordInput: {
            ...originalRecord,
            ...additionalDataToMove,
            id: v4(), // Generate a new ID for the moved record
          },
        });

        const cleanedInput = removeTypename<any>(sanitizedInput);

        // Create the record in the target object type
        const movedRecord = await createOneRecord(cleanedInput);

        if (!movedRecord) {
          throw new Error('Failed to create record in target object');
        }

        // Destroy the original record
        await destroyOneRecord(idToMove);

        return movedRecord;
      } catch (error) {
        // Rollback: If move fails, attempt to restore the original record
        if (!isUndefinedOrNull(originalRecord)) {
          // Attempt to restore the original record if move fails
          triggerCreateRecordsOptimisticEffect({
            cache: apolloClient.cache,
            objectMetadataItem: fromObjectMetadataItem,
            recordsToCreate: [originalRecord],
            objectMetadataItems,
          });
        }
        throw error;
      }
    },
    [
      apolloClient,
      createOneRecord,
      destroyOneRecord,
      fromObjectMetadataItem,
      getRecordFromCache,
      objectMetadataItems,
      toObjectMetadataItem,
    ],
  );

  return {
    moveOneRecord,
  };
};
