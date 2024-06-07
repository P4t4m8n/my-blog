"use client";

import { useModal } from "@/components/hooks/useModal";
import { useRef } from "react";
import ActionModel from "./ActionModel/ActionModel";

interface Props {
  data: Array<Record<string, any>>;
  actions: Array<{
    name: string;
    handler: (item: Record<string, any>) => void;
  }>;
}

export default function ProfileList({ data, actions }: Props) {
  // Get the unique set of fields
  const fields = Array.from(new Set(data.flatMap(Object.keys)));
  const actionModelRef = useRef(null);
  const [actionModel, setActionModel] = useModal(actionModelRef, null);

  return (
    <div className="min-h-[90%] my-4 rounded">
      <ul className="flex bg-customDark p-4 w-full justify-around ">
        {fields.map((field) => (
          <li key={field} className=" font-bold">
            {field}
          </li>
        ))}
        {actions.length > 0 && <li className=" font-bold">Actions</li>}
      </ul>
      {data.map((item, index) => (
        <ul
          ref={actionModelRef}
          key={index}
          className="flex relative bg-customDark p-4 w-full justify-around my-2"
        >
          {fields.map((field) => (
            <li key={field} className="">
              {item[field] !== undefined ? item[field].toString() : "N/A"}
            </li>
          ))}
          <ActionModel item={item} actions={actions} />
        </ul>
      ))}
    </div>
  );
}
