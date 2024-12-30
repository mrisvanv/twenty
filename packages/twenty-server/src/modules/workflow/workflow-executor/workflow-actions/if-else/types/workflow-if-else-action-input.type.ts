import { WorkflowAction } from 'src/modules/workflow/workflow-executor/interfaces/workflow-action.interface';

export type WorkflowIfElseActionInput = {
  conditions: [];
  trueActions: WorkflowAction[];
  falseActions: WorkflowAction[];
};
