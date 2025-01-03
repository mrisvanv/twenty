import { FormTextFieldInput } from '@/object-record/record-field/form-types/components/FormTextFieldInput';
import { Select } from '@/ui/input/components/Select';
import { WorkflowVariablePicker } from '@/workflow/components/WorkflowVariablePicker';
import { WorkflowIfConditionAction } from '@/workflow/types/Workflow';
import {
  joinerOptions,
  operationOptions,
} from '@/workflow/workflow-actions/components/if-condition/constants';
import {
  StyledBarWrapper,
  StyledBlockHeaddergWraper,
  StyledBlockWrapper,
  StyledConditionWrapper,
  StyledJoinerWrapper,
} from '@/workflow/workflow-actions/components/if-condition/styles';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, IconButton, IconPlus, IconTrash } from 'twenty-ui';
import { useDebouncedCallback } from 'use-debounce';
type IfConditionFieldStructureProps = {
  structure: Structure;
  initialValue: FormMap;
  action: WorkflowIfConditionAction;
  actionOptions:
    | {
        readonly: true;
      }
    | {
        readonly?: false;
        onActionUpdate: (action: WorkflowIfConditionAction) => void;
      };
  onAddNew: (path: number[], type: 'condition' | 'block') => void;
  onDelete: (path: number[]) => void;
};
const IfConditionFieldStructure = ({
  structure,
  initialValue,
  action,
  actionOptions,
  onAddNew,
  onDelete,
}: IfConditionFieldStructureProps) => {
  //   const theme = useTheme();

  // const [formMap, setFormMap] = useState<FormMap>(initialValue);
  const form = useForm({
    defaultValues: initialValue,
  });

  useEffect(() => {
    Object.entries<string>(initialValue).forEach(([key, value]) => {
      if (key.endsWith('-joiner') || key.endsWith('-operator')) {
        form.setValue(key, value);
      }
    });
  }, [form, initialValue]);

  // Create expression from structure and form data
  const createExpression = (
    structure: Structure,
    formData: FormMap,
  ): Expression => {
    const processNode = (node: Structure | StructureOperator): Expression => {
      const [[key, value]] = Object.entries(node);

      if (key.endsWith('-joiner')) {
        // Handle logical operators
        const joinerType = formData[key];
        const conditions = (value as Structure[]).map((condition) =>
          processNode(condition),
        );
        return { [joinerType]: conditions };
      }

      // Handle comparison operators
      const operator = formData[key];
      const [[value1Key, value2Key]] = Object.entries(value as StructureValue);
      return {
        [operator]: {
          [formData[value1Key]]: formData[value2Key],
        },
      };
    };

    return processNode(structure);
  };

  const saveAction = useDebouncedCallback(
    (formData: Record<string, string>) => {
      const newExpression = createExpression(structure, formData);
      if (actionOptions.readonly === true) {
        return;
      }
      // setFormMap(formData);
      actionOptions.onActionUpdate({
        ...action,
        settings: {
          ...action.settings,
          input: {
            expression: JSON.stringify(newExpression),
          },
        },
      });
    },
    1000,
  );

  useEffect(() => {
    return () => {
      saveAction.flush();
    };
  }, [saveAction]);

  const handleSave = () =>
    form.handleSubmit((formData: Record<string, string>) =>
      saveAction(formData),
    )();

  const AddButtonBar = ({ path }: { path: number[] }) => (
    <StyledBarWrapper>
      <Button
        title="Add Condition"
        variant="secondary"
        Icon={IconPlus}
        onClick={() => {
          onAddNew(path, 'condition');
        }}
      />
      <Button
        title="Add Block"
        variant="secondary"
        Icon={IconPlus}
        onClick={() => {
          onAddNew(path, 'block');
        }}
      />
    </StyledBarWrapper>
  );

  const SingleCondition = ({
    structure,
    path,
  }: {
    structure: StructureOperator;
    path: number[];
  }) => {
    if (
      structure === undefined ||
      structure === null ||
      Object.keys(structure).length === 0
    ) {
      return;
    }

    const keys = Object.keys(structure);

    if (keys.length !== 1) {
      return;
    }

    const operatorKey = keys[0];

    if (!operatorKey.endsWith('-operator')) {
      return;
    }

    const [value1Key, value2Key] = Object.entries<string>(
      structure[operatorKey],
    )[0];

    return (
      <StyledConditionWrapper>
        <Controller
          name={value1Key}
          control={form.control}
          render={({ field }) => (
            <FormTextFieldInput
              //   key={value1Key}
              placeholder="Enter value 1"
              //   readonly={actionOptions.readonly}
              defaultValue={field.value}
              onPersist={(value) => {
                if (value !== field.value) {
                  //   onChange(value, path, 'value1');
                  field.onChange(value);
                  handleSave();
                }
              }}
              VariablePicker={WorkflowVariablePicker}
            />
          )}
        />
        <Controller
          name={operatorKey}
          control={form.control}
          render={({ field }) => (
            <Select
              //   key={operatorKey}
              dropdownId={`${path.join('-')}-select-operation`}
              fullWidth
              value={field.value}
              options={operationOptions}
              onChange={(newOperator) => {
                if (newOperator !== field.value) {
                  //   onChange(newOperator || 'eq', path, 'operator');

                  field.onChange(newOperator);
                  handleSave();
                }
              }}
              //   disabled={actionOptions.readonly}
            />
          )}
        />
        <Controller
          name={value2Key}
          control={form.control}
          render={({ field }) => (
            <FormTextFieldInput
              //   key={`${path.join('.')}.value2`}
              placeholder="Enter value 2"
              //   readonly={actionOptions.readonly}
              defaultValue={field.value}
              onPersist={(value) => {
                if (value !== field.value) {
                  //   onChange(value, path, 'value2');

                  field.onChange(value);
                  handleSave();
                }
              }}
              VariablePicker={WorkflowVariablePicker}
            />
          )}
        />
        <IconButton
          Icon={IconTrash}
          variant="tertiary"
          onClick={() => {
            onDelete(path);
          }}
        />
      </StyledConditionWrapper>
    );
  };

  const Block = ({
    structure,
    path,
  }: {
    structure: Structure | StructureOperator;
    path: number[];
  }) => {
    if (
      structure === undefined ||
      structure === null ||
      Object.keys(structure).length === 0
    ) {
      return;
    }
    const keys = Object.keys(structure);

    if (keys.length !== 1) {
      throw new Error('Expression must contain exactly one operator.');
    }

    const key = keys[0] as string;

    if (!key.endsWith('-joiner')) {
      return (
        <SingleCondition
          structure={structure as StructureOperator}
          path={[...path]}
        />
      );
    }

    const subStructure = structure[key];
    return (
      <StyledBlockWrapper>
        <StyledBlockHeaddergWraper>
          <StyledJoinerWrapper>
            <Controller
              name={key}
              control={form.control}
              render={({ field }) => (
                <Select
                  //   key={`${path.join('.')}.joiner`}
                  dropdownId={`${path.join('-')}-select-joiner`}
                  fullWidth={false}
                  value={field.value}
                  options={joinerOptions}
                  onChange={(joiner) => {
                    field.onChange(joiner || 'and');
                    handleSave();
                  }}
                  //   disabled={actionOptions.readonly}
                />
              )}
            />
          </StyledJoinerWrapper>
          <IconButton
            Icon={IconTrash}
            variant="tertiary"
            onClick={() => {
              onDelete(path);
            }}
          />
        </StyledBlockHeaddergWraper>
        {subStructure !== undefined &&
          subStructure !== null &&
          subStructure.map((struct: any, index: number) => (
            <Block key={index} structure={struct} path={[...path, index]} />
          ))}
        <AddButtonBar path={path} />
      </StyledBlockWrapper>
    );
  };

  return (
    <>
      {!(
        structure === undefined ||
        structure === null ||
        Object.keys(structure).length === 0
      ) ? (
        <Block structure={structure} path={[0]} />
      ) : (
        <AddButtonBar path={[]} />
      )}
    </>
  );
};

export default IfConditionFieldStructure;
