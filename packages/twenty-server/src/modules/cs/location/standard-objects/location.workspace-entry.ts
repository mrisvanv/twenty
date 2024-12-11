import { FieldMetadataType } from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';
import { BaseWorkspaceEntity } from 'src/engine/twenty-orm/base.workspace-entity';
import { WorkspaceEntity } from 'src/engine/twenty-orm/decorators/workspace-entity.decorator';
import { WorkspaceField } from 'src/engine/twenty-orm/decorators/workspace-field.decorator';
import { WorkspaceIsNullable } from 'src/engine/twenty-orm/decorators/workspace-is-nullable.decorator';
import { WorkspaceIsSystem } from 'src/engine/twenty-orm/decorators/workspace-is-system.decorator';
import { LOCATION_STANDARD_FIELD_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import { STANDARD_OBJECT_ICONS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-icons';
import { STANDARD_OBJECT_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';

@WorkspaceEntity({
  standardId: STANDARD_OBJECT_IDS.location,
  namePlural: 'locations',
  labelSingular: 'Location',
  labelPlural: 'Locations',
  description: 'Location in PMS',
  icon: STANDARD_OBJECT_ICONS.location,
  labelIdentifierStandardId: LOCATION_STANDARD_FIELD_IDS.name,
})
export class LocationWorkspaceEntity extends BaseWorkspaceEntity {
  @WorkspaceField({
    standardId: LOCATION_STANDARD_FIELD_IDS.position,
    type: FieldMetadataType.POSITION,
    label: 'Position',
    description: 'Note record position',
    icon: 'IconHierarchy2',
  })
  @WorkspaceIsSystem()
  @WorkspaceIsNullable()
  position: number | null;

  @WorkspaceField({
    standardId: LOCATION_STANDARD_FIELD_IDS.name,
    type: FieldMetadataType.TEXT,
    label: 'Name',
    description: 'Location name',
    icon: 'IconAbc',
  })
  name: string;

  @WorkspaceField({
    standardId: LOCATION_STANDARD_FIELD_IDS.locationId,
    type: FieldMetadataType.NUMBER,
    label: 'Location Id',
    description: 'Location Id',
    icon: 'IconNumber9',
  })
  locationId: string;
}
