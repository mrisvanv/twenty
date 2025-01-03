import { WorkflowIfConditionActionInput } from 'src/modules/workflow/workflow-executor/workflow-actions/control-actions/types/workflow-if-condition-action-input.type';
import { BaseWorkflowActionSettings } from 'src/modules/workflow/workflow-executor/workflow-actions/types/workflow-action-settings.type';

export type WorkflowIfConditionActionSettings = BaseWorkflowActionSettings & {
  input: WorkflowIfConditionActionInput;
};
