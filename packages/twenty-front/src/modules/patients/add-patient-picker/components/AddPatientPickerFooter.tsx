import { ADD_PATIENT_PICKER_DROPDOWN_ID } from '@/patients/add-patient-picker/constants/AddPatientPickerDropdownId';
import { DropdownMenuItemsContainer } from '@/ui/layout/dropdown/components/DropdownMenuItemsContainer';
import { useDropdown } from '@/ui/layout/dropdown/hooks/useDropdown';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { IconPlus, MenuItem } from 'twenty-ui';

const StyledFooter = styled.div`
  background: ${({ theme }) => theme.background.primary};
  border-bottom-left-radius: ${({ theme }) => theme.border.radius.md};
  border-bottom-right-radius: ${({ theme }) => theme.border.radius.md};
  border-top: 1px solid ${({ theme }) => theme.border.color.light};
`;

export const AddPatientPickerFooter = ({
  onAddPatient,
  isAddPatientLoading,
}: {
  onAddPatient: () => Promise<void>;
  isAddPatientLoading: boolean;
}) => {
  const theme = useTheme();
  const { closeDropdown } = useDropdown(ADD_PATIENT_PICKER_DROPDOWN_ID);

  const onClick = async () => {
    await onAddPatient();
    closeDropdown();
  };

  return (
    <StyledFooter>
      <DropdownMenuItemsContainer>
        {isAddPatientLoading ? (
          <MenuItem
            className="adding-patient"
            // onClick={onClick}
            text="Adding..."
          />
        ) : (
          <MenuItem
            className="add-patient"
            onClick={onClick}
            text="Add patient"
            LeftIcon={() => <IconPlus size={theme.icon.size.md} />}
          />
        )}
      </DropdownMenuItemsContainer>
    </StyledFooter>
  );
};
