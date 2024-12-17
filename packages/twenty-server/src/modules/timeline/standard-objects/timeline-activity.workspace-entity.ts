import { Relation } from 'src/engine/workspace-manager/workspace-sync-metadata/interfaces/relation.interface';

import { FeatureFlagKey } from 'src/engine/core-modules/feature-flag/enums/feature-flag-key.enum';
import { FieldMetadataType } from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';
import { RelationMetadataType } from 'src/engine/metadata-modules/relation-metadata/relation-metadata.entity';
import { BaseWorkspaceEntity } from 'src/engine/twenty-orm/base.workspace-entity';
import { CustomWorkspaceEntity } from 'src/engine/twenty-orm/custom.workspace-entity';
import { WorkspaceDynamicRelation } from 'src/engine/twenty-orm/decorators/workspace-dynamic-relation.decorator';
import { WorkspaceEntity } from 'src/engine/twenty-orm/decorators/workspace-entity.decorator';
import { WorkspaceField } from 'src/engine/twenty-orm/decorators/workspace-field.decorator';
import { WorkspaceGate } from 'src/engine/twenty-orm/decorators/workspace-gate.decorator';
import { WorkspaceIsNotAuditLogged } from 'src/engine/twenty-orm/decorators/workspace-is-not-audit-logged.decorator';
import { WorkspaceIsNullable } from 'src/engine/twenty-orm/decorators/workspace-is-nullable.decorator';
import { WorkspaceIsSystem } from 'src/engine/twenty-orm/decorators/workspace-is-system.decorator';
import { WorkspaceJoinColumn } from 'src/engine/twenty-orm/decorators/workspace-join-column.decorator';
import { WorkspaceRelation } from 'src/engine/twenty-orm/decorators/workspace-relation.decorator';
import { TIMELINE_ACTIVITY_STANDARD_FIELD_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import { STANDARD_OBJECT_ICONS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-icons';
import { STANDARD_OBJECT_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';
import { CompanyWorkspaceEntity } from 'src/modules/company/standard-objects/company.workspace-entity';
import { CosmeticDentistryItemWorkspaceEntity } from 'src/modules/cs/leads/cosmetic-dentistry-item/standard-objects/cosmeticDentistryItem.workspace-entry';
import { EmergencyCareItemWorkspaceEntity } from 'src/modules/cs/leads/emergency-care-item/standard-objects/emergencyCareItem.workspace-entry';
import { OrthodonticsItemWorkspaceEntity } from 'src/modules/cs/leads/orthodontics-item/standard-objects/orthodonticsItem.workspace-entry';
import { PreventiveCareItemWorkspaceEntity } from 'src/modules/cs/leads/preventive-care-item/standard-objects/preventiveCareItem.workspace-entry';
import { RestorativeDentistryItemWorkspaceEntity } from 'src/modules/cs/leads/restorative-dentistry-item/standard-objects/restorativeDentistryItem.workspace-entry';
import { SpamItemWorkspaceEntity } from 'src/modules/cs/leads/spam-item/standard-objects/spamItem.workspace-entry';
import { UnsortedItemWorkspaceEntity } from 'src/modules/cs/leads/unsorted-item/standard-objects/unsortedItem.workspace-entry';
import { NoteWorkspaceEntity } from 'src/modules/note/standard-objects/note.workspace-entity';
import { OpportunityWorkspaceEntity } from 'src/modules/opportunity/standard-objects/opportunity.workspace-entity';
import { PersonWorkspaceEntity } from 'src/modules/person/standard-objects/person.workspace-entity';
import { TaskWorkspaceEntity } from 'src/modules/task/standard-objects/task.workspace-entity';
import { WorkflowRunWorkspaceEntity } from 'src/modules/workflow/common/standard-objects/workflow-run.workspace-entity';
import { WorkflowVersionWorkspaceEntity } from 'src/modules/workflow/common/standard-objects/workflow-version.workspace-entity';
import { WorkflowWorkspaceEntity } from 'src/modules/workflow/common/standard-objects/workflow.workspace-entity';
import { WorkspaceMemberWorkspaceEntity } from 'src/modules/workspace-member/standard-objects/workspace-member.workspace-entity';

@WorkspaceEntity({
  standardId: STANDARD_OBJECT_IDS.timelineActivity,
  namePlural: 'timelineActivities',
  labelSingular: 'Timeline Activity',
  labelPlural: 'Timeline Activities',
  description: 'Aggregated / filtered event to be displayed on the timeline',
  icon: STANDARD_OBJECT_ICONS.timelineActivity,
})
@WorkspaceIsSystem()
@WorkspaceIsNotAuditLogged()
export class TimelineActivityWorkspaceEntity extends BaseWorkspaceEntity {
  @WorkspaceField({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.happensAt,
    type: FieldMetadataType.DATE_TIME,
    label: 'Creation date',
    description: 'Creation date',
    icon: 'IconCalendar',
    defaultValue: 'now',
  })
  happensAt: Date;

  @WorkspaceField({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.name,
    type: FieldMetadataType.TEXT,
    label: 'Event name',
    description: 'Event name',
    icon: 'IconAbc',
  })
  name: string;

  @WorkspaceField({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.properties,
    type: FieldMetadataType.RAW_JSON,
    label: 'Event details',
    description: 'Json value for event details',
    icon: 'IconListDetails',
  })
  @WorkspaceIsNullable()
  properties: JSON | null;

  // Special objects that don't have their own timeline and are 'link' to the main object
  @WorkspaceField({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.linkedRecordCachedName,
    type: FieldMetadataType.TEXT,
    label: 'Linked Record cached name',
    description: 'Cached record name',
    icon: 'IconAbc',
  })
  linkedRecordCachedName: string;

  @WorkspaceField({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.linkedRecordId,
    type: FieldMetadataType.UUID,
    label: 'Linked Record id',
    description: 'Linked Record id',
    icon: 'IconAbc',
  })
  @WorkspaceIsNullable()
  linkedRecordId: string | null;

  @WorkspaceField({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.linkedObjectMetadataId,
    type: FieldMetadataType.UUID,
    label: 'Linked Object Metadata Id',
    description: 'inked Object Metadata Id',
    icon: 'IconAbc',
  })
  @WorkspaceIsNullable()
  linkedObjectMetadataId: string | null;

  // Who made the action
  @WorkspaceRelation({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.workspaceMember,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Workspace Member',
    description: 'Event workspace member',
    icon: 'IconCircleUser',
    inverseSideTarget: () => WorkspaceMemberWorkspaceEntity,
    inverseSideFieldKey: 'timelineActivities',
  })
  @WorkspaceIsNullable()
  workspaceMember: Relation<WorkspaceMemberWorkspaceEntity> | null;

  @WorkspaceJoinColumn('workspaceMember')
  workspaceMemberId: string | null;

  @WorkspaceRelation({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.person,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Person',
    description: 'Event person',
    icon: 'IconUser',
    inverseSideTarget: () => PersonWorkspaceEntity,
    inverseSideFieldKey: 'timelineActivities',
  })
  @WorkspaceIsNullable()
  person: Relation<PersonWorkspaceEntity> | null;

  @WorkspaceJoinColumn('person')
  personId: string | null;

  @WorkspaceRelation({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.company,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Company',
    description: 'Event company',
    icon: 'IconBuildingSkyscraper',
    inverseSideTarget: () => CompanyWorkspaceEntity,
    inverseSideFieldKey: 'timelineActivities',
  })
  @WorkspaceIsNullable()
  company: Relation<CompanyWorkspaceEntity> | null;

  @WorkspaceJoinColumn('company')
  companyId: string | null;

  @WorkspaceRelation({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.opportunity,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Opportunity',
    description: 'Event opportunity',
    icon: 'IconTargetArrow',
    inverseSideTarget: () => OpportunityWorkspaceEntity,
    inverseSideFieldKey: 'timelineActivities',
  })
  @WorkspaceIsNullable()
  opportunity: Relation<OpportunityWorkspaceEntity> | null;

  @WorkspaceJoinColumn('opportunity')
  opportunityId: string | null;

  @WorkspaceRelation({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.note,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Note',
    description: 'Event note',
    icon: 'IconTargetArrow',
    inverseSideTarget: () => NoteWorkspaceEntity,
    inverseSideFieldKey: 'timelineActivities',
  })
  @WorkspaceIsNullable()
  note: Relation<NoteWorkspaceEntity> | null;

  @WorkspaceJoinColumn('note')
  noteId: string | null;

  @WorkspaceRelation({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.task,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Task',
    description: 'Event task',
    icon: 'IconTargetArrow',
    inverseSideTarget: () => TaskWorkspaceEntity,
    inverseSideFieldKey: 'timelineActivities',
  })
  @WorkspaceIsNullable()
  task: Relation<TaskWorkspaceEntity> | null;

  @WorkspaceJoinColumn('task')
  taskId: string | null;

  @WorkspaceRelation({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.workflow,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Workflow',
    description: 'Event workflow',
    icon: 'IconTargetArrow',
    inverseSideTarget: () => WorkflowWorkspaceEntity,
    inverseSideFieldKey: 'timelineActivities',
  })
  @WorkspaceGate({
    featureFlag: FeatureFlagKey.IsWorkflowEnabled,
  })
  @WorkspaceIsNullable()
  workflow: Relation<WorkflowWorkspaceEntity> | null;

  @WorkspaceJoinColumn('workflow')
  @WorkspaceGate({
    featureFlag: FeatureFlagKey.IsWorkflowEnabled,
  })
  workflowId: string | null;

  @WorkspaceRelation({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.workflowVersion,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'WorkflowVersion',
    description: 'Event workflow version',
    icon: 'IconTargetArrow',
    inverseSideTarget: () => WorkflowVersionWorkspaceEntity,
    inverseSideFieldKey: 'timelineActivities',
  })
  @WorkspaceGate({
    featureFlag: FeatureFlagKey.IsWorkflowEnabled,
  })
  @WorkspaceIsNullable()
  workflowVersion: Relation<WorkflowVersionWorkspaceEntity> | null;

  @WorkspaceJoinColumn('workflowVersion')
  @WorkspaceGate({
    featureFlag: FeatureFlagKey.IsWorkflowEnabled,
  })
  workflowVersionId: string | null;

  @WorkspaceRelation({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.workflowRun,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Workflow Run',
    description: 'Event workflow run',
    icon: 'IconTargetArrow',
    inverseSideTarget: () => WorkflowRunWorkspaceEntity,
    inverseSideFieldKey: 'timelineActivities',
  })
  @WorkspaceGate({
    featureFlag: FeatureFlagKey.IsWorkflowEnabled,
  })
  @WorkspaceIsNullable()
  workflowRun: Relation<WorkflowRunWorkspaceEntity> | null;

  @WorkspaceJoinColumn('workflowRun')
  @WorkspaceGate({
    featureFlag: FeatureFlagKey.IsWorkflowEnabled,
  })
  workflowRunId: string | null;

  @WorkspaceDynamicRelation({
    type: RelationMetadataType.MANY_TO_ONE,
    argsFactory: (oppositeObjectMetadata) => ({
      standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.custom,
      name: oppositeObjectMetadata.nameSingular,
      label: oppositeObjectMetadata.labelSingular,
      description: `Timeline Activity ${oppositeObjectMetadata.labelSingular}`,
      joinColumn: `${oppositeObjectMetadata.nameSingular}Id`,
      icon: 'IconTimeline',
    }),
    inverseSideTarget: () => CustomWorkspaceEntity,
    inverseSideFieldKey: 'timelineActivities',
  })
  custom: Relation<CustomWorkspaceEntity>;

  // UnsortedItem
  @WorkspaceRelation({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.unsortedItem,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Unsorted Item',
    description: 'Unsorted Item',
    icon: STANDARD_OBJECT_ICONS.unsortedItem,
    inverseSideTarget: () => UnsortedItemWorkspaceEntity,
    inverseSideFieldKey: 'timelineActivities',
  })
  @WorkspaceIsNullable()
  unsortedItem: Relation<UnsortedItemWorkspaceEntity> | null;

  @WorkspaceJoinColumn('unsortedItem')
  unsortedItemId: string | null;

  // Preventive Care
  @WorkspaceRelation({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.preventiveCareItem,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Preventive Care Item',
    description: 'Preventive Care Item',
    icon: STANDARD_OBJECT_ICONS.preventiveCareItem,
    inverseSideTarget: () => PreventiveCareItemWorkspaceEntity,
    inverseSideFieldKey: 'timelineActivities',
  })
  @WorkspaceIsNullable()
  preventiveCareItem: Relation<PreventiveCareItemWorkspaceEntity> | null;

  @WorkspaceJoinColumn('preventiveCareItem')
  preventiveCareItemId: string | null;
  // Restorative Dentistry
  @WorkspaceRelation({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.restorativeDentistryItem,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Restorative Dentistry Item',
    description: 'Restorative Dentistry Item',
    icon: STANDARD_OBJECT_ICONS.restorativeDentistryItem,
    inverseSideTarget: () => RestorativeDentistryItemWorkspaceEntity,
    inverseSideFieldKey: 'timelineActivities',
  })
  @WorkspaceIsNullable()
  restorativeDentistryItem: Relation<RestorativeDentistryItemWorkspaceEntity> | null;

  @WorkspaceJoinColumn('restorativeDentistryItem')
  restorativeDentistryItemId: string | null;

  // Cosmetic Dentistry
  @WorkspaceRelation({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.cosmeticDentistryItem,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Cosmetic Dentistry Item',
    description: 'Cosmetic Dentistry Item',
    icon: STANDARD_OBJECT_ICONS.cosmeticDentistryItem,
    inverseSideTarget: () => CosmeticDentistryItemWorkspaceEntity,
    inverseSideFieldKey: 'timelineActivities',
  })
  @WorkspaceIsNullable()
  cosmeticDentistryItem: Relation<CosmeticDentistryItemWorkspaceEntity> | null;

  @WorkspaceJoinColumn('cosmeticDentistryItem')
  cosmeticDentistryItemId: string | null;
  // Orthodontics
  @WorkspaceRelation({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.orthodonticsItem,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Orthodontics Item',
    description: 'Orthodontics Item',
    icon: STANDARD_OBJECT_ICONS.orthodonticsItem,
    inverseSideTarget: () => OrthodonticsItemWorkspaceEntity,
    inverseSideFieldKey: 'timelineActivities',
  })
  @WorkspaceIsNullable()
  orthodonticsItem: Relation<OrthodonticsItemWorkspaceEntity> | null;

  @WorkspaceJoinColumn('orthodonticsItem')
  orthodonticsItemId: string | null;
  // Emergency Care
  @WorkspaceRelation({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.emergencyCareItem,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Emergency Care Item',
    description: 'Emergency Care Item',
    icon: STANDARD_OBJECT_ICONS.emergencyCareItem,
    inverseSideTarget: () => EmergencyCareItemWorkspaceEntity,
    inverseSideFieldKey: 'timelineActivities',
  })
  @WorkspaceIsNullable()
  emergencyCareItem: Relation<EmergencyCareItemWorkspaceEntity> | null;

  @WorkspaceJoinColumn('emergencyCareItem')
  emergencyCareItemId: string | null;

  // Spam
  @WorkspaceRelation({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.spamItem,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Spam',
    description: 'Spam',
    icon: STANDARD_OBJECT_ICONS.spamItem,
    inverseSideTarget: () => SpamItemWorkspaceEntity,
    inverseSideFieldKey: 'timelineActivities',
  })
  @WorkspaceIsNullable()
  spamItem: Relation<SpamItemWorkspaceEntity> | null;

  @WorkspaceJoinColumn('spamItem')
  spamItemId: string | null;
}
