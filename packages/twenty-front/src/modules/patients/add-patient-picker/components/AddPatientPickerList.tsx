import { ADD_PATIENT_PICKER_DROPDOWN_ID } from '@/patients/add-patient-picker/constants/AddPatientPickerDropdownId';
import { useDropdown } from '@/ui/layout/dropdown/hooks/useDropdown';
import styled from '@emotion/styled';
import { MenuItem, MenuItemSelectAvatar } from 'twenty-ui';
import { Patient } from '~/generated/graphql';

const StyledItemsContainer = styled.div`
  width: 100%;
`;

type AddPatientPickerListProps = {
  patients: Patient[];
  isLoading?: boolean;
  onClick?: (patient: Patient) => void;
};

export const NO_PATIENT_ID = 'no-patient';

export const AddPatientPickerList = ({
  patients,
  isLoading,
  onClick,
}: AddPatientPickerListProps) => {
  const { closeDropdown } = useDropdown(ADD_PATIENT_PICKER_DROPDOWN_ID);
  const onClickHandler = (patient: Patient) => {
    onClick?.(patient);
    closeDropdown();
  };
  return (
    <StyledItemsContainer>
      {isLoading ? (
        <MenuItem text="Loading..." />
      ) : patients.length > 0 ? (
        patients.map((patient) => (
          <MenuItemSelectAvatar
            key={`menu-${patient.patientId}`}
            onClick={() => onClickHandler?.(patient)}
            selected={false}
            text={`${patient.firstName} ${patient.lastName}`}
            // className="no-patient-menu-item-multi-select"
          />
        ))
      ) : (
        <MenuItem text="No patients found" />
      )}
    </StyledItemsContainer>
  );
};
