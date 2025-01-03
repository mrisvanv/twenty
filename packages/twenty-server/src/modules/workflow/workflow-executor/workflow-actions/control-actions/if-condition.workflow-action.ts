import { Injectable, Logger } from '@nestjs/common';

import { WorkflowAction } from 'src/modules/workflow/workflow-executor/interfaces/workflow-action.interface';

import { WorkflowIfConditionActionInput } from 'src/modules/workflow/workflow-executor/workflow-actions/control-actions/types/workflow-if-condition-action-input.type';
import { WorkflowActionResult } from 'src/modules/workflow/workflow-executor/workflow-actions/types/workflow-action-result.type';

export type WorkflowIfConditionStepOutputSchema = {
  success: boolean;
  exit?: boolean;
};

@Injectable()
export class IfConditionWorkflowAction implements WorkflowAction {
  private readonly logger = new Logger(IfConditionWorkflowAction.name);
  constructor() {} // private readonly twentyORMGlobalManager: TwentyORMGlobalManager, // private readonly scopedWorkspaceContextFactory: ScopedWorkspaceContextFactory, // private readonly gmailClientProvider: GmailClientProvider,

  private async getEmailClient(connectedAccountId: string) {
    // const { workspaceId } = this.scopedWorkspaceContextFactory.create();
    // if (!workspaceId) {
    //   throw new WorkflowStepExecutorException(
    //     'Scoped workspace not found',
    //     WorkflowStepExecutorExceptionCode.SCOPED_WORKSPACE_NOT_FOUND,
    //   );
    // }
    // const connectedAccountRepository =
    //   await this.twentyORMGlobalManager.getRepositoryForWorkspace<ConnectedAccountWorkspaceEntity>(
    //     workspaceId,
    //     'connectedAccount',
    //   );
    // const connectedAccount = await connectedAccountRepository.findOneBy({
    //   id: connectedAccountId,
    // });
    // if (!isDefined(connectedAccount)) {
    //   throw new SendEmailActionException(
    //     `Connected Account '${connectedAccountId}' not found`,
    //     SendEmailActionExceptionCode.CONNECTED_ACCOUNT_NOT_FOUND,
    //   );
    // }
    // switch (connectedAccount.provider) {
    //   case 'google':
    //     return await this.gmailClientProvider.getGmailClient(connectedAccount);
    //   default:
    //     throw new SendEmailActionException(
    //       `Provider ${connectedAccount.provider} is not supported`,
    //       SendEmailActionExceptionCode.PROVIDER_NOT_SUPPORTED,
    //     );
    // }
  }

  async execute(
    workflowActionInput: WorkflowIfConditionActionInput,
  ): Promise<WorkflowActionResult> {
    // const emailProvider = await this.getEmailClient(
    //   workflowActionInput.connectedAccountId,
    // );
    // const { email, body, subject } = workflowActionInput;

    // try {
    //   const emailSchema = z.string().trim().email('Invalid email');

    //   const result = emailSchema.safeParse(email);

    //   if (!result.success) {
    //     this.logger.warn(`Email '${email}' invalid`);

    //     return { result: { success: false } };
    //   }

    //   const window = new JSDOM('').window;
    //   const purify = DOMPurify(window);
    //   const safeBody = purify.sanitize(body || '');
    //   const safeSubject = purify.sanitize(subject || '');

    //   const message = [
    //     `To: ${email}`,
    //     `Subject: ${safeSubject || ''}`,
    //     'MIME-Version: 1.0',
    //     'Content-Type: text/plain; charset="UTF-8"',
    //     '',
    //     safeBody,
    //   ].join('\n');

    //   const encodedMessage = Buffer.from(message).toString('base64');

    //   await emailProvider.users.messages.send({
    //     userId: 'me',
    //     requestBody: {
    //       raw: encodedMessage,
    //     },
    //   });

    //   this.logger.log(`Email sent successfully`);

    return {
      result: {
        success: false,
        exit: true,
      } satisfies WorkflowIfConditionStepOutputSchema,
    };
    // } catch (error) {
    //   return { error };
    // }
  }
}