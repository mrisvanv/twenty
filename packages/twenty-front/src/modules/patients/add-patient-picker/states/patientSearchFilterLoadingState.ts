// import { AddPatientPickerInstanceContext } from '@/patients/add-patient-picker/states/context/AddPatientPickerInstanceContext';
// import { createComponentStateV2 } from '@/ui/utilities/state/component-state/utils/createComponentStateV2';

// export const patientSearchFilterComponentState = createComponentStateV2<string>(
//   {
//     key: 'patientSearchFilterComponentState',
//     defaultValue: '',
//     componentInstanceContext: AddPatientPickerInstanceContext,
//   },
// );

import { AddPatientPickerInstanceContext } from '@/patients/add-patient-picker/states/context/AddPatientPickerInstanceContext';
import { createComponentStateV2 } from '@/ui/utilities/state/component-state/utils/createComponentStateV2';

export const patientSearchFilterLoadingState = createComponentStateV2<boolean>({
  key: 'patientSearchFilterLoadingState',
  defaultValue: false,
  componentInstanceContext: AddPatientPickerInstanceContext,
});
