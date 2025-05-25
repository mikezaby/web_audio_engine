import { NumberProp, PropDefinition, StringProp } from "@blibliki/engine";
import { Label } from "@radix-ui/react-label";
import { ChangeEvent } from "react";
import { Input } from "@/components/ui";
import { cn } from "@/lib/utils";

type FieldProps<T extends string | number | boolean | Array<string | number>> =
  {
    name: string;
    value?: T;
    schema: PropDefinition<T>;
    onChange: (value: T) => void;
    className?: string;
  };

type InputProps<T extends string | number> = FieldProps<T> & {
  schema: NumberProp | StringProp;
};

export const InputField = <T extends string | number>({
  name,
  value,
  schema,
  onChange,
  className,
}: InputProps<T>) => {
  const label = schema.label ?? name;
  const inputType = schema.kind === "string" ? "text" : "number";

  const internalOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue =
      schema.kind === "string"
        ? event.target.value
        : Number(event.target.value);

    onChange(newValue as T);
  };

  return (
    <div className={cn("flex flex-col justify-center items-center", className)}>
      <Label>{label}</Label>
      <Input type={inputType} value={value} onChange={internalOnChange} />
    </div>
  );
};
