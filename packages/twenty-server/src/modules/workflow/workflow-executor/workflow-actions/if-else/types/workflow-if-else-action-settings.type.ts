import { WorkflowIfElseActionInput } from 'src/modules/workflow/workflow-executor/workflow-actions/if-else/types/workflow-if-else-action-input.type';
import { BaseWorkflowActionSettings } from 'src/modules/workflow/workflow-executor/workflow-actions/types/workflow-action-settings.type';

export type WorkflowIfElseActionSettings = BaseWorkflowActionSettings & {
  input: WorkflowIfElseActionInput;
};
