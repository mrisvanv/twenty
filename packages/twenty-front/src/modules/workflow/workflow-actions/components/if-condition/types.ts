// Types for the expression structure
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
