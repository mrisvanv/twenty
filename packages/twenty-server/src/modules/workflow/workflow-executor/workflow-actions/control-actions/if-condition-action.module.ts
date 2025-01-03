import { Module } from '@nestjs/common';

import { ScopedWorkspaceContextFactory } from 'src/engine/twenty-orm/factories/scoped-workspace-context.factory';
import { IfConditionWorkflowAction } from 'src/modules/workflow/workflow-executor/workflow-actions/control-actions/if-condition.workflow-action';

@Module({
  imports: [],
  providers: [ScopedWorkspaceContextFactory, IfConditionWorkflowAction],
  exports: [IfConditionWorkflowAction],
})
export class IfConditionActionModule {}
