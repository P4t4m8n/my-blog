"use client";
import { useState } from "react";
import ActionModel from "../ActionModel/ActionModel";

interface Props {
  item: Record<string, any>;
  fields: Array<string>;
  actions: Array<{
    name: string;
    handler: (item: Record<string, any>) => Promise<Record<string, any> | null>;
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
  const [stateItem, setStateItem] = useState<Record<string,any>|null>(item);
  if (!stateItem) {

    return;
  }
  return (
    <li
      key={index}
      className={`grid ${gridColsClass} last:rounded-b-lg place-items-center bg-customDark p-4`}
    >
      {fields.map((field) => {
        if (stateItem[field] !== undefined && field !== "data")
          return (
            <h3 key={field} className="">
              {stateItem[field].toString()}
            </h3>
          );
      })}
      
        <ActionModel
          item={stateItem}
          actions={actions}
          setStateItem={setStateItem}
        />
     
    </li>
  );
}
