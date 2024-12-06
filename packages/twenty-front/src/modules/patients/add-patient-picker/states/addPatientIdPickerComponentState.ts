import { AddPatientPickerInstanceContext } from '@/patient/add-patient-picker/states/context/AddPatientPickerInstanceContext';
import { createComponentStateV2 } from '@/ui/utilities/state/component-state/utils/createComponentStateV2';

export const addPatientIdPickerComponentState = createComponentStateV2<
  string[]
>({
  key: 'addPatientIdPickerComponentState',
  defaultValue: [],
  componentInstanceContext: AddPatientPickerInstanceContext,
});
