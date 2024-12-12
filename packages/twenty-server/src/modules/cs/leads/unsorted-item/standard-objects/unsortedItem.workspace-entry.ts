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
import { WorkspaceIsNotAuditLogged } from 'src/engine/twenty-orm/decorators/workspace-is-not-audit-logged.decorator';
import { WorkspaceIsNullable } from 'src/engine/twenty-orm/decorators/workspace-is-nullable.decorator';
import { WorkspaceIsSystem } from 'src/engine/twenty-orm/decorators/workspace-is-system.decorator';
import { WorkspaceJoinColumn } from 'src/engine/twenty-orm/decorators/workspace-join-column.decorator';
import { WorkspaceRelation } from 'src/engine/twenty-orm/decorators/workspace-relation.decorator';
import { UNSORTED_ITEM_STANDARD_FIELD_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import { STANDARD_OBJECT_ICONS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-icons';
import { STANDARD_OBJECT_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';
import {
    FieldTypeAndNameMetadata,
    getTsVectorColumnExpressionFromFields,
} from 'src/engine/workspace-manager/workspace-sync-metadata/utils/get-ts-vector-column-expression.util';
import { AttachmentWorkspaceEntity } from 'src/modules/attachment/standard-objects/attachment.workspace-entity';
import { LocationWorkspaceEntity } from 'src/modules/cs/location/standard-objects/location.workspace-entry';
import { FavoriteWorkspaceEntity } from 'src/modules/favorite/standard-objects/favorite.workspace-entity';
import { NoteTargetWorkspaceEntity } from 'src/modules/note/standard-objects/note-target.workspace-entity';
import { TaskTargetWorkspaceEntity } from 'src/modules/task/standard-objects/task-target.workspace-entity';
import { TimelineActivityWorkspaceEntity } from 'src/modules/timeline/standard-objects/timeline-activity.workspace-entity';

const NAME_FIELD_NAME = 'name';
const FULL_NAME_FIELD_NAME = 'fullName';
const EMAIL = 'email';

export const SEARCH_FIELDS_FOR_UNSORTED_ITEM: FieldTypeAndNameMetadata[] = [
  { name: NAME_FIELD_NAME, type: FieldMetadataType.TEXT },
  { name: FULL_NAME_FIELD_NAME, type: FieldMetadataType.FULL_NAME },
  { name: EMAIL, type: FieldMetadataType.EMAILS },
];

@WorkspaceEntity({
  standardId: STANDARD_OBJECT_IDS.unsortedItem,
  namePlural: 'unsorted',
  labelSingular: 'Unsorted Item',
  labelPlural: 'Unsorted',
  description: 'An unsorted item',
  icon: STANDARD_OBJECT_ICONS.unsortedItem,
  labelIdentifierStandardId: UNSORTED_ITEM_STANDARD_FIELD_IDS.name,
})
@WorkspaceIsNotAuditLogged()
export class UnsortedItemWorkspaceEntity extends BaseWorkspaceEntity {
  @WorkspaceField({
    standardId: UNSORTED_ITEM_STANDARD_FIELD_IDS.position,
    type: FieldMetadataType.POSITION,
    label: 'Position',
    description: 'Record position',
    icon: 'IconHierarchy2',
  })
  @WorkspaceIsSystem()
  @WorkspaceIsNullable()
  position: number | null;

  @WorkspaceField({
    standardId: UNSORTED_ITEM_STANDARD_FIELD_IDS.name,
    type: FieldMetadataType.TEXT,
    label: 'Name',
    description: 'The unsorted item name',
    icon: 'IconAbc',
  })
  name: string;

  @WorkspaceField({
    standardId: UNSORTED_ITEM_STANDARD_FIELD_IDS.fullName,
    type: FieldMetadataType.FULL_NAME,
    label: 'Full Name',
    description: 'The patient full name',
    icon: 'IconUserCircle',
  })
  @WorkspaceIsNullable()
  fullName: string | null;

  @WorkspaceField({
    standardId: UNSORTED_ITEM_STANDARD_FIELD_IDS.phoneNumber,
    type: FieldMetadataType.PHONES,
    label: 'Phone Number',
    description: 'The phone number',
    icon: 'IconPhone',
  })
  @WorkspaceIsNullable()
  phoneNumber: string | null;

  @WorkspaceField({
    standardId: UNSORTED_ITEM_STANDARD_FIELD_IDS.dateOfBirth,
    type: FieldMetadataType.DATE,
    label: 'Date of birth',
    description: 'Date of birth',
    icon: 'IconCalendarEvent',
  })
  @WorkspaceIsNullable()
  dateOfBirth: Date | null;

  @WorkspaceField({
    standardId: UNSORTED_ITEM_STANDARD_FIELD_IDS.email,
    type: FieldMetadataType.EMAILS,
    label: 'Email',
    description: 'The email address',
    icon: 'IconEmail',
  })
  @WorkspaceIsNullable()
  email: string | null;

  @WorkspaceField({
    standardId: UNSORTED_ITEM_STANDARD_FIELD_IDS.stage,
    type: FieldMetadataType.SELECT,
    label: 'Stage',
    description: 'Unsorted item stage',
    icon: 'IconProgressCheck',
    options: [
      { value: 'INCOMING', label: 'Incoming', position: 0, color: 'sky' },
      {
        value: 'CONTACTING',
        label: 'Contacting',
        position: 1,
        color: 'turquoise',
      },
      { value: 'WON', label: 'Won', position: 2, color: 'green' },
      { value: 'LOST', label: 'Lost', position: 3, color: 'red' },
      { value: 'FOLLOW_UP', label: 'Follow Up', position: 4, color: 'purple' },
    ],
    defaultValue: "'INCOMING'",
  })
  @WorkspaceFieldIndex()
  stage: string;

  @WorkspaceField({
    standardId: UNSORTED_ITEM_STANDARD_FIELD_IDS.genter,
    type: FieldMetadataType.SELECT,
    label: 'Genter',
    description: 'The genter',
    icon: 'IconUserQuestion',
    options: [
      { value: 'MALE', label: 'Male', position: 0, color: 'blue' },
      { value: 'FEMALE', label: 'Female', position: 1, color: 'pink' },
      { value: 'OTHER', label: 'Other', position: 2, color: 'purple' },
    ],
    defaultValue: null,
  })
  @WorkspaceFieldIndex()
  @WorkspaceIsNullable()
  genter: string | null;

  @WorkspaceField({
    standardId: UNSORTED_ITEM_STANDARD_FIELD_IDS.createdBy,
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
  @WorkspaceRelation({
    standardId: UNSORTED_ITEM_STANDARD_FIELD_IDS.favorites,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Favorites',
    description: 'Favorites linked to the unsorted item',
    icon: 'IconHeart',
    inverseSideTarget: () => FavoriteWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  @WorkspaceIsSystem()
  favorites: Relation<FavoriteWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: UNSORTED_ITEM_STANDARD_FIELD_IDS.taskTargets,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Tasks',
    description: 'Tasks tied to the unsorted item',
    icon: 'IconCheckbox',
    inverseSideTarget: () => TaskTargetWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  taskTargets: Relation<TaskTargetWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: UNSORTED_ITEM_STANDARD_FIELD_IDS.noteTargets,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Notes',
    description: 'Notes tied to the unsorted item',
    icon: 'IconNotes',
    inverseSideTarget: () => NoteTargetWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  noteTargets: Relation<NoteTargetWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: UNSORTED_ITEM_STANDARD_FIELD_IDS.attachments,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Attachments',
    description: 'Attachments linked to the unsorted item',
    icon: 'IconFileImport',
    inverseSideTarget: () => AttachmentWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  attachments: Relation<AttachmentWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: UNSORTED_ITEM_STANDARD_FIELD_IDS.timelineActivities,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Timeline Activities',
    description: 'Timeline Activities linked to the unsorted item.',
    icon: 'IconTimelineEvent',
    inverseSideTarget: () => TimelineActivityWorkspaceEntity,
    onDelete: RelationOnDeleteAction.SET_NULL,
  })
  @WorkspaceIsNullable()
  timelineActivities: Relation<TimelineActivityWorkspaceEntity[]>;

  @WorkspaceField({
    standardId: UNSORTED_ITEM_STANDARD_FIELD_IDS.searchVector,
    type: FieldMetadataType.TS_VECTOR,
    label: SEARCH_VECTOR_FIELD.label,
    description: SEARCH_VECTOR_FIELD.description,
    icon: 'IconUser',
    generatedType: 'STORED',
    asExpression: getTsVectorColumnExpressionFromFields(
      SEARCH_FIELDS_FOR_UNSORTED_ITEM,
    ),
  })
  @WorkspaceIsNullable()
  @WorkspaceIsSystem()
  @WorkspaceFieldIndex({ indexType: IndexType.GIN })
  [SEARCH_VECTOR_FIELD.name]: any;

  //   //Relation
  @WorkspaceRelation({
    standardId: UNSORTED_ITEM_STANDARD_FIELD_IDS.location,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Location',
    description: 'Patient location',
    icon: 'IconLocation',
    inverseSideTarget: () => LocationWorkspaceEntity,
    inverseSideFieldKey: 'unsorted',
    onDelete: RelationOnDeleteAction.SET_NULL,
  })
  @WorkspaceIsNullable()
  location: Relation<LocationWorkspaceEntity> | null;

  @WorkspaceJoinColumn('location')
  locationId: string | null;
}
