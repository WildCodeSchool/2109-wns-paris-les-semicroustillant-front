import React from "react";
import blank_profile from "./blank-profile-picture-female.png";
import Skill from "./Skill";
import { Card, List } from "./styles/elements";

function Wilder({ city, name, skills }) {
  return (
    <Card>
      <img src={blank_profile} alt={`${name} Profile`} />
      <h3>{name}</h3>
      <h4>City</h4>
      <p>{city}</p>
      <h4>Wild Skills</h4>
      <List>
        {skills.map((skill) => (
          <Skill key={skill._id} {...skill} />
        ))}
      </List>
    </Card>
  );
}

export default Wilder;
