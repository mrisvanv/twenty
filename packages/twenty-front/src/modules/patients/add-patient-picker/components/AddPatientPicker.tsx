import { AddPatientPickerFooter } from '@/patients/add-patient-picker/components/AddPatientPickerFooter';
import { AddPatientPickerList } from '@/patients/add-patient-picker/components/AddPatientPickerList';
import { AddPatientPickerSearchInput } from '@/patients/add-patient-picker/components/AddPatientPickerSearchInput';
import { DropdownMenu } from '@/ui/layout/dropdown/components/DropdownMenu';
import { DropdownMenuItemsContainer } from '@/ui/layout/dropdown/components/DropdownMenuItemsContainer';
import { DropdownMenuSeparator } from '@/ui/layout/dropdown/components/DropdownMenuSeparator';

import { Patient } from '~/generated/graphql';

type AddPatientPickerProps = {
  onSelect?: (patient: Patient) => void;
  onSearchPatient: (searchQuery: string) => void;
  isSearchPatientLoading: boolean;
  patients: Patient[];
  onAddPatient: () => Promise<void>;
  isAddPatientLoading: boolean;
};

// const NO_PATIENT_ID = 'no-patient';

export const AddPatientPicker = ({
  onSelect,
  onSearchPatient,
  isSearchPatientLoading,
  patients,
  onAddPatient,
  isAddPatientLoading,
}: AddPatientPickerProps) => {
  return (
    <DropdownMenu data-select-disable>
      <AddPatientPickerSearchInput onSearchPatient={onSearchPatient} />
      <DropdownMenuSeparator />
      <DropdownMenuItemsContainer hasMaxHeight>
        <AddPatientPickerList
          patients={patients}
          onClick={onSelect}
          isLoading={isSearchPatientLoading}
        />
      </DropdownMenuItemsContainer>
      <AddPatientPickerFooter
        onAddPatient={onAddPatient}
        isAddPatientLoading={isAddPatientLoading}
      />
    </DropdownMenu>
  );
};
