import { Relation } from 'src/engine/workspace-manager/workspace-sync-metadata/interfaces/relation.interface';

import { FieldMetadataType } from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';
import { RelationMetadataType } from 'src/engine/metadata-modules/relation-metadata/relation-metadata.entity';
import { BaseWorkspaceEntity } from 'src/engine/twenty-orm/base.workspace-entity';
import { CustomWorkspaceEntity } from 'src/engine/twenty-orm/custom.workspace-entity';
import { WorkspaceDynamicRelation } from 'src/engine/twenty-orm/decorators/workspace-dynamic-relation.decorator';
import { WorkspaceEntity } from 'src/engine/twenty-orm/decorators/workspace-entity.decorator';
import { WorkspaceField } from 'src/engine/twenty-orm/decorators/workspace-field.decorator';
import { WorkspaceIsNotAuditLogged } from 'src/engine/twenty-orm/decorators/workspace-is-not-audit-logged.decorator';
import { WorkspaceIsNullable } from 'src/engine/twenty-orm/decorators/workspace-is-nullable.decorator';
import { WorkspaceIsSystem } from 'src/engine/twenty-orm/decorators/workspace-is-system.decorator';
import { WorkspaceJoinColumn } from 'src/engine/twenty-orm/decorators/workspace-join-column.decorator';
import { WorkspaceRelation } from 'src/engine/twenty-orm/decorators/workspace-relation.decorator';
import { ATTACHMENT_STANDARD_FIELD_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
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
import { WorkspaceMemberWorkspaceEntity } from 'src/modules/workspace-member/standard-objects/workspace-member.workspace-entity';

@WorkspaceEntity({
  standardId: STANDARD_OBJECT_IDS.attachment,
  namePlural: 'attachments',
  labelSingular: 'Attachment',
  labelPlural: 'Attachments',
  description: 'An attachment',
  icon: STANDARD_OBJECT_ICONS.attachment,
  labelIdentifierStandardId: ATTACHMENT_STANDARD_FIELD_IDS.name,
})
@WorkspaceIsSystem()
@WorkspaceIsNotAuditLogged()
export class AttachmentWorkspaceEntity extends BaseWorkspaceEntity {
  @WorkspaceField({
    standardId: ATTACHMENT_STANDARD_FIELD_IDS.name,
    type: FieldMetadataType.TEXT,
    label: 'Name',
    description: 'Attachment name',
    icon: 'IconFileUpload',
  })
  name: string;

  @WorkspaceField({
    standardId: ATTACHMENT_STANDARD_FIELD_IDS.fullPath,
    type: FieldMetadataType.TEXT,
    label: 'Full path',
    description: 'Attachment full path',
    icon: 'IconLink',
  })
  fullPath: string;

  @WorkspaceField({
    standardId: ATTACHMENT_STANDARD_FIELD_IDS.type,
    type: FieldMetadataType.TEXT,
    label: 'Type',
    description: 'Attachment type',
    icon: 'IconList',
  })
  type: string;

  @WorkspaceRelation({
    standardId: ATTACHMENT_STANDARD_FIELD_IDS.author,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Author',
    description: 'Attachment author',
    icon: 'IconCircleUser',
    inverseSideTarget: () => WorkspaceMemberWorkspaceEntity,
    inverseSideFieldKey: 'authoredAttachments',
  })
  author: Relation<WorkspaceMemberWorkspaceEntity>;

  @WorkspaceJoinColumn('author')
  authorId: string;

  @WorkspaceRelation({
    standardId: ATTACHMENT_STANDARD_FIELD_IDS.task,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Task',
    description: 'Attachment task',
    icon: 'IconNotes',
    inverseSideTarget: () => TaskWorkspaceEntity,
    inverseSideFieldKey: 'attachments',
  })
  @WorkspaceIsNullable()
  task: Relation<TaskWorkspaceEntity> | null;

  @WorkspaceJoinColumn('task')
  taskId: string | null;

  @WorkspaceRelation({
    standardId: ATTACHMENT_STANDARD_FIELD_IDS.note,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Note',
    description: 'Attachment note',
    icon: 'IconNotes',
    inverseSideTarget: () => NoteWorkspaceEntity,
    inverseSideFieldKey: 'attachments',
  })
  @WorkspaceIsNullable()
  note: Relation<NoteWorkspaceEntity> | null;

  @WorkspaceJoinColumn('note')
  noteId: string | null;

  @WorkspaceRelation({
    standardId: ATTACHMENT_STANDARD_FIELD_IDS.person,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Person',
    description: 'Attachment person',
    icon: 'IconUser',
    inverseSideTarget: () => PersonWorkspaceEntity,
    inverseSideFieldKey: 'attachments',
  })
  @WorkspaceIsNullable()
  person: Relation<PersonWorkspaceEntity> | null;

  @WorkspaceJoinColumn('person')
  personId: string | null;

  @WorkspaceRelation({
    standardId: ATTACHMENT_STANDARD_FIELD_IDS.company,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Company',
    description: 'Attachment company',
    icon: 'IconBuildingSkyscraper',
    inverseSideTarget: () => CompanyWorkspaceEntity,
    inverseSideFieldKey: 'attachments',
  })
  @WorkspaceIsNullable()
  company: Relation<CompanyWorkspaceEntity> | null;

  @WorkspaceJoinColumn('company')
  companyId: string | null;

  @WorkspaceRelation({
    standardId: ATTACHMENT_STANDARD_FIELD_IDS.opportunity,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Opportunity',
    description: 'Attachment opportunity',
    icon: 'IconBuildingSkyscraper',
    inverseSideTarget: () => OpportunityWorkspaceEntity,
    inverseSideFieldKey: 'attachments',
  })
  @WorkspaceIsNullable()
  opportunity: Relation<OpportunityWorkspaceEntity> | null;

  @WorkspaceJoinColumn('opportunity')
  opportunityId: string | null;

  @WorkspaceDynamicRelation({
    type: RelationMetadataType.MANY_TO_ONE,
    argsFactory: (oppositeObjectMetadata) => ({
      standardId: ATTACHMENT_STANDARD_FIELD_IDS.custom,
      name: oppositeObjectMetadata.nameSingular,
      label: oppositeObjectMetadata.labelSingular,
      description: `Attachment ${oppositeObjectMetadata.labelSingular}`,
      joinColumn: `${oppositeObjectMetadata.nameSingular}Id`,
      icon: 'IconBuildingSkyscraper',
    }),
    inverseSideTarget: () => CustomWorkspaceEntity,
    inverseSideFieldKey: 'attachments',
  })
  custom: Relation<CustomWorkspaceEntity>;

  // UnsortedItem
  @WorkspaceRelation({
    standardId: ATTACHMENT_STANDARD_FIELD_IDS.unsortedItem,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Unsorted Item',
    description: 'Unsorted Item',
    icon: STANDARD_OBJECT_ICONS.unsortedItem,
    inverseSideTarget: () => UnsortedItemWorkspaceEntity,
    inverseSideFieldKey: 'attachments',
  })
  @WorkspaceIsNullable()
  unsortedItem: Relation<UnsortedItemWorkspaceEntity> | null;

  @WorkspaceJoinColumn('unsortedItem')
  unsortedItemId: string | null;
  // Preventive Care
  @WorkspaceRelation({
    standardId: ATTACHMENT_STANDARD_FIELD_IDS.preventiveCareItem,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Preventive Care',
    description: 'Preventive Care',
    icon: STANDARD_OBJECT_ICONS.preventiveCareItem,
    inverseSideTarget: () => PreventiveCareItemWorkspaceEntity,
    inverseSideFieldKey: 'attachments',
  })
  @WorkspaceIsNullable()
  preventiveCareItem: Relation<PreventiveCareItemWorkspaceEntity> | null;

  @WorkspaceJoinColumn('preventiveCareItem')
  preventiveCareItemId: string | null;
  // Restorative Dentistry
  @WorkspaceRelation({
    standardId: ATTACHMENT_STANDARD_FIELD_IDS.restorativeDentistryItem,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Restorative Dentistry',
    description: 'Restorative Dentistry',
    icon: STANDARD_OBJECT_ICONS.restorativeDentistryItem,
    inverseSideTarget: () => RestorativeDentistryItemWorkspaceEntity,
    inverseSideFieldKey: 'attachments',
  })
  @WorkspaceIsNullable()
  restorativeDentistryItem: Relation<RestorativeDentistryItemWorkspaceEntity> | null;

  @WorkspaceJoinColumn('restorativeDentistryItem')
  restorativeDentistryItemId: string | null;
  // Cosmetic Dentistry
  @WorkspaceRelation({
    standardId: ATTACHMENT_STANDARD_FIELD_IDS.cosmeticDentistryItem,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Cosmetic Dentistry',
    description: 'Cosmetic Dentistry',
    icon: STANDARD_OBJECT_ICONS.cosmeticDentistryItem,
    inverseSideTarget: () => CosmeticDentistryItemWorkspaceEntity,
    inverseSideFieldKey: 'attachments',
  })
  @WorkspaceIsNullable()
  cosmeticDentistryItem: Relation<CosmeticDentistryItemWorkspaceEntity> | null;

  @WorkspaceJoinColumn('cosmeticDentistryItem')
  cosmeticDentistryItemId: string | null;
  // Orthodontics
  @WorkspaceRelation({
    standardId: ATTACHMENT_STANDARD_FIELD_IDS.orthodonticsItem,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Orthodontics',
    description: 'Orthodontics',
    icon: STANDARD_OBJECT_ICONS.orthodonticsItem,
    inverseSideTarget: () => OrthodonticsItemWorkspaceEntity,
    inverseSideFieldKey: 'attachments',
  })
  @WorkspaceIsNullable()
  orthodonticsItem: Relation<OrthodonticsItemWorkspaceEntity> | null;

  @WorkspaceJoinColumn('orthodonticsItem')
  orthodonticsItemId: string | null;
  // Emergency Care
  @WorkspaceRelation({
    standardId: ATTACHMENT_STANDARD_FIELD_IDS.emergencyCareItem,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Emergency Care',
    description: 'Emergency Care',
    icon: STANDARD_OBJECT_ICONS.emergencyCareItem,
    inverseSideTarget: () => EmergencyCareItemWorkspaceEntity,
    inverseSideFieldKey: 'attachments',
  })
  @WorkspaceIsNullable()
  emergencyCareItem: Relation<EmergencyCareItemWorkspaceEntity> | null;

  @WorkspaceJoinColumn('emergencyCareItem')
  emergencyCareItemId: string | null;
  // Spam
  @WorkspaceRelation({
    standardId: ATTACHMENT_STANDARD_FIELD_IDS.spamItem,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Spam',
    description: 'Spam',
    icon: STANDARD_OBJECT_ICONS.spamItem,
    inverseSideTarget: () => SpamItemWorkspaceEntity,
    inverseSideFieldKey: 'attachments',
  })
  @WorkspaceIsNullable()
  spamItem: Relation<SpamItemWorkspaceEntity> | null;

  @WorkspaceJoinColumn('spamItem')
  spamItemId: string | null;
}
