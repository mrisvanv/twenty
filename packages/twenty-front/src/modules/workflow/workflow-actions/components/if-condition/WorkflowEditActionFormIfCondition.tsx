import { WorkflowEditGenericFormBase } from '@/workflow/components/WorkflowEditGenericFormBase';
import { WorkflowIfConditionAction } from '@/workflow/types/Workflow';
import IfConditionFieldStructure from '@/workflow/workflow-actions/components/if-condition/IfConditionFieldStructure';
import { useTheme } from '@emotion/react';
import { useState } from 'react';
import { IconCode } from 'twenty-ui';
import FieldValues from './FieldValues';

type WorkflowEditActionFormIfConditionProps = {
  action: WorkflowIfConditionAction;
  actionOptions:
    | {
        readonly: true;
      }
    | {
        readonly?: false;
        onActionUpdate: (action: WorkflowIfConditionAction) => void;
      };
};
const WorkflowEditActionFormIfCondition = ({
  action,
  actionOptions,
}: WorkflowEditActionFormIfConditionProps) => {
  const theme = useTheme();
  const [expression, setExpression] = useState(
    JSON.parse(action.settings.input.expression || '{}'),
  );

  const { onAddNew, onDelete, onChange } = FieldValues({
    action,
    actionOptions,
    expression,
    setExpression,
  });

  // Convert JSON expression to form map
  const jsonToFormMap = (json: Expression, path = '0'): FormMap => {
    const result: FormMap = {};

    if (json === null || json === undefined || Object.keys(json).length === 0) {
      return result;
    }
    // Handle logical operators (and/or)
    if ('and' in json || 'or' in json) {
      const operator = 'and' in json ? 'and' : 'or';
      result[`${path}.joiner`] = operator;

      const conditions = json[operator] as Expression[];
      conditions.forEach((condition, index) => {
        const childPath = `${path}-${index}`;
        Object.assign(result, jsonToFormMap(condition, childPath));
      });
    }
    // Handle comparison operators
    else {
      const [operator, values] = Object.entries(json)[0];
      const [field, value] = Object.entries<string>(values)[0];

      result[`${path}.operator`] = operator;
      result[`${path}.value1`] = field;
      result[`${path}.value2`] = value;
    }

    return result;
  };

  const generateStructureAndData = (
    json: Expression,
    path = '0',
  ): { formData: FormMap; structure: Structure } => {
    const formData: FormMap = {};
    const structure: Structure = {};

    if (json === null || json === undefined || Object.keys(json).length === 0) {
      return { formData, structure };
    }
    // Handle logical operators (and/or)
    if ('and' in json || 'or' in json) {
      const operator = 'and' in json ? 'and' : 'or';
      formData[`${path}-joiner`] = operator;
      structure[`${path}-joiner`] = [];
      const conditions = json[operator] as Expression[];
      conditions.forEach((condition, index) => {
        const childPath = `${path}-${index}`;
        const { formData: childFormData, structure: childStructure } =
          generateStructureAndData(condition, childPath);
        Object.assign(formData, childFormData);
        structure[`${path}-joiner`].push(childStructure);
      });
    }
    // Handle comparison operators
    else {
      const [operator, values] = Object.entries(json)[0];
      const [field, value] = Object.entries<string>(values)[0];

      formData[`${path}-operator`] = operator;
      formData[`${path}-value1`] = field;
      formData[`${path}-value2`] = value;

      // structure[`${path}.operator`] = {
      //   [`${path}.value1`]: `${path}.value2`,
      // };
      Object.assign(structure, {
        [`${path}-operator`]: {
          [`${path}-value1`]: `${path}-value2`,
        },
      });
    }

    return { formData, structure };
  };
  interface Condition {
    [key: string]: {
      [key: string]: string;
    };
  }

  interface LogicalExpression {
    and?: Condition[];
    or?: Condition[];
  }

  type Expression = LogicalExpression | Condition;

  interface FormMap {
    [key: string]: string;
  }

  interface StructureValue {
    [key: string]: string;
  }

  interface StructureOperator {
    [key: string]: StructureValue;
  }

  interface Structure {
    [key: string]: StructureOperator[] | Structure[];
  }

  // const formData = jsonToFormMap(expression);
  // const structure = generateStructure(formData);
  const { formData, structure } = generateStructureAndData(expression);
  return (
    <WorkflowEditGenericFormBase
      onTitleChange={(newName) => {
        if (actionOptions.readonly === true) return;
        actionOptions.onActionUpdate({ ...action, name: newName });
      }}
      Icon={IconCode}
      iconColor={theme.color.blue}
      initialTitle={action.name ?? 'If Condition'}
      headerType="If Condition"
    >
      <div>
        <IfConditionFieldStructure
          structure={structure}
          initialValue={formData}
          action={action}
          actionOptions={actionOptions}
          onAddNew={onAddNew}
          onDelete={onDelete}
        />
      </div>
    </WorkflowEditGenericFormBase>
  );
};

export default WorkflowEditActionFormIfCondition;
