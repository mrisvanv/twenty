import { OutputSchema } from 'src/modules/workflow/workflow-builder/types/output-schema.type';
import { WorkflowIfElseActionSettings } from 'src/modules/workflow/workflow-executor/workflow-actions/if-else/types/workflow-if-else-action-settings.type';
export type BaseWorkflowControlSettings = {
  input: object;
  outputSchema: OutputSchema;
  errorHandlingOptions: {
    retryOnFailure: {
      value: boolean;
    };
    continueOnFailure: {
      value: boolean;
    };
  };
};

export type WorkflowControlSettings = WorkflowIfElseActionSettings;
