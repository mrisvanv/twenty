import { Module } from '@nestjs/common';

import { ScopedWorkspaceContextFactory } from 'src/engine/twenty-orm/factories/scoped-workspace-context.factory';
import { WorkflowCommonModule } from 'src/modules/workflow/common/workflow-common.module';
import { WorkflowActionFactory } from 'src/modules/workflow/workflow-executor/factories/workflow-action.factory';
import { CodeActionModule } from 'src/modules/workflow/workflow-executor/workflow-actions/code/code-action.module';
import { IfConditionActionModule } from 'src/modules/workflow/workflow-executor/workflow-actions/control-actions/if-condition-action.module';
import { SendEmailActionModule } from 'src/modules/workflow/workflow-executor/workflow-actions/mail-sender/send-email-action.module';
import { RecordCRUDActionModule } from 'src/modules/workflow/workflow-executor/workflow-actions/record-crud/record-crud-action.module';
import { WorkflowExecutorWorkspaceService } from 'src/modules/workflow/workflow-executor/workspace-services/workflow-executor.workspace-service';

@Module({
  imports: [
    WorkflowCommonModule,
    CodeActionModule,
    SendEmailActionModule,
    IfConditionActionModule,
    RecordCRUDActionModule,
  ],
  providers: [
    WorkflowExecutorWorkspaceService,
    ScopedWorkspaceContextFactory,
    WorkflowActionFactory,
  ],
  exports: [WorkflowExecutorWorkspaceService],
})
export class WorkflowExecutorModule {}
