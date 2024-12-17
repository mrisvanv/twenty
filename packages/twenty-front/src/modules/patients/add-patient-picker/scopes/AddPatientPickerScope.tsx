import { AddPatientPickerInstanceContext } from '@/patients/add-patient-picker/states/context/AddPatientPickerInstanceContext';
import { ReactNode } from 'react';

type AddPatientPickerComponentInstanceContextProps = {
  children: ReactNode;
  addPatientScopeId: string;
};

export const AddPatientPickerComponentInstanceContext = ({
  children,
  addPatientScopeId,
}: AddPatientPickerComponentInstanceContextProps) => {
  return (
    <AddPatientPickerInstanceContext.Provider
      value={{ instanceId: addPatientScopeId }}
    >
      {children}
    </AddPatientPickerInstanceContext.Provider>
  );
};
