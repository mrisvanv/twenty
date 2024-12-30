import {
  WorkflowDiagram,
  WorkflowDiagramEdge,
  WorkflowDiagramNode,
} from '@/workflow/types/WorkflowDiagram';
import { MarkerType } from '@xyflow/react';
import { v4 } from 'uuid';

export const addCreateStepNodes = ({ nodes, edges }: WorkflowDiagram) => {
  const nodesWithoutTargets = nodes.filter((node) =>
    edges.every((edge) => edge.source !== node.id),
  );

  const updatedNodes: Array<WorkflowDiagramNode> = nodes.slice();
  const updatedEdges: Array<WorkflowDiagramEdge> = edges.slice();

  for (const node of nodesWithoutTargets) {
    if (node.data.nodeType === 'action' && node.data.actionType === 'IFELSE') {
      ['true', 'false'].forEach((branch) => {
        const newCreateStepNode: WorkflowDiagramNode = {
          id: `${node.id}-${branch}__create-step`,
          type: 'create-step',
          data: {
            nodeType: 'create-step',
            parentNodeId: `${node.id}-${branch}`,
          },
          position: { x: node.position.x, y: node.position.y + 150 },
        };

        updatedNodes.push(newCreateStepNode);

        updatedEdges.push({
          id: v4(),
          source: `${node.id}-${branch}`,
          target: newCreateStepNode.id,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
          deletable: false,
        });
      });
    } else {
      const newCreateStepNode: WorkflowDiagramNode = {
        id: `${node.id}__create-step`,
        type: 'create-step',
        data: {
          nodeType: 'create-step',
          parentNodeId: node.id,
        },
        position: { x: node.position.x, y: node.position.y + 150 },
      };

      updatedNodes.push(newCreateStepNode);

      updatedEdges.push({
        id: v4(),
        source: node.id,
        target: newCreateStepNode.id,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
        deletable: false,
      });
    }
  }

  return {
    nodes: updatedNodes,
    edges: updatedEdges,
  };
};
