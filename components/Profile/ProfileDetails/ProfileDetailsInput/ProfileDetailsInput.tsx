interface Props {
  label: string;
  value: string;
  name: string;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function ProfileDetailsInput({
  label,
  value,
  name,
  onChange,
}: Props) {
  return (
    <>
      <label htmlFor={name} className=" w-fit font-light">
        {label}:
      </label>
      <input
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className=" border rounded p-1 w-fit"
      />
    </>
  );
}
