import { WorkflowDiagramStepNodeData } from '@/workflow/types/WorkflowDiagram';
import styled from '@emotion/styled';
import { Handle, Position } from '@xyflow/react';
import React from 'react';
import { isDefined, OverflowingTextWithTooltip } from 'twenty-ui';
import { capitalize } from '~/utils/string/capitalize';

type Variant = 'placeholder';

const StyledStepNodeContainer = styled.div`
  display: flex;
  flex-direction: column;
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

const StyledStepNodeInnerContainer = styled.div<{ variant?: Variant }>`
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

const StyledStepNodeLabel = styled.div<{ variant?: Variant }>`
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

const StyledSourceHandle = styled(Handle)`
  background-color: ${({ theme }) => theme.color.gray50};
`;

const StyledSourceHandlesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  /* gap: 100px; */
  padding: 0 ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

const StyledPortContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const StyledPortLabel = styled.div`
  color: ${({ theme }) => theme.font.color.light};
  font-size: ${({ theme }) => theme.font.size.sm};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  text-align: center;
`;

export const StyledTargetHandle = styled(Handle)`
  visibility: hidden;
`;

const StyledRightFloatingElementContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: ${({ theme }) => theme.spacing(-3)};
  bottom: 0;
  top: 0;
  transform: translateX(100%);
`;

export const WorkflowDiagramBaseStepNode = ({
  nodeType,
  name,
  variant,
  Icon,
  RightFloatingElement,
  outputPortCount = 1,
  outputPortLabels,
}: {
  nodeType: WorkflowDiagramStepNodeData['nodeType'];
  name: string;
  variant?: Variant;
  Icon?: React.ReactNode;
  RightFloatingElement?: React.ReactNode;
  outputPortCount?: number;
  outputPortLabels?: string[];
}) => {
  const getPortLabel = (index: number) => {
    return outputPortLabels?.[index] ?? '';
  };

  const renderSourceHandles = () => {
    const handles = [];
    for (let i = 0; i < outputPortCount; i++) {
      handles.push(
        <StyledPortContainer key={i}>
          {outputPortCount > 1 && (
            <StyledPortLabel>{getPortLabel(i)}</StyledPortLabel>
          )}
          <StyledSourceHandle
            type="source"
            position={Position.Bottom}
            id={`output-${i}`}
          />
        </StyledPortContainer>,
      );
    }
    return handles;
  };

  return (
    <StyledStepNodeContainer>
      {nodeType !== 'trigger' && (
        <StyledTargetHandle type="target" position={Position.Top} />
      )}

      <StyledStepNodeType>{capitalize(nodeType)}</StyledStepNodeType>

      <StyledStepNodeInnerContainer variant={variant}>
        <StyledStepNodeLabel variant={variant}>
          {Icon}
          <OverflowingTextWithTooltip text={name} />
        </StyledStepNodeLabel>

        {isDefined(RightFloatingElement) && (
          <StyledRightFloatingElementContainer>
            {RightFloatingElement}
          </StyledRightFloatingElementContainer>
        )}
      </StyledStepNodeInnerContainer>

      <StyledSourceHandlesContainer>
        {renderSourceHandles()}
      </StyledSourceHandlesContainer>
    </StyledStepNodeContainer>
  );
};
