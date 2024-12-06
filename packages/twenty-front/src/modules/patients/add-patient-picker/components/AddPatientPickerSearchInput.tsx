import { patientSearchFilterComponentState } from '@/patients/add-patient-picker/states/patientSearchFilterComponentState';
import { DropdownMenuSearchInput } from '@/ui/layout/dropdown/components/DropdownMenuSearchInput';
import { useRecoilComponentStateV2 } from '@/ui/utilities/state/component-state/hooks/useRecoilComponentStateV2';

export const AddPatientPickerSearchInput = ({
  onSearchPatient,
}: {
  onSearchPatient: (searchQuery: string) => void;
}) => {
  const [patientSearchFilter, setPatientSearchFilter] =
    useRecoilComponentStateV2(patientSearchFilterComponentState);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPatientSearchFilter(event.currentTarget.value);
    onSearchPatient(event.currentTarget.value);
  };

  return (
    <DropdownMenuSearchInput
      value={patientSearchFilter}
      onChange={handleFilterChange}
      autoFocus
    />
  );
};
