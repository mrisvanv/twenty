import { WorkflowDiagramStepNodeData } from '@/workflow/types/WorkflowDiagram';
import styled from '@emotion/styled';
import { Handle, Position } from '@xyflow/react';
import React from 'react';
import { OverflowingTextWithTooltip } from 'twenty-ui';
import { capitalize } from '~/utils/string/capitalize';

// Two Output Base Node
const StyledBaseContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledStepNodeContainer = styled.div`
  padding-bottom: 12px;
  padding-top: 6px;
`;

const StyledStepNodeType = styled.div`
  background-color: ${({ theme }) => theme.background.tertiary};
  border-radius: ${({ theme }) => theme.border.radius.sm}
    ${({ theme }) => theme.border.radius.sm} 0 0;
  color: ${({ theme }) => theme.color.gray50};
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  margin-left: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  align-self: flex-start;

  .selectable.selected &,
  .selectable:focus &,
  .selectable:focus-visible & {
    background-color: ${({ theme }) => theme.color.blue};
    color: ${({ theme }) => theme.font.color.inverted};
  }
`;

const StyledStepNodeInnerContainer = styled.div<{ variant?: 'placeholder' }>`
  background-color: ${({ theme }) => theme.background.secondary};
  border: 1px solid ${({ theme }) => theme.border.color.medium};
  border-style: ${({ variant }) =>
    variant === 'placeholder' ? 'dashed' : null};
  border-radius: ${({ theme }) => theme.border.radius.md};
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(2)};
  position: relative;
  box-shadow: ${({ variant, theme }) =>
    variant === 'placeholder' ? 'none' : theme.boxShadow.superHeavy};

  .selectable.selected &,
  .selectable:focus &,
  .selectable:focus-visible & {
    background-color: ${({ theme }) => theme.color.blue10};
    border-color: ${({ theme }) => theme.color.blue};
  }
`;

const StyledStepNodeLabel = styled.div<{ variant?: 'placeholder' }>`
  align-items: center;
  display: flex;
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  column-gap: ${({ theme }) => theme.spacing(3)};
  color: ${({ variant, theme }) =>
    variant === 'placeholder'
      ? theme.font.color.extraLight
      : theme.font.color.primary};
  max-width: 200px;
`;

const StyledBranchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing(2)};
  gap: ${({ theme }) => theme.spacing(4)};
`;

const StyledBranchLabel = styled.div`
  color: ${({ theme }) => theme.font.color.light};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  text-align: center;
`;

const StyledTargetHandle = styled(Handle)`
  visibility: hidden;
`;

const StyledSourceHandle = styled(Handle)`
  background-color: ${({ theme }) => theme.color.gray50};
  &.left-branch {
    left: 25%;
  }
  &.right-branch {
    left: 75%;
  }
`;

type WorkflowDiagramTwoOutputBaseNodeProps = {
  nodeType: WorkflowDiagramStepNodeData['nodeType'];
  name: string;
  variant?: 'placeholder';
  Icon?: React.ReactNode;
  leftBranchLabel: string;
  rightBranchLabel: string;
};

export const WorkflowDiagramTwoOutputBaseNode = ({
  nodeType,
  name,
  variant,
  Icon,
  leftBranchLabel,
  rightBranchLabel,
}: WorkflowDiagramTwoOutputBaseNodeProps) => (
  <StyledBaseContainer>
    <StyledStepNodeContainer>
      <StyledTargetHandle type="target" position={Position.Top} />
      <StyledStepNodeType>{capitalize(nodeType)}</StyledStepNodeType>
      <StyledStepNodeInnerContainer variant={variant}>
        <StyledStepNodeLabel variant={variant}>
          {Icon}
          <OverflowingTextWithTooltip text={name} />
        </StyledStepNodeLabel>
      </StyledStepNodeInnerContainer>
    </StyledStepNodeContainer>

    <StyledBranchContainer>
      <div>
        <StyledBranchLabel>{leftBranchLabel}</StyledBranchLabel>
        <StyledSourceHandle
          type="source"
          position={Position.Bottom}
          className="left-branch"
          id="left"
        />
      </div>
      <div>
        <StyledBranchLabel>{rightBranchLabel}</StyledBranchLabel>
        <StyledSourceHandle
          type="source"
          position={Position.Bottom}
          className="right-branch"
          id="right"
        />
      </div>
    </StyledBranchContainer>
  </StyledBaseContainer>
);
