import { WorkflowIfElseActionSettings } from 'src/modules/workflow/workflow-executor/workflow-actions/if-else/types/workflow-if-else-action-settings.type';
import { WorkflowControlSettings } from 'src/modules/workflow/workflow-executor/workflow-actions/types/workflow-control-settings.type';

export enum WorkflowControlType {
  IFELSE = 'IFELSE',
}

type BaseWorkflowControl = {
  id: string;
  name: string;
  type: WorkflowControlType;
  settings: WorkflowControlSettings;
  valid: boolean;
};

export type WorkflowIfElseAction = BaseWorkflowControl & {
  type: WorkflowControlType.IFELSE;
  settings: WorkflowIfElseActionSettings;
};

export type WorkflowAction = WorkflowIfElseAction;
