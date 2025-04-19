import { ChangeEvent } from "react";
import { Input, Label } from "@/components/ui";
import { useAppDispatch } from "@/hooks";
import { updateModule } from "../modulesSlice";

interface NameInterface {
  id: string;
  value: string;
}

export default function Name(props: NameInterface) {
  const dispatch = useAppDispatch();
  const { id, value } = props;

  const updateProp = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateModule({ id, changes: { name: event.target.value } }));
  };

  return (
    <div className="p-2">
      <Label>Name</Label>
      <Input value={value} onChange={updateProp} />
    </div>
  );
}
