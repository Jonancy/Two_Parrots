export default function SelectInput() {
  return (
    <select className="p-2 px-4 border rounded-md">
      {[1, 2, 3, 4, 5, 6].map((number) => (
        <option className="">{number}</option>
      ))}
    </select>
  );
}
