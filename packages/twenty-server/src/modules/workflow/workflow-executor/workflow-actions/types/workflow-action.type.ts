import { WorkflowCodeActionSettings } from 'src/modules/workflow/workflow-executor/workflow-actions/code/types/workflow-code-action-settings.type';
import { WorkflowIfConditionActionSettings } from 'src/modules/workflow/workflow-executor/workflow-actions/control-actions/types/workflow-if-condition-action-settings.type';
import { WorkflowSendEmailActionSettings } from 'src/modules/workflow/workflow-executor/workflow-actions/mail-sender/types/workflow-send-email-action-settings.type';
import {
  WorkflowCreateRecordActionSettings,
  WorkflowDeleteRecordActionSettings,
  WorkflowFindRecordsActionSettings,
  WorkflowUpdateRecordActionSettings,
} from 'src/modules/workflow/workflow-executor/workflow-actions/record-crud/types/workflow-record-crud-action-settings.type';
import { WorkflowActionSettings } from 'src/modules/workflow/workflow-executor/workflow-actions/types/workflow-action-settings.type';

export enum WorkflowActionType {
  CODE = 'CODE',
  SEND_EMAIL = 'SEND_EMAIL',
  IF_CONDITION = 'IF_CONDITION',
  CREATE_RECORD = 'CREATE_RECORD',
  UPDATE_RECORD = 'UPDATE_RECORD',
  DELETE_RECORD = 'DELETE_RECORD',
  FIND_RECORDS = 'FIND_RECORDS',
}

type BaseWorkflowAction = {
  id: string;
  name: string;
  type: WorkflowActionType;
  settings: WorkflowActionSettings;
  valid: boolean;
};

export type WorkflowCodeAction = BaseWorkflowAction & {
  type: WorkflowActionType.CODE;
  settings: WorkflowCodeActionSettings;
};

export type WorkflowSendEmailAction = BaseWorkflowAction & {
  type: WorkflowActionType.SEND_EMAIL;
  settings: WorkflowSendEmailActionSettings;
};

export type WorkflowIfConditionAction = BaseWorkflowAction & {
  type: WorkflowActionType.IF_CONDITION;
  settings: WorkflowIfConditionActionSettings;
};

export type WorkflowCreateRecordAction = BaseWorkflowAction & {
  type: WorkflowActionType.CREATE_RECORD;
  settings: WorkflowCreateRecordActionSettings;
};

export type WorkflowUpdateRecordAction = BaseWorkflowAction & {
  type: WorkflowActionType.UPDATE_RECORD;
  settings: WorkflowUpdateRecordActionSettings;
};

export type WorkflowDeleteRecordAction = BaseWorkflowAction & {
  type: WorkflowActionType.DELETE_RECORD;
  settings: WorkflowDeleteRecordActionSettings;
};

export type WorkflowFindRecordsAction = BaseWorkflowAction & {
  type: WorkflowActionType.FIND_RECORDS;
  settings: WorkflowFindRecordsActionSettings;
};

export type WorkflowAction =
  | WorkflowCodeAction
  | WorkflowSendEmailAction
  | WorkflowIfConditionAction
  | WorkflowCreateRecordAction
  | WorkflowUpdateRecordAction
  | WorkflowDeleteRecordAction
  | WorkflowFindRecordsAction;
