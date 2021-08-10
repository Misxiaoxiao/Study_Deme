export type Column = {
  label: string;
  prop: string;
  width?: string | number;
  formatter?: (row: any, column: any, value: string | number) => string | undefined;
  [k: string]: any;
}

export type Action = 'add' | 'edit' | 'delete'
