import { ObjectMetadataEntity } from 'src/engine/metadata-modules/object-metadata/object-metadata.entity';
import { LOCATION_STANDARD_FIELD_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import { STANDARD_OBJECT_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';

export const locationsAllView = (
  objectMetadataMap: Record<string, ObjectMetadataEntity>,
) => {
  return {
    name: 'Locations',
    objectMetadataId: objectMetadataMap[STANDARD_OBJECT_IDS.location].id,
    type: 'table',
    key: 'INDEX',
    position: 0,
    icon: 'IconLocation',
    kanbanFieldMetadataId: '',
    filters: [],
    fields: [
      {
        fieldMetadataId:
          objectMetadataMap[STANDARD_OBJECT_IDS.location].fields[
            LOCATION_STANDARD_FIELD_IDS.name
          ],
        position: 0,
        isVisible: true,
        size: 210,
      },
    ],
  };
};
