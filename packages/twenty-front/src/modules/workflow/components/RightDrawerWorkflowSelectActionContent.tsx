import { ACTIONS } from '@/workflow/constants/Actions';
import { useCreateStep } from '@/workflow/hooks/useCreateStep';
import { WorkflowWithCurrentVersion } from '@/workflow/types/Workflow';
import styled from '@emotion/styled';
import { MenuItem } from 'twenty-ui';

const StyledActionListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;

  padding-block: ${({ theme }) => theme.spacing(1)};
  padding-inline: ${({ theme }) => theme.spacing(2)};
`;

const StyledLabel = styled.span`
  color: ${({ theme }) => theme.font.color.light};
  display: block;
  font-size: ${({ theme }) => theme.font.size.xs};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  margin-top: ${({ theme }) => theme.spacing(5)};
`;

export const RightDrawerWorkflowSelectActionContent = ({
  workflow,
}: {
  workflow: WorkflowWithCurrentVersion;
}) => {
  const { createStep } = useCreateStep({
    workflow,
  });

  return (
    <>
      <StyledActionListContainer>
        <StyledLabel>Actions</StyledLabel>
        {ACTIONS.filter(
          (action) =>
            action.category === undefined || action.category === 'action',
        ).map((action) => (
          <MenuItem
            key={action.type}
            LeftIcon={action.icon}
            text={action.label}
            onClick={() => {
              return createStep(action.type);
            }}
          />
        ))}
        <StyledLabel>Controls</StyledLabel>
        {ACTIONS.filter((action) => action.category === 'control').map(
          (control) => (
            <MenuItem
              key={control.type}
              LeftIcon={control.icon}
              text={control.label}
              onClick={() => {
                return createStep(control.type);
              }}
            />
          ),
        )}
      </StyledActionListContainer>
    </>
  );
};
