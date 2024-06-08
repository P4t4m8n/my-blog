import { MouseEvent, useRef } from "react";
import { useModal } from "@/hooks/useModal";

interface Props {
  item: Record<string, any>;
  actions: Array<{
    name: string;
    handler: (item: Record<string, any>) => Promise<Record<string, any> | null>;
  }>;
  setStateItem: (item: Record<string, any>|null) => void;
}

export default function ActionModel({ item, actions, setStateItem }: Props) {
  const actionModelRef = useRef(null);
  const [actionModel, setActionModel] = useModal(actionModelRef, null);

  const handleAction = async (
    ev: MouseEvent<HTMLButtonElement>,
    actionHandler: (
      item: Record<string, any>
    ) => Promise<Record<string, any> | null>,
    item: Record<string, any>
  ) => {
    const updatedItem = await actionHandler(item);
    if (!updatedItem) setStateItem(null);
    else setStateItem({ ...updatedItem });
  };

  return (
    <section className="relative">
      <button
        onClick={() => setActionModel(true)}
        className="bg-customCardBgOrange text-white px-2 py-1 rounded"
      >
        Actions
      </button>
      {actionModel && actions.length > 0 && (
        <li className="absolute top-0 bg-customCardBgOrange items-start font-semibold rounded hover:text-customCardBgMaroon right-20 flex flex-col gap-2 z-50 p-4">
          {actions.map((action, actionIndex) => (
            <button
              key={actionIndex}
              className="text-customDark hover:text-customCardBgMaroon rounded"
              onClick={(ev) => handleAction(ev, action.handler, item)}
            >
              {action.name}
            </button>
          ))}
        </li>
      )}
    </section>
  );
}
