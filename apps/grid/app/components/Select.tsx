import { useMemo } from "react";
import {
  Select as SelectUI,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";

type TOption = string[] | number[] | TDefOption[] | TIDOption[];

type TDefOption = { name: string; value: string | number };
type TIDOption = { id: string; name: string };

interface SelectProps {
  value: string | number | undefined;
  options: TOption;
  label?: string;
  className?: string;
  onChange: (value: string) => void;
}

export default function Select(props: SelectProps) {
  const { value, options, label, onChange, className = "" } = props;

  const opts: TDefOption[] = useMemo(() => {
    if (!options.length) return options as TDefOption[];

    if (options[0] instanceof Object) {
      if ("value" in options[0]) return options as TDefOption[];

      return (options as TIDOption[]).map((opt) => ({
        name: opt.name,
        value: opt.id,
      }));
    } else {
      return (options as string[]).map((opt) => ({
        name: opt,
        value: opt,
      }));
    }
  }, [options]);

  return (
    <SelectUI value={value?.toString()} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={label} />
      </SelectTrigger>

      <SelectContent className={className}>
        <SelectGroup>
          <SelectLabel>Select...</SelectLabel>
          {opts.map(({ name, value: v }) => (
            <SelectItem key={v} value={v.toString()}>
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectUI>
  );
}
