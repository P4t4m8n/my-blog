
import ProfileListPreview from "./ProfileListPreview/ProfileListPreview";

interface Action {
  name: string;
  handler: (item: Record<string, any>) => Promise<Record<string, any>|null>;
}

interface Props {
  initialData: Array<Record<string, any>>;
  actions: Array<Action>;
}

export default function ProfileList({ initialData, actions }: Props) {
  const fields = Array.from(new Set(initialData.flatMap(Object.keys)));

  const gridColsClasses = [
    "grid-cols-1",
    "grid-cols-2",
    "grid-cols-3",
    "grid-cols-4",
    "grid-cols-5",
    "grid-cols-6",
    "grid-cols-7",
    "grid-cols-8",
    "grid-cols-9",
    "grid-cols-10",
    "grid-cols-11",
    "grid-cols-12",
  ];
  const numCols = fields.length + (actions.length > 0 ? 1 : 0);
  const gridColsClass = gridColsClasses[numCols - 1];

  return (
    <div className="min-h-[90%] my-4 rounded">
      <ul
        className={`grid ${gridColsClass} w-full rounded-t-lg place-items-center bg-customDark p-4`}
      >
        {fields.map((field) => {
          if (field !== undefined && field !== "data")
            return (
              <li key={field} className="w-fit font-bold">
                {field}
              </li>
            );
        })}
        <li className="font-bold">Actions</li>
      </ul>
      {initialData.map((item, index) => (
        <ProfileListPreview
          key={index}
          item={item}
          index={index}
          actions={actions}
          gridColsClass={gridColsClass}
          fields={fields}
        />
      ))}
    </div>
  );
}
