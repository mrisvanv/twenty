import { ObjectMetadataEntity } from 'src/engine/metadata-modules/object-metadata/object-metadata.entity';
import { COSMETIC_DENTISTRY_ITEM_STANDARD_FIELD_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import { STANDARD_OBJECT_ICONS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-icons';
import { STANDARD_OBJECT_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';

export const cosmeticDentistryView = (
  objectMetadataMap: Record<string, ObjectMetadataEntity>,
) => {
  return {
    name: 'Cosmetic Dentistry',
    objectMetadataId:
      objectMetadataMap[STANDARD_OBJECT_IDS.cosmeticDentistryItem].id,
    type: 'kanban',
    key: 'INDEX',
    position: 0,
    icon: STANDARD_OBJECT_ICONS.cosmeticDentistryItem,
    kanbanFieldMetadataId:
      objectMetadataMap[STANDARD_OBJECT_IDS.cosmeticDentistryItem].fields[
        COSMETIC_DENTISTRY_ITEM_STANDARD_FIELD_IDS.stage
      ],
    filters: [],
    fields: [
      {
        fieldMetadataId:
          objectMetadataMap[STANDARD_OBJECT_IDS.cosmeticDentistryItem].fields[
            COSMETIC_DENTISTRY_ITEM_STANDARD_FIELD_IDS.name
          ],
        position: 0,
        isVisible: true,
        size: 210,
      },
      {
        fieldMetadataId:
          objectMetadataMap[STANDARD_OBJECT_IDS.cosmeticDentistryItem].fields[
            COSMETIC_DENTISTRY_ITEM_STANDARD_FIELD_IDS.fullName
          ],
        position: 2,
        isVisible: true,
        size: 150,
      },
      {
        fieldMetadataId:
          objectMetadataMap[STANDARD_OBJECT_IDS.cosmeticDentistryItem].fields[
            COSMETIC_DENTISTRY_ITEM_STANDARD_FIELD_IDS.pointOfContact
          ],
        position: 3,
        isVisible: true,
        size: 150,
      },
    ],
    groups: [
      {
        fieldMetadataId:
          objectMetadataMap[STANDARD_OBJECT_IDS.cosmeticDentistryItem].fields[
            COSMETIC_DENTISTRY_ITEM_STANDARD_FIELD_IDS.stage
          ],
        isVisible: true,
        fieldValue: 'INCOMING',
        position: 0,
      },
      {
        fieldMetadataId:
          objectMetadataMap[STANDARD_OBJECT_IDS.cosmeticDentistryItem].fields[
            COSMETIC_DENTISTRY_ITEM_STANDARD_FIELD_IDS.stage
          ],
        isVisible: true,
        fieldValue: 'CONTACTING',
        position: 1,
      },
      {
        fieldMetadataId:
          objectMetadataMap[STANDARD_OBJECT_IDS.cosmeticDentistryItem].fields[
            COSMETIC_DENTISTRY_ITEM_STANDARD_FIELD_IDS.stage
          ],
        isVisible: true,
        fieldValue: 'WON',
        position: 2,
      },
      {
        fieldMetadataId:
          objectMetadataMap[STANDARD_OBJECT_IDS.cosmeticDentistryItem].fields[
            COSMETIC_DENTISTRY_ITEM_STANDARD_FIELD_IDS.stage
          ],
        isVisible: true,
        fieldValue: 'LOST',
        position: 3,
      },
      {
        fieldMetadataId:
          objectMetadataMap[STANDARD_OBJECT_IDS.cosmeticDentistryItem].fields[
            COSMETIC_DENTISTRY_ITEM_STANDARD_FIELD_IDS.stage
          ],
        isVisible: true,
        fieldValue: 'FOLLOW_UP',
        position: 4,
      },
    ],
  };
};
