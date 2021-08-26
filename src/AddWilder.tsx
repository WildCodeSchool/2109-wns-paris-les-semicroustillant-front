import React, { useState } from "react";
import axios from "axios";
import { Button, Error, Form, Input, Label } from "./styles/form-elements";

function AddWilder() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  return (
    <Form
      onSubmit={async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
          const result = await axios.post("http://localhost:5000/api/wilders", {
            name,
            city,
          });
          console.log(result);
          if (result.data.success) {
            setError("");
          }
        } catch (error) {
          if (error.response) {
            setError(error.response.data.message);
          } else {
            setError(error.message);
          }
        }
      }}
    >
      <Label htmlFor="name-input">Name :</Label>
      <Input
        id="name-input"
        type="text"
        placeholder="Type the name"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
      />
      <Label htmlFor="city-input">City :</Label>
      <Input
        id="city-input"
        type="text"
        placeholder="Type the city"
        value={city}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCity(e.target.value)
        }
      />
      {error !== "" && <Error>{error}</Error>}
      <Button>Add</Button>
    </Form>
  );
}

export default AddWilder;
