import { ObjectRecord } from '@/object-record/types/ObjectRecord';
import { useRecoilCallback } from 'recoil';
import { isDefined } from 'twenty-ui';
import { Patient } from '~/generated/graphql';

type useAddPatientPickerProps = {
  record?: ObjectRecord;
  objectNameSingular: string;
};

type useAddPatientPickerReturnType = {
  patients: Patient[];
  // togglePatientSelection: (patientId: string) => Promise<void>;
};

export const useAddPatientPicker = ({
  record,
  objectNameSingular,
}: useAddPatientPickerProps): useAddPatientPickerReturnType => {
  // const patientPickerMultiSelectCheckedState =
  //   useRecoilComponentCallbackStateV2(patientPickerCheckedComponentState);

  // const { sortedPatients: patients } = usePatients();
  // const { createPatient } = useCreatePatient();
  // const { deletePatient } = useDeletePatient();

  // const patientsList = useRecoilComponentValueV2(patientsComponentSelector);

  const togglePatientSelection = useRecoilCallback(
    ({ snapshot, set }) =>
      async (patientId: string) => {
        const targetId = record?.id;
        const targetObject = record;

        if (!isDefined(targetObject) || !isDefined(targetId)) {
          throw new Error('Target object or ID is not defined');
        }

        // const isChecked = snapshot.getLoadable(
        //   patientPickerMultiSelectCheckedState(patientId),
        // );

        // if (isChecked) {
        //   await deletePatient(targetId, patientId);
        // } else {
        //   await createPatient(targetId, patientId);
        // }

        // set(patientPickerMultiSelectCheckedState(patientId), !isChecked);
      },
    [],
  );

  return {
    patients: [],
    // patients: patientsList,
    // togglePatientSelection,
  };
};
