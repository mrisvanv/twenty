import { Relation } from 'src/engine/workspace-manager/workspace-sync-metadata/interfaces/relation.interface';

import { SEARCH_VECTOR_FIELD } from 'src/engine/metadata-modules/constants/search-vector-field.constants';
import {
  ActorMetadata,
  FieldActorSource,
} from 'src/engine/metadata-modules/field-metadata/composite-types/actor.composite-type';
import { FieldMetadataType } from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';
import { IndexType } from 'src/engine/metadata-modules/index-metadata/index-metadata.entity';
import {
  RelationMetadataType,
  RelationOnDeleteAction,
} from 'src/engine/metadata-modules/relation-metadata/relation-metadata.entity';
import { BaseWorkspaceEntity } from 'src/engine/twenty-orm/base.workspace-entity';
import { WorkspaceEntity } from 'src/engine/twenty-orm/decorators/workspace-entity.decorator';
import { WorkspaceFieldIndex } from 'src/engine/twenty-orm/decorators/workspace-field-index.decorator';
import { WorkspaceField } from 'src/engine/twenty-orm/decorators/workspace-field.decorator';
import { WorkspaceIsNullable } from 'src/engine/twenty-orm/decorators/workspace-is-nullable.decorator';
import { WorkspaceIsSystem } from 'src/engine/twenty-orm/decorators/workspace-is-system.decorator';
import { WorkspaceRelation } from 'src/engine/twenty-orm/decorators/workspace-relation.decorator';
import { LOCATION_STANDARD_FIELD_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import { STANDARD_OBJECT_ICONS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-icons';
import { STANDARD_OBJECT_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';
import {
  FieldTypeAndNameMetadata,
  getTsVectorColumnExpressionFromFields,
} from 'src/engine/workspace-manager/workspace-sync-metadata/utils/get-ts-vector-column-expression.util';
import { UnsortedItemWorkspaceEntity } from 'src/modules/cs/leads/unsorted-item/standard-objects/unsortedItem.workspace-entry';
import { FavoriteWorkspaceEntity } from 'src/modules/favorite/standard-objects/favorite.workspace-entity';

const NAME_FIELD_NAME = 'name';

export const SEARCH_FIELDS_FOR_LOCATION: FieldTypeAndNameMetadata[] = [
  { name: NAME_FIELD_NAME, type: FieldMetadataType.TEXT },
];

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
    description: 'Record position',
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
  @WorkspaceIsNullable()
  locationId: number | null;

  @WorkspaceField({
    standardId: LOCATION_STANDARD_FIELD_IDS.createdBy,
    type: FieldMetadataType.ACTOR,
    label: 'Created by',
    icon: 'IconCreativeCommonsSa',
    description: 'The creator of the record',
    defaultValue: {
      source: `'${FieldActorSource.MANUAL}'`,
      name: "''",
    },
  })
  createdBy: ActorMetadata;

  // //Relations
  @WorkspaceRelation({
    standardId: LOCATION_STANDARD_FIELD_IDS.unsorted,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Unsorted',
    description: 'Unsorted',
    icon: STANDARD_OBJECT_ICONS.unsortedItem,
    inverseSideTarget: () => UnsortedItemWorkspaceEntity,
    inverseSideFieldKey: 'location',
    onDelete: RelationOnDeleteAction.SET_NULL,
  })
  unsorted: Relation<UnsortedItemWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: LOCATION_STANDARD_FIELD_IDS.favorites,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Favorites',
    description: 'Favorites linked to the Location',
    icon: 'IconHeart',
    inverseSideTarget: () => FavoriteWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  @WorkspaceIsSystem()
  favorites: Relation<FavoriteWorkspaceEntity[]>;

  @WorkspaceField({
    standardId: LOCATION_STANDARD_FIELD_IDS.searchVector,
    type: FieldMetadataType.TS_VECTOR,
    label: SEARCH_VECTOR_FIELD.label,
    description: SEARCH_VECTOR_FIELD.description,
    icon: 'IconUser',
    generatedType: 'STORED',
    asExpression: getTsVectorColumnExpressionFromFields(
      SEARCH_FIELDS_FOR_LOCATION,
    ),
  })
  @WorkspaceIsNullable()
  @WorkspaceIsSystem()
  @WorkspaceFieldIndex({ indexType: IndexType.GIN })
  [SEARCH_VECTOR_FIELD.name]: any;
}
