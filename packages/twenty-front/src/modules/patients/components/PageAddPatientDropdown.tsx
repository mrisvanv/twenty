import { currentWorkspaceState } from '@/auth/states/currentWorkspaceState';
import { ObjectRecord } from '@/object-record/types/ObjectRecord';
import { AddPatientPicker } from '@/patients/add-patient-picker/components/AddPatientPicker';
import { AddPatientPickerComponentInstanceContext } from '@/patients/add-patient-picker/scopes/AddPatientPickerScope';
import { useAddPatientDropdown } from '@/patients/hooks/useAddPatientDropdown';
import { Dropdown } from '@/ui/layout/dropdown/components/Dropdown';
import { useDropdown } from '@/ui/layout/dropdown/hooks/useDropdown';
import { DropdownScope } from '@/ui/layout/dropdown/scopes/DropdownScope';
import { useRecoilValue } from 'recoil';
import { Button, IconUserPlus } from 'twenty-ui';

type PageAddPatientDropdownProps = {
  dropdownId: string;
  record?: ObjectRecord;
  objectNameSingular: string;
};

export const PageAddPatientDropdown = ({
  dropdownId,
  record,
  objectNameSingular,
}: PageAddPatientDropdownProps) => {
  const { closeDropdown } = useDropdown(dropdownId);
  const currentWorkspace = useRecoilValue(currentWorkspaceState);
  const workspaceId = currentWorkspace?.id;

  const {
    onSearchPatient,
    onAddPatient,
    isSearchPatientLoading,
    isAddPatientLoading,
    patients,
  } = useAddPatientDropdown({
    record,
    workspaceId,
    objectNameSingular,
  });

  return (
    <AddPatientPickerComponentInstanceContext addPatientScopeId={dropdownId}>
      <DropdownScope dropdownScopeId={dropdownId}>
        <Dropdown
          dropdownId={dropdownId}
          dropdownPlacement="bottom-start"
          clickableComponent={
            <Button
              key="add"
              title="Add Patient"
              variant="secondary"
              Icon={IconUserPlus}
            />
          }
          dropdownComponents={
            <>
              <AddPatientPicker
                onSubmit={closeDropdown}
                onSearchPatient={onSearchPatient}
                isSearchPatientLoading={isSearchPatientLoading}
                patients={patients}
                onAddPatient={onAddPatient}
                isAddPatientLoading={isAddPatientLoading}
              />
            </>
          }
          dropdownHotkeyScope={{
            scope: dropdownId,
          }}
        />
      </DropdownScope>
    </AddPatientPickerComponentInstanceContext>
  );
};
