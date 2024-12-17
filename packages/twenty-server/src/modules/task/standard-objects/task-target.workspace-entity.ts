import { Relation } from 'src/engine/workspace-manager/workspace-sync-metadata/interfaces/relation.interface';

import { RelationMetadataType } from 'src/engine/metadata-modules/relation-metadata/relation-metadata.entity';
import { BaseWorkspaceEntity } from 'src/engine/twenty-orm/base.workspace-entity';
import { CustomWorkspaceEntity } from 'src/engine/twenty-orm/custom.workspace-entity';
import { WorkspaceDynamicRelation } from 'src/engine/twenty-orm/decorators/workspace-dynamic-relation.decorator';
import { WorkspaceEntity } from 'src/engine/twenty-orm/decorators/workspace-entity.decorator';
import { WorkspaceIsNullable } from 'src/engine/twenty-orm/decorators/workspace-is-nullable.decorator';
import { WorkspaceIsSystem } from 'src/engine/twenty-orm/decorators/workspace-is-system.decorator';
import { WorkspaceJoinColumn } from 'src/engine/twenty-orm/decorators/workspace-join-column.decorator';
import { WorkspaceRelation } from 'src/engine/twenty-orm/decorators/workspace-relation.decorator';
import { TASK_TARGET_STANDARD_FIELD_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
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
import { OpportunityWorkspaceEntity } from 'src/modules/opportunity/standard-objects/opportunity.workspace-entity';
import { PersonWorkspaceEntity } from 'src/modules/person/standard-objects/person.workspace-entity';
import { TaskWorkspaceEntity } from 'src/modules/task/standard-objects/task.workspace-entity';

@WorkspaceEntity({
  standardId: STANDARD_OBJECT_IDS.taskTarget,
  namePlural: 'taskTargets',
  labelSingular: 'Task Target',
  labelPlural: 'Task Targets',
  description: 'An task target',
  icon: STANDARD_OBJECT_ICONS.taskTarget,
})
@WorkspaceIsSystem()
export class TaskTargetWorkspaceEntity extends BaseWorkspaceEntity {
  @WorkspaceRelation({
    standardId: TASK_TARGET_STANDARD_FIELD_IDS.task,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Task',
    description: 'TaskTarget task',
    icon: 'IconCheckbox',
    inverseSideTarget: () => TaskWorkspaceEntity,
    inverseSideFieldKey: 'taskTargets',
  })
  @WorkspaceIsNullable()
  task: Relation<TaskWorkspaceEntity> | null;

  @WorkspaceJoinColumn('task')
  taskId: string | null;

  @WorkspaceRelation({
    standardId: TASK_TARGET_STANDARD_FIELD_IDS.person,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Person',
    description: 'TaskTarget person',
    icon: 'IconUser',
    inverseSideTarget: () => PersonWorkspaceEntity,
    inverseSideFieldKey: 'taskTargets',
  })
  @WorkspaceIsNullable()
  person: Relation<PersonWorkspaceEntity> | null;

  @WorkspaceJoinColumn('person')
  personId: string | null;

  @WorkspaceRelation({
    standardId: TASK_TARGET_STANDARD_FIELD_IDS.company,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Company',
    description: 'TaskTarget company',
    icon: 'IconBuildingSkyscraper',
    inverseSideTarget: () => CompanyWorkspaceEntity,
    inverseSideFieldKey: 'taskTargets',
  })
  @WorkspaceIsNullable()
  company: Relation<CompanyWorkspaceEntity> | null;

  @WorkspaceJoinColumn('company')
  companyId: string | null;

  @WorkspaceRelation({
    standardId: TASK_TARGET_STANDARD_FIELD_IDS.opportunity,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Opportunity',
    description: 'TaskTarget opportunity',
    icon: 'IconTargetArrow',
    inverseSideTarget: () => OpportunityWorkspaceEntity,
    inverseSideFieldKey: 'taskTargets',
  })
  @WorkspaceIsNullable()
  opportunity: Relation<OpportunityWorkspaceEntity> | null;

  @WorkspaceJoinColumn('opportunity')
  opportunityId: string | null;

  @WorkspaceDynamicRelation({
    type: RelationMetadataType.MANY_TO_ONE,
    argsFactory: (oppositeObjectMetadata) => ({
      standardId: TASK_TARGET_STANDARD_FIELD_IDS.custom,
      name: oppositeObjectMetadata.nameSingular,
      label: oppositeObjectMetadata.labelSingular,
      description: `TaskTarget ${oppositeObjectMetadata.labelSingular}`,
      joinColumn: `${oppositeObjectMetadata.nameSingular}Id`,
      icon: 'IconBuildingSkyscraper',
    }),
    inverseSideTarget: () => CustomWorkspaceEntity,
    inverseSideFieldKey: 'taskTargets',
  })
  custom: Relation<CustomWorkspaceEntity>;

  // Unsorted Item
  @WorkspaceRelation({
    standardId: TASK_TARGET_STANDARD_FIELD_IDS.unsortedItem,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Unsorted Item',
    description: 'TaskTarget unsorted item',
    icon: STANDARD_OBJECT_ICONS.unsortedItem,
    inverseSideTarget: () => UnsortedItemWorkspaceEntity,
    inverseSideFieldKey: 'taskTargets',
  })
  @WorkspaceIsNullable()
  unsortedItem: Relation<UnsortedItemWorkspaceEntity> | null;

  @WorkspaceJoinColumn('unsortedItem')
  unsortedItemId: string | null;
  // Preventive Care
  @WorkspaceRelation({
    standardId: TASK_TARGET_STANDARD_FIELD_IDS.preventiveCareItem,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Preventive Care',
    description: 'TaskTarget preventive care',
    icon: STANDARD_OBJECT_ICONS.preventiveCareItem,
    inverseSideTarget: () => PreventiveCareItemWorkspaceEntity,
    inverseSideFieldKey: 'taskTargets',
  })
  @WorkspaceIsNullable()
  preventiveCareItem: Relation<PreventiveCareItemWorkspaceEntity> | null;

  @WorkspaceJoinColumn('preventiveCareItem')
  preventiveCareItemId: string | null;
  // Restorative Dentistry
  @WorkspaceRelation({
    standardId: TASK_TARGET_STANDARD_FIELD_IDS.restorativeDentistryItem,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Restorative Dentistry',
    description: 'TaskTarget restorative dentistry',
    icon: STANDARD_OBJECT_ICONS.restorativeDentistryItem,
    inverseSideTarget: () => RestorativeDentistryItemWorkspaceEntity,
    inverseSideFieldKey: 'taskTargets',
  })
  @WorkspaceIsNullable()
  restorativeDentistryItem: Relation<RestorativeDentistryItemWorkspaceEntity> | null;

  @WorkspaceJoinColumn('restorativeDentistryItem')
  restorativeDentistryItemId: string | null;

  // Cosmetic Dentistry
  @WorkspaceRelation({
    standardId: TASK_TARGET_STANDARD_FIELD_IDS.cosmeticDentistryItem,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Cosmetic Dentistry',
    description: 'TaskTarget cosmetic dentistry',
    icon: STANDARD_OBJECT_ICONS.cosmeticDentistryItem,
    inverseSideTarget: () => CosmeticDentistryItemWorkspaceEntity,
    inverseSideFieldKey: 'taskTargets',
  })
  @WorkspaceIsNullable()
  cosmeticDentistryItem: Relation<CosmeticDentistryItemWorkspaceEntity> | null;

  @WorkspaceJoinColumn('cosmeticDentistryItem')
  cosmeticDentistryItemId: string | null;
  // Orthodontics
  @WorkspaceRelation({
    standardId: TASK_TARGET_STANDARD_FIELD_IDS.orthodonticsItem,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Orthodontics',
    description: 'TaskTarget orthodontics',
    icon: STANDARD_OBJECT_ICONS.orthodonticsItem,
    inverseSideTarget: () => OrthodonticsItemWorkspaceEntity,
    inverseSideFieldKey: 'taskTargets',
  })
  @WorkspaceIsNullable()
  orthodonticsItem: Relation<OrthodonticsItemWorkspaceEntity> | null;

  @WorkspaceJoinColumn('orthodonticsItem')
  orthodonticsItemId: string | null;
  // Emergency Care
  @WorkspaceRelation({
    standardId: TASK_TARGET_STANDARD_FIELD_IDS.emergencyCareItem,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Emergency Care',
    description: 'TaskTarget emergency care',
    icon: STANDARD_OBJECT_ICONS.emergencyCareItem,
    inverseSideTarget: () => EmergencyCareItemWorkspaceEntity,
    inverseSideFieldKey: 'taskTargets',
  })
  @WorkspaceIsNullable()
  emergencyCareItem: Relation<EmergencyCareItemWorkspaceEntity> | null;

  @WorkspaceJoinColumn('emergencyCareItem')
  emergencyCareItemId: string | null;
  // Spam
  @WorkspaceRelation({
    standardId: TASK_TARGET_STANDARD_FIELD_IDS.spamItem,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Spam Item',
    description: 'TaskTarget spam item',
    icon: STANDARD_OBJECT_ICONS.spamItem,
    inverseSideTarget: () => SpamItemWorkspaceEntity,
    inverseSideFieldKey: 'taskTargets',
  })
  @WorkspaceIsNullable()
  spamItem: Relation<SpamItemWorkspaceEntity> | null;

  @WorkspaceJoinColumn('spamItem')
  spamItemId: string | null;
}
