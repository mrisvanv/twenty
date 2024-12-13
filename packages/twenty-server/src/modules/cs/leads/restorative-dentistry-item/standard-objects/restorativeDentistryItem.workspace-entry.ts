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
import { RESTORATIVE_DENTISTRY_ITEM_STANDARD_FIELD_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
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
import { PersonWorkspaceEntity } from 'src/modules/person/standard-objects/person.workspace-entity';
import { TaskTargetWorkspaceEntity } from 'src/modules/task/standard-objects/task-target.workspace-entity';
import { TimelineActivityWorkspaceEntity } from 'src/modules/timeline/standard-objects/timeline-activity.workspace-entity';

const NAME_FIELD_NAME = 'name';
const FULL_NAME_FIELD_NAME = 'fullName';

export const SEARCH_FIELDS_FOR_RESTORATIVE_DENTISTRY: FieldTypeAndNameMetadata[] =
  [
    { name: NAME_FIELD_NAME, type: FieldMetadataType.TEXT },
    { name: FULL_NAME_FIELD_NAME, type: FieldMetadataType.FULL_NAME },
  ];

@WorkspaceEntity({
  standardId: STANDARD_OBJECT_IDS.restorativeDentistryItem,
  namePlural: 'restorativeDentistry',
  labelSingular: 'Restorative Dentistry Item',
  labelPlural: 'Restorative Dentistry',
  description: 'A restorative dentistry item',
  icon: STANDARD_OBJECT_ICONS.restorativeDentistryItem,
  labelIdentifierStandardId: RESTORATIVE_DENTISTRY_ITEM_STANDARD_FIELD_IDS.name,
})
@WorkspaceIsNotAuditLogged()
export class RestorativeDentistryItemWorkspaceEntity extends BaseWorkspaceEntity {
  @WorkspaceField({
    standardId: RESTORATIVE_DENTISTRY_ITEM_STANDARD_FIELD_IDS.position,
    type: FieldMetadataType.POSITION,
    label: 'Position',
    description: 'Record position',
    icon: 'IconHierarchy2',
  })
  @WorkspaceIsSystem()
  @WorkspaceIsNullable()
  position: number | null;

  @WorkspaceField({
    standardId: RESTORATIVE_DENTISTRY_ITEM_STANDARD_FIELD_IDS.name,
    type: FieldMetadataType.TEXT,
    label: 'Name',
    description: 'The restorative dentistry item name',
    icon: 'IconAbc',
  })
  name: string;

  @WorkspaceField({
    standardId: RESTORATIVE_DENTISTRY_ITEM_STANDARD_FIELD_IDS.fullName,
    type: FieldMetadataType.FULL_NAME,
    label: 'Full Name',
    description: 'The patient full name',
    icon: 'IconUserCircle',
  })
  @WorkspaceIsNullable()
  fullName: string | null;

  @WorkspaceField({
    standardId: RESTORATIVE_DENTISTRY_ITEM_STANDARD_FIELD_IDS.dateOfBirth,
    type: FieldMetadataType.DATE,
    label: 'Date of birth',
    description: 'Date of birth',
    icon: 'IconCalendarEvent',
  })
  @WorkspaceIsNullable()
  dateOfBirth: Date | null;

  @WorkspaceField({
    standardId: RESTORATIVE_DENTISTRY_ITEM_STANDARD_FIELD_IDS.stage,
    type: FieldMetadataType.SELECT,
    label: 'Stage',
    description: 'Restorative dentistry item stage',
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
    standardId: RESTORATIVE_DENTISTRY_ITEM_STANDARD_FIELD_IDS.gender,
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
    standardId: RESTORATIVE_DENTISTRY_ITEM_STANDARD_FIELD_IDS.createdBy,
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
    standardId: RESTORATIVE_DENTISTRY_ITEM_STANDARD_FIELD_IDS.pointOfContact,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Point of Contact',
    description: 'Restorative dentistry item point of contact',
    icon: 'IconUser',
    inverseSideTarget: () => PersonWorkspaceEntity,
    inverseSideFieldKey: 'pointOfContactForRestorativeDentistryItem',
    onDelete: RelationOnDeleteAction.SET_NULL,
  })
  @WorkspaceIsNullable()
  pointOfContact: Relation<PersonWorkspaceEntity> | null;

  @WorkspaceJoinColumn('pointOfContact')
  pointOfContactId: string | null;

  @WorkspaceRelation({
    standardId: RESTORATIVE_DENTISTRY_ITEM_STANDARD_FIELD_IDS.favorites,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Favorites',
    description: 'Favorites linked to the restorative dentistry item',
    icon: 'IconHeart',
    inverseSideTarget: () => FavoriteWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  @WorkspaceIsSystem()
  favorites: Relation<FavoriteWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: RESTORATIVE_DENTISTRY_ITEM_STANDARD_FIELD_IDS.taskTargets,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Tasks',
    description: 'Tasks tied to the restorative dentistry item',
    icon: 'IconCheckbox',
    inverseSideTarget: () => TaskTargetWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  taskTargets: Relation<TaskTargetWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: RESTORATIVE_DENTISTRY_ITEM_STANDARD_FIELD_IDS.noteTargets,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Notes',
    description: 'Notes tied to the restorative dentistry item',
    icon: 'IconNotes',
    inverseSideTarget: () => NoteTargetWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  noteTargets: Relation<NoteTargetWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: RESTORATIVE_DENTISTRY_ITEM_STANDARD_FIELD_IDS.attachments,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Attachments',
    description: 'Attachments linked to the restorative dentistry item',
    icon: 'IconFileImport',
    inverseSideTarget: () => AttachmentWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  attachments: Relation<AttachmentWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId:
      RESTORATIVE_DENTISTRY_ITEM_STANDARD_FIELD_IDS.timelineActivities,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Timeline Activities',
    description:
      'Timeline Activities linked to the restorative dentistry item.',
    icon: 'IconTimelineEvent',
    inverseSideTarget: () => TimelineActivityWorkspaceEntity,
    onDelete: RelationOnDeleteAction.SET_NULL,
  })
  @WorkspaceIsNullable()
  timelineActivities: Relation<TimelineActivityWorkspaceEntity[]>;

  @WorkspaceField({
    standardId: RESTORATIVE_DENTISTRY_ITEM_STANDARD_FIELD_IDS.searchVector,
    type: FieldMetadataType.TS_VECTOR,
    label: SEARCH_VECTOR_FIELD.label,
    description: SEARCH_VECTOR_FIELD.description,
    icon: 'IconUser',
    generatedType: 'STORED',
    asExpression: getTsVectorColumnExpressionFromFields(
      SEARCH_FIELDS_FOR_RESTORATIVE_DENTISTRY,
    ),
  })
  @WorkspaceIsNullable()
  @WorkspaceIsSystem()
  @WorkspaceFieldIndex({ indexType: IndexType.GIN })
  [SEARCH_VECTOR_FIELD.name]: any;

  @WorkspaceField({
    standardId: RESTORATIVE_DENTISTRY_ITEM_STANDARD_FIELD_IDS.patientId,
    type: FieldMetadataType.TEXT,
    label: 'Patient ID',
    description: 'Patient ID',
    icon: 'IconUser',
  })
  @WorkspaceIsNullable()
  @WorkspaceIsSystem()
  patientId: string | null;

  @WorkspaceRelation({
    standardId: RESTORATIVE_DENTISTRY_ITEM_STANDARD_FIELD_IDS.location,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Location',
    description: 'Patient location',
    icon: 'IconLocation',
    inverseSideTarget: () => LocationWorkspaceEntity,
    inverseSideFieldKey: 'restorativeDentistry',
    onDelete: RelationOnDeleteAction.SET_NULL,
  })
  @WorkspaceIsNullable()
  location: Relation<LocationWorkspaceEntity> | null;

  @WorkspaceJoinColumn('location')
  locationId: string | null;
}
