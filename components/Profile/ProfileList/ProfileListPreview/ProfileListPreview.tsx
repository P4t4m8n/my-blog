import { useState } from "react";
import ActionModel from "../ActionModel/ActionModel";

interface Props {
  item: Record<string, any>;
  fields: Array<string>;
  actions: Array<{
    name: string;
    handler: (item: Record<string, any>) => Promise<Record<string, any>>;
  }>;
  index: number;
  gridColsClass: string;
}

export default function ProfileListPreview({
  item,
  index,
  actions,
  gridColsClass,
  fields,
}: Props) {
  const [stateItem, setStateItem] = useState(item);

  return (
    <ul
      key={index}
      className={`grid ${gridColsClass} last:rounded-b-lg place-items-center bg-customDark p-4`}
    >
      {fields.map((field) => (
        <li key={field} className="">
          {stateItem[field] !== undefined ? stateItem[field].toString() : "N/A"}
        </li>
      ))}
      <ActionModel
        item={stateItem}
        actions={actions}
        setStateItem={setStateItem}
      />
    </ul>
  );
}
