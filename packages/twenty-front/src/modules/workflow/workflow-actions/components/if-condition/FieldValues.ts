import { useDebouncedCallback } from 'use-debounce';

const FieldValues = ({ action, actionOptions, expression, setExpression }) => {
  const saveAction = useDebouncedCallback((newExpression) => {
    if (actionOptions.readonly === true) return;
    actionOptions.onActionUpdate({
      ...action,
      settings: {
        ...action.settings,
        input: { expression: JSON.stringify(newExpression) },
      },
    });
  }, 1000);

  const updateExpression = (newExpression) => {
    setExpression(newExpression);
    saveAction(newExpression);
  };

  const onAddNew = (path, type) => {
    const newExpression = { ...expression };
    let expressionToAdd = { eq: { '': '' } };
    if (type === 'block') expressionToAdd = { and: [] };

    if (path.length === 0) {
      updateExpression(expressionToAdd);
      return;
    }

    let current = newExpression;
    let lastIndex = -1;

    for (let i = 1; i < path.length; i++) {
      const index = path[i];
      const key = Object.keys(current)[0];
      if (key in current) current = current[key][index];
      lastIndex = index;
    }

    const currentKey = Object.keys(current)[0];
    if (currentKey in current) current[currentKey].push(expressionToAdd);

    updateExpression(newExpression);
  };

  const onDelete = (path) => {
    const newExpression = { ...expression };
    if (path.length <= 1) {
      updateExpression({});
      return;
    }

    let current = newExpression;
    let parent = null;
    let lastIndex = -1;

    for (let i = 1; i < path.length; i++) {
      const index = path[i];
      const key = Object.keys(current)[0];
      parent = current;
      if (key in current) current = current[key][index];
      lastIndex = index;
    }

    if (!parent) return;
    const parentKey = Object.keys(parent)[0];
    if (parentKey in parent) parent[parentKey].splice(lastIndex, 1);

    updateExpression(newExpression);
  };

  const onChange = (value, path, field) => {
    const newExpression = { base: [{ ...expression }] };

    if (path.length === 0) return;

    let current = newExpression;
    let parent = {};
    let lastIndex = -1;

    for (let i = 0; i < path.length; i++) {
      const index = path[i];
      const key = Object.keys(current)[0];
      parent = current;
      if (key in current) current = current[key][index];
      lastIndex = index;
    }

    if (field === 'joiner') {
      const currentKey = Object.keys(current)[0];
      if (value === currentKey) return;
      const children = current[currentKey];
      delete current[currentKey];
      current[value] = children;
    } else {
      if (!parent) return;
      const parentKey = Object.keys(parent)[0];
      if (parentKey in parent) {
        const operator = Object.keys(current)[0];
        const [key, val] = Object.entries(current[operator])[0] || ['', ''];

        if (field === 'operator') {
          const newOp = value || 'eq';
          if (newOp === operator) return;
          const oldValue = current[operator];
          delete current[operator];
          current[newOp] = oldValue;
        } else if (field === 'value1') {
          if (value === key) return;
          current[operator] = { [value || '']: val };
        } else if (field === 'value2') {
          if (value === val) return;
          current[operator] = { [key]: value || '' };
        }
      }
    }
    updateExpression(newExpression.base[0]);
  };

  return { onAddNew, onDelete, onChange };
};

export default FieldValues;
