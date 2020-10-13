import React from "react";
import { useStateLens, get, set, promap } from "@totalsoft/react-state-lens";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <PersonContainer />
    </div>
  );
}

const onTextBoxChange = (onPropertyChange) => (event) =>
  onPropertyChange(event.target.value);

const PersonContainer = () => {
  const person = useStateLens({ fName: "Radu", lName: "Popovici" });
  const fullName = promap(
    (p) => `${p.fName} ${p.lName}`,
    (fullName, p) => {
      const [fName, lName] = fullName.split(" ");
      return { ...p, fName, lName };
    }
  );

  return (
    <React.Fragment>
      <FirstName fName={person.fName} />
      <LastName lName={person.lName} />
      <FullName fullName={fullName(person)} />
    </React.Fragment>
  );
};

const FirstName = ({ fName }) => (
  <React.Fragment>
    <label>First name: </label>
    <input
      type="text"
      value={get(fName)}
      onChange={onTextBoxChange(set(fName))}
    />
  </React.Fragment>
);

const LastName = ({ lName }) => (
  <div>
    <label>Last name: </label>
    <input
      type="text"
      value={get(lName)}
      onChange={onTextBoxChange(set(lName))}
    />
  </div>
);

const FullName = ({ fullName }) => (
  <div>
    <label>Full name: </label>
    <input
      type="text"
      value={get(fullName)}
      onChange={onTextBoxChange(set(fullName))}
    />
  </div>
);
