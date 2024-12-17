import { ObjectMetadataEntity } from 'src/engine/metadata-modules/object-metadata/object-metadata.entity';
import { UNSORTED_ITEM_STANDARD_FIELD_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import { STANDARD_OBJECT_ICONS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-icons';
import { STANDARD_OBJECT_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';

export const unsortedView = (
  objectMetadataMap: Record<string, ObjectMetadataEntity>,
) => {
  return {
    name: 'Unsorted',
    objectMetadataId: objectMetadataMap[STANDARD_OBJECT_IDS.unsortedItem].id,
    type: 'kanban',
    key: 'INDEX',
    position: 0,
    icon: STANDARD_OBJECT_ICONS.unsortedItem,
    kanbanFieldMetadataId:
      objectMetadataMap[STANDARD_OBJECT_IDS.unsortedItem].fields[
        UNSORTED_ITEM_STANDARD_FIELD_IDS.stage
      ],
    filters: [],
    fields: [
      {
        fieldMetadataId:
          objectMetadataMap[STANDARD_OBJECT_IDS.unsortedItem].fields[
            UNSORTED_ITEM_STANDARD_FIELD_IDS.name
          ],
        position: 0,
        isVisible: true,
        size: 210,
      },
      {
        fieldMetadataId:
          objectMetadataMap[STANDARD_OBJECT_IDS.unsortedItem].fields[
            UNSORTED_ITEM_STANDARD_FIELD_IDS.fullName
          ],
        position: 2,
        isVisible: true,
        size: 150,
      },
      {
        fieldMetadataId:
          objectMetadataMap[STANDARD_OBJECT_IDS.unsortedItem].fields[
            UNSORTED_ITEM_STANDARD_FIELD_IDS.pointOfContact
          ],
        position: 3,
        isVisible: true,
        size: 150,
      },
    ],
    groups: [
      {
        fieldMetadataId:
          objectMetadataMap[STANDARD_OBJECT_IDS.unsortedItem].fields[
            UNSORTED_ITEM_STANDARD_FIELD_IDS.stage
          ],
        isVisible: true,
        fieldValue: 'INCOMING',
        position: 0,
      },
      {
        fieldMetadataId:
          objectMetadataMap[STANDARD_OBJECT_IDS.unsortedItem].fields[
            UNSORTED_ITEM_STANDARD_FIELD_IDS.stage
          ],
        isVisible: true,
        fieldValue: 'CONTACTING',
        position: 1,
      },
      {
        fieldMetadataId:
          objectMetadataMap[STANDARD_OBJECT_IDS.unsortedItem].fields[
            UNSORTED_ITEM_STANDARD_FIELD_IDS.stage
          ],
        isVisible: true,
        fieldValue: 'WON',
        position: 2,
      },
      {
        fieldMetadataId:
          objectMetadataMap[STANDARD_OBJECT_IDS.unsortedItem].fields[
            UNSORTED_ITEM_STANDARD_FIELD_IDS.stage
          ],
        isVisible: true,
        fieldValue: 'LOST',
        position: 3,
      },
      {
        fieldMetadataId:
          objectMetadataMap[STANDARD_OBJECT_IDS.unsortedItem].fields[
            UNSORTED_ITEM_STANDARD_FIELD_IDS.stage
          ],
        isVisible: true,
        fieldValue: 'FOLLOW_UP',
        position: 4,
      },
    ],
  };
};
