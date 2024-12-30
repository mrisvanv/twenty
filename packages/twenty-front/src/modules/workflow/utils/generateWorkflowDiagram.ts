import { TRIGGER_STEP_ID } from '@/workflow/constants/TriggerStepId';
import { WorkflowStep, WorkflowTrigger } from '@/workflow/types/Workflow';
import {
  WorkflowDiagram,
  WorkflowDiagramEdge,
  WorkflowDiagramNode,
} from '@/workflow/types/WorkflowDiagram';
import { assertUnreachable } from '@/workflow/utils/assertUnreachable';
import { splitWorkflowTriggerEventName } from '@/workflow/utils/splitWorkflowTriggerEventName';
import { MarkerType } from '@xyflow/react';
import { isDefined } from 'twenty-ui';
import { v4 } from 'uuid';
import { capitalize } from '~/utils/string/capitalize';

export const generateWorkflowDiagram = ({
  trigger,
  steps,
}: {
  trigger: WorkflowTrigger | undefined;
  steps: Array<WorkflowStep>;
}): WorkflowDiagram => {
  const nodes: Array<WorkflowDiagramNode> = [];
  const edges: Array<WorkflowDiagramEdge> = [];

  const processNode = (
    step: WorkflowStep,
    parentNodeId: string,
    xPos: number,
    yPos: number,
  ) => {
    const nodeId = step.id;
    nodes.push({
      id: nodeId,
      data: {
        nodeType: 'action',
        actionType: step.type,
        name: step.name,
      },
      position: {
        x: xPos,
        y: yPos,
      },
    });

    edges.push({
      id: v4(),
      source: parentNodeId,
      target: nodeId,
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
      deletable: false,
      selectable: false,
    });

    // if (step.type === 'IFELSE') {
    //   edges.push({
    //     id: v4(),
    //     source: nodeId,
    //     target: `${nodeId}-true`,
    //     sourceHandle: 'output-0',
    //     markerEnd: {
    //       type: MarkerType.ArrowClosed,
    //     },
    //     deletable: false,
    //     selectable: false,
    //   });

    //   edges.push({
    //     id: v4(),
    //     source: nodeId,
    //     target: `${nodeId}-false`,
    //     sourceHandle: 'output-1',
    //     markerEnd: {
    //       type: MarkerType.ArrowClosed,
    //     },
    //     deletable: false,
    //     selectable: false,
    //   });
    // }

    return nodeId;
  };

  const triggerNodeId = TRIGGER_STEP_ID;

  if (isDefined(trigger)) {
    let triggerLabel: string;

    switch (trigger.type) {
      case 'MANUAL': {
        triggerLabel = 'Manual Trigger';
        break;
      }
      case 'DATABASE_EVENT': {
        const triggerEvent = splitWorkflowTriggerEventName(
          trigger.settings.eventName,
        );
        triggerLabel = `${capitalize(triggerEvent.objectType)} is ${capitalize(triggerEvent.event)}`;
        break;
      }
      default: {
        return assertUnreachable(
          trigger,
          `Expected the trigger "${JSON.stringify(trigger)}" to be supported.`,
        );
      }
    }

    nodes.push({
      id: triggerNodeId,
      data: {
        nodeType: 'trigger',
        triggerType: trigger.type,
        name: isDefined(trigger.name) ? trigger.name : triggerLabel,
      },
      position: {
        x: 0,
        y: 0,
      },
    });
  } else {
    nodes.push({
      id: triggerNodeId,
      type: 'empty-trigger',
      data: {} as any,
      position: {
        x: 0,
        y: 0,
      },
    });
  }

  let lastStepIds = [triggerNodeId];

  for (const step of steps) {
    const newStepIds = [];

    for (const lastStepId of lastStepIds) {
      const newStepId = processNode(step, lastStepId, 150, 100);
      if (step.type === 'IFELSE') {
        newStepIds.push(`${newStepId}-true`, `${newStepId}-false`);
      } else {
        newStepIds.push(newStepId);
      }
    }

    lastStepIds = newStepIds;
  }

  return {
    nodes,
    edges,
  };
};
