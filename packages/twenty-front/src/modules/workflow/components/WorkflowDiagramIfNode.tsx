import { WorkflowDiagramTwoOutputBaseNode } from '@/workflow/components/WorkflowDiagramTwoOutputBaseNode';
import styled from '@emotion/styled';
import { Handle } from '@xyflow/react';
import React from 'react';

const StyledIfNodeContainer = styled.div`
  display: flex;
  flex-direction: column;
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
`;

const StyledBranchHandle = styled(Handle)`
  background-color: ${({ theme }) => theme.color.gray50};
  &.true-branch {
    left: 25%;
  }
  &.false-branch {
    left: 75%;
  }
`;

type IfNodeProps = {
  nodeType: 'if';
  name: string;
  conditions?: Array<{
    field: string;
    operator: string;
    value: string;
  }>;
  Icon?: React.ReactNode;
  RightFloatingElement?: React.ReactNode;
};

// If/Else Node Implementation
export const WorkflowDiagramIfNode = ({
  name,
  variant,
  Icon,
}: {
  name: string;
  variant?: 'placeholder';
  Icon?: React.ReactNode;
}) => (
  <WorkflowDiagramTwoOutputBaseNode
    nodeType="action"
    name={name}
    variant={variant}
    Icon={Icon}
    leftBranchLabel="If True"
    rightBranchLabel="If False"
  />
);

// Add condition display component
const StyledConditionContainer = styled.div`
  background-color: ${({ theme }) => theme.background.tertiary};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(1)};
  font-size: ${({ theme }) => theme.font.size.sm};
`;

type ConditionDisplayProps = {
  conditions: Array<{
    field: string;
    operator: string;
    value: string;
  }>;
};

const ConditionDisplay = ({ conditions }: ConditionDisplayProps) => (
  <StyledConditionContainer>
    {conditions.map((condition, index) => (
      <div key={index}>
        {condition.field} {condition.operator} {condition.value}
      </div>
    ))}
  </StyledConditionContainer>
);
