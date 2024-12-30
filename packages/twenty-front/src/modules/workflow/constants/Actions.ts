import { WorkflowStepType } from '@/workflow/types/Workflow';
import {
  IconAddressBook,
  IconComponent,
  IconSettingsAutomation,
} from 'twenty-ui';

export const ACTIONS: Array<{
  label: string;
  type: WorkflowStepType;
  icon: IconComponent;
  category?: string;
}> = [
  {
    label: 'Serverless Function',
    type: 'CODE',
    icon: IconSettingsAutomation,
  },
  {
    label: 'Send Email',
    type: 'SEND_EMAIL',
    icon: IconSettingsAutomation,
  },
  {
    label: 'If Else',
    type: 'IFELSE',
    icon: IconSettingsAutomation,
    category: 'control',
  },
  {
    label: 'Create Record',
    type: 'CREATE_RECORD',
    icon: IconAddressBook,
  },
  {
    label: 'Update Record',
    type: 'UPDATE_RECORD',
    icon: IconAddressBook,
  },
  {
    label: 'Delete Record',
    type: 'DELETE_RECORD',
    icon: IconAddressBook,
  },
];
