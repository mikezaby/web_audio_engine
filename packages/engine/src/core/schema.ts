type BasePropType = {
  label?: string;
  description?: string;
};

type NumberProp = BasePropType & {
  kind: "number";
  min?: number;
  max?: number;
  step?: number;
};

type EnumProp<T extends string | number> = BasePropType & {
  kind: "enum";
  options: T[];
};

type StringProp = BasePropType & {
  kind: "string";
  pattern?: RegExp;
};

type BooleanProp = BasePropType & {
  kind: "boolean";
};

type PropDefinition<T> = T extends number
  ? NumberProp | EnumProp<number>
  : T extends boolean
    ? BooleanProp
    : T extends string
      ? StringProp | EnumProp<string>
      : never;

export type PropSchema<T extends Record<string, string | number | boolean>> = {
  [K in keyof T]: PropDefinition<T[K]>;
};
