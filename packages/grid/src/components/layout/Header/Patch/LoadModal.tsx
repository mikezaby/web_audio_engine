import Modal, { close as closeModal } from "@/components/Modal";
import { buttonVariants } from "@/components/ui";
import { useAppDispatch, usePatches } from "@/hooks";
import Link from "next/link";

export default function SavePatch() {
  const dispatch = useAppDispatch();
  const patches = usePatches();

  const close = () => {
    dispatch(closeModal("patch"));
  };

  return (
    <Modal modalName="patch">
      <h2>Select a patch</h2>
      <div>
        <ul>
          {patches.map(({ id, name }) => (
            <li key={id} className="w-full">
              <Link
                className={buttonVariants({ variant: "link" })}
                onClick={close}
                href={`/patch/${id}`}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
}
