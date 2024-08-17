import Select from "react-select";

const Controls = ({ selectField, selectDirection }: any) => {
  const fieldOptions = [
    { label: "Name", value: "name" },
    { label: "Company", value: "company" },
    { label: "Email", value: "email" },
  ];
  const directionOptions = [
    { label: "Ascending", value: "ascending" },
    { label: "Descending", value: "descending" },
  ];

  return (
    <div className="gallery-controls controls">
      <div className="form-group group">
        <label htmlFor="sort-field" className="label">
          Sort Field
        </label>
        <Select
          options={fieldOptions}
          onChange={(e) => selectField(e?.value)}
          inputId="sort-field"
          className="input"
        />
      </div>
      <div className="form-group group">
        <label htmlFor="sort-direction" className="label">
          Sort Direction
        </label>
        <Select
          options={directionOptions}
          onChange={(e) => selectDirection(e?.value)}
          inputId="sort-direction"
          className="input"
        />
      </div>
    </div>
  );
};

export default Controls;
