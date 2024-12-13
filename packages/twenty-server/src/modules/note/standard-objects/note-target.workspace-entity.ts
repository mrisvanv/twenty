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
import { NOTE_TARGET_STANDARD_FIELD_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
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

@WorkspaceEntity({
  standardId: STANDARD_OBJECT_IDS.noteTarget,
  namePlural: 'noteTargets',
  labelSingular: 'Note Target',
  labelPlural: 'Note Targets',
  description: 'A note target',
  icon: STANDARD_OBJECT_ICONS.noteTarget,
})
@WorkspaceIsSystem()
export class NoteTargetWorkspaceEntity extends BaseWorkspaceEntity {
  @WorkspaceRelation({
    standardId: NOTE_TARGET_STANDARD_FIELD_IDS.note,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Note',
    description: 'NoteTarget note',
    icon: 'IconNotes',
    inverseSideTarget: () => NoteWorkspaceEntity,
    inverseSideFieldKey: 'noteTargets',
  })
  @WorkspaceIsNullable()
  note: Relation<NoteWorkspaceEntity> | null;

  @WorkspaceJoinColumn('note')
  noteId: string | null;

  @WorkspaceRelation({
    standardId: NOTE_TARGET_STANDARD_FIELD_IDS.person,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Person',
    description: 'NoteTarget person',
    icon: 'IconUser',
    inverseSideTarget: () => PersonWorkspaceEntity,
    inverseSideFieldKey: 'noteTargets',
  })
  @WorkspaceIsNullable()
  person: Relation<PersonWorkspaceEntity> | null;

  @WorkspaceJoinColumn('person')
  personId: string | null;

  @WorkspaceRelation({
    standardId: NOTE_TARGET_STANDARD_FIELD_IDS.company,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Company',
    description: 'NoteTarget company',
    icon: 'IconBuildingSkyscraper',
    inverseSideTarget: () => CompanyWorkspaceEntity,
    inverseSideFieldKey: 'noteTargets',
  })
  @WorkspaceIsNullable()
  company: Relation<CompanyWorkspaceEntity> | null;

  @WorkspaceJoinColumn('company')
  companyId: string | null;

  @WorkspaceRelation({
    standardId: NOTE_TARGET_STANDARD_FIELD_IDS.opportunity,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Opportunity',
    description: 'NoteTarget opportunity',
    icon: 'IconTargetArrow',
    inverseSideTarget: () => OpportunityWorkspaceEntity,
    inverseSideFieldKey: 'noteTargets',
  })
  @WorkspaceIsNullable()
  opportunity: Relation<OpportunityWorkspaceEntity> | null;

  @WorkspaceJoinColumn('opportunity')
  opportunityId: string | null;

  @WorkspaceDynamicRelation({
    type: RelationMetadataType.MANY_TO_ONE,
    argsFactory: (oppositeObjectMetadata) => ({
      standardId: NOTE_TARGET_STANDARD_FIELD_IDS.custom,
      name: oppositeObjectMetadata.nameSingular,
      label: oppositeObjectMetadata.labelSingular,
      description: `NoteTarget ${oppositeObjectMetadata.labelSingular}`,
      joinColumn: `${oppositeObjectMetadata.nameSingular}Id`,
      icon: 'IconBuildingSkyscraper',
    }),
    inverseSideTarget: () => CustomWorkspaceEntity,
    inverseSideFieldKey: 'noteTargets',
  })
  custom: Relation<CustomWorkspaceEntity>;

  // UnsortedItem
  @WorkspaceRelation({
    standardId: NOTE_TARGET_STANDARD_FIELD_IDS.unsortedItem,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Unsorted Item',
    description: 'Unsorted Item',
    icon: STANDARD_OBJECT_ICONS.unsortedItem,
    inverseSideTarget: () => UnsortedItemWorkspaceEntity,
    inverseSideFieldKey: 'noteTargets',
  })
  @WorkspaceIsNullable()
  unsortedItem: Relation<UnsortedItemWorkspaceEntity> | null;

  @WorkspaceJoinColumn('unsortedItem')
  unsortedItemId: string | null;
  // Preventive Care
  @WorkspaceRelation({
    standardId: NOTE_TARGET_STANDARD_FIELD_IDS.preventiveCareItem,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Preventive Care',
    description: 'Preventive Care',
    icon: STANDARD_OBJECT_ICONS.preventiveCareItem,
    inverseSideTarget: () => PreventiveCareItemWorkspaceEntity,
    inverseSideFieldKey: 'noteTargets',
  })
  @WorkspaceIsNullable()
  preventiveCareItem: Relation<PreventiveCareItemWorkspaceEntity> | null;

  @WorkspaceJoinColumn('preventiveCareItem')
  preventiveCareItemId: string | null;
  // Restorative Dentistry
  @WorkspaceRelation({
    standardId: NOTE_TARGET_STANDARD_FIELD_IDS.restorativeDentistryItem,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Restorative Dentistry',
    description: 'Restorative Dentistry',
    icon: STANDARD_OBJECT_ICONS.restorativeDentistryItem,
    inverseSideTarget: () => RestorativeDentistryItemWorkspaceEntity,
    inverseSideFieldKey: 'noteTargets',
  })
  @WorkspaceIsNullable()
  restorativeDentistryItem: Relation<RestorativeDentistryItemWorkspaceEntity> | null;

  @WorkspaceJoinColumn('restorativeDentistryItem')
  restorativeDentistryItemId: string | null;
  // Cosmetic Dentistry
  @WorkspaceRelation({
    standardId: NOTE_TARGET_STANDARD_FIELD_IDS.cosmeticDentistryItem,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Cosmetic Dentistry',
    description: 'Cosmetic Dentistry',
    icon: STANDARD_OBJECT_ICONS.cosmeticDentistryItem,
    inverseSideTarget: () => CosmeticDentistryItemWorkspaceEntity,
    inverseSideFieldKey: 'noteTargets',
  })
  @WorkspaceIsNullable()
  cosmeticDentistryItem: Relation<CosmeticDentistryItemWorkspaceEntity> | null;

  @WorkspaceJoinColumn('cosmeticDentistryItem')
  cosmeticDentistryItemId: string | null;
  // Orthodontics
  @WorkspaceRelation({
    standardId: NOTE_TARGET_STANDARD_FIELD_IDS.orthodonticsItem,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Orthodontics',
    description: 'Orthodontics',
    icon: STANDARD_OBJECT_ICONS.orthodonticsItem,
    inverseSideTarget: () => OrthodonticsItemWorkspaceEntity,
    inverseSideFieldKey: 'noteTargets',
  })
  @WorkspaceIsNullable()
  orthodonticsItem: Relation<OrthodonticsItemWorkspaceEntity> | null;

  @WorkspaceJoinColumn('orthodonticsItem')
  orthodonticsItemId: string | null;
  // Emergency Care
  @WorkspaceRelation({
    standardId: NOTE_TARGET_STANDARD_FIELD_IDS.emergencyCareItem,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Emergency Care',
    description: 'Emergency Care',
    icon: STANDARD_OBJECT_ICONS.emergencyCareItem,
    inverseSideTarget: () => EmergencyCareItemWorkspaceEntity,
    inverseSideFieldKey: 'noteTargets',
  })
  @WorkspaceIsNullable()
  emergencyCareItem: Relation<EmergencyCareItemWorkspaceEntity> | null;

  @WorkspaceJoinColumn('emergencyCareItem')
  emergencyCareItemId: string | null;
  // Spam
  @WorkspaceRelation({
    standardId: NOTE_TARGET_STANDARD_FIELD_IDS.spamItem,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Spam Item',
    description: 'Spam Item',
    icon: STANDARD_OBJECT_ICONS.spamItem,
    inverseSideTarget: () => SpamItemWorkspaceEntity,
    inverseSideFieldKey: 'noteTargets',
  })
  @WorkspaceIsNullable()
  spamItem: Relation<SpamItemWorkspaceEntity> | null;

  @WorkspaceJoinColumn('spamItem')
  spamItemId: string | null;
}
