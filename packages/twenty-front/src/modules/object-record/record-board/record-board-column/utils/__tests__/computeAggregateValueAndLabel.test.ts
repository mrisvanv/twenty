import { FieldMetadataItem } from '@/object-metadata/types/FieldMetadataItem';
import { ObjectMetadataItem } from '@/object-metadata/types/ObjectMetadataItem';
import { computeAggregateValueAndLabel } from '@/object-record/record-board/record-board-column/utils/computeAggregateValueAndLabel';
import { AGGREGATE_OPERATIONS } from '@/object-record/record-table/constants/AggregateOperations';
import { FieldMetadataType } from '~/generated/graphql';

const MOCK_FIELD_ID = '7d2d7b5e-7b3e-4b4a-8b0a-7b3e4b4a8b0a';
const MOCK_KANBAN_FIELD = 'stage';

describe('computeAggregateValueAndLabel', () => {
  const mockObjectMetadata: ObjectMetadataItem = {
    id: '123',
    fields: [
      {
        id: MOCK_FIELD_ID,
        name: 'amount',
        type: FieldMetadataType.Currency,
      } as FieldMetadataItem,
    ],
  } as ObjectMetadataItem;

  it('should return empty object for empty data', () => {
    const result = computeAggregateValueAndLabel(
      {},
      mockObjectMetadata,
      { fieldMetadataId: MOCK_FIELD_ID, operation: AGGREGATE_OPERATIONS.sum },
      MOCK_KANBAN_FIELD,
    );

    expect(result).toEqual({});
  });

  it('should handle currency field with division by 1M', () => {
    const mockData = {
      amount: {
        [AGGREGATE_OPERATIONS.sum]: 2000000,
      },
    };

    const result = computeAggregateValueAndLabel(
      mockData,
      mockObjectMetadata,
      { fieldMetadataId: MOCK_FIELD_ID, operation: AGGREGATE_OPERATIONS.sum },
      MOCK_KANBAN_FIELD,
    );

    expect(result).toEqual({
      value: 2,
      label: 'Sum of amount',
    });
  });

  it('should default to count when field not found', () => {
    const mockData = {
      [MOCK_KANBAN_FIELD]: {
        [AGGREGATE_OPERATIONS.count]: 42,
      },
    };

    const result = computeAggregateValueAndLabel(
      mockData,
      mockObjectMetadata,
      { fieldMetadataId: 'non-existent', operation: AGGREGATE_OPERATIONS.sum },
      MOCK_KANBAN_FIELD,
    );

    expect(result).toEqual({
      value: 42,
      label: 'Count',
    });
  });

  it('should handle undefined aggregate value', () => {
    const mockData = {
      amount: {
        [AGGREGATE_OPERATIONS.sum]: undefined,
      },
    };

    const result = computeAggregateValueAndLabel(
      mockData,
      mockObjectMetadata,
      { fieldMetadataId: MOCK_FIELD_ID, operation: AGGREGATE_OPERATIONS.sum },
      MOCK_KANBAN_FIELD,
    );

    expect(result).toEqual({
      value: undefined,
      label: 'Sum of amount',
    });
  });
});
