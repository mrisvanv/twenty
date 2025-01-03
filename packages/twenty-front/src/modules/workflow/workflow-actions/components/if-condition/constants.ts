const JOINER = ['and', 'or'];
const OPERATORS = [
  'eq',
  'ne',
  'gt',
  'lt',
  'gte',
  'lte',
  'startsWith',
  'endsWith',
  'regex',
  'length',
  'isNull',
  'isNotNull',
  'isUndefined',
  'isDefined',
];

const joinerOptions = [
  { label: 'And', value: 'and' },
  { label: 'Or', value: 'or' },
];

const operationOptions = [
  { label: 'Equal', value: 'eq' },
  { label: 'Not Equal', value: 'ne' },
  { label: 'Greater Than', value: 'gt' },
  { label: 'Less Than', value: 'lt' },
  { label: 'Greater Than or Equal', value: 'gte' },
  { label: 'Less Than or Equal', value: 'lte' },
  { label: 'Starts With', value: 'startsWith' },
  { label: 'Ends With', value: 'endsWith' },
  { label: 'Regex', value: 'regex' },
  { label: 'Length', value: 'length' },
  { label: 'Is Null', value: 'isNull' },
  { label: 'Is Not Null', value: 'isNotNull' },
  { label: 'Is Undefined', value: 'isUndefined' },
  { label: 'Is Defined', value: 'isDefined' },
];

export { JOINER, joinerOptions, operationOptions, OPERATORS };

