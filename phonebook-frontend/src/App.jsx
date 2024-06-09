import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Notification from "./components/Notification";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [person, setPerson] = useState([]);
  const [searchinput, setSearchInput] = useState("");
  const [showdata, setShowData] = useState([]);
  const [errMessage, seterrMessage] = useState(null);

  useEffect(() => {
    const promise = axios
      .get("http://localhost:3001/person")
      .then((response) => {
        setShowData(response.data);
        console.log(promise);
      })
      .catch((err)=>{
        seterrMessage("Couldnot find all the person");
          setTimeout(()=>{
            seterrMessage(null);
          },3000)
        
      })
  }, []);

  const SubmitData = (e) => {
    e.preventDefault();

    const newPerson = {
      // id: person.length + 1,
      name: newName,
      number: newNumber,
    };
    // Or to make the below code more efficient, we can do as follows:
    // const nameExists = person.some((person)=> person.name === newName);
    // some() in JS is used to execute the callback function once for each array elements.
    const nameExist = person.some((contact) => contact.name === newPerson.name);
    if (nameExist) {
      alert("This name has already registered!");
      return;
    }
    // Now instead to adding our data to the array of objects named Person
    // We will send the data to the server and set the response as new Person
    axios.post("http://localhost:3001/person", newPerson).then((response) => {
      setPerson(person.concat(response.data));
    });

    // to create a new array of contacts that contains all the previous data and the new data as well
    // a good practise in React where the original array is not mutated
    // setPerson([...person, newPerson]);
    setNewName("");
    setNewNumber("");
  };
  // to search the searchinput from the frontend, we are filtering our newPerson object which is stored in person state variable
  // with logic, if the object's name includes the searchinput value
  const filteredPerson = person.filter((contact) =>
    contact.name.toLowerCase().includes(searchinput.toLowerCase())
  );

  return (
    <div>
      <div>
        <h1>PhoneBook App</h1>
        <Notification errMessage={errMessage}/>
        <label htmlFor="search-name">Search Name: </label>
        <input
          type="text"
          id="search-name"
          value={searchinput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div>
        <h2>Add a new User</h2>
        <form onSubmit={SubmitData}>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <br />
          <br />

          <label htmlFor="number">Number: </label>
          <input
            type="number"
            id="number"
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
          <br />
          <br />
          <button type="submit">Add</button>
        </form>
      </div>
      <div>
        <h3>Phonebook Users</h3>
        <div>
          <h2>Server Data</h2>
          <hr />
          {showdata.map((person) => (
            <ul type="A">
              <li key={person.id}>
                Id: {person.id} <br />
                Name: {person.name}
                <br />
                Contact: {person.number}
                <br />
                <br />
              </li>
            </ul>
          ))}
        </div>
        <ul type="I">
          {person.map((person) => (
            <li key={person.id}>
              Id: {person.id}
              <br />
              Name: {person.name}
              <br />
              Number: {person.number}
              <hr />
            </li>
          ))}
        </ul>
      </div>
      {/* Conditional Rendering of Search Result*/}
      {/* to check if searchinput is not empty and if there are any matched in filteredPerson */}

      {searchinput && filteredPerson.length > 0 && (
        <div>
          <h4>Search Result</h4>
          <ol type="a">
            {filteredPerson.map((contact) => (
              <li key={contact.id}>
                Name:{contact.name}
                <br />
                Number: {contact.number}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default App;
