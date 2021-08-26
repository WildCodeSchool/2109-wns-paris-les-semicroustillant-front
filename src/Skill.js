import React from "react";
import Proptypes from "prop-types";
import { Badge } from "./styles/elements";

function Skill({ title, votes }) {
  return (
    <li>
      {title}
      <Badge votes={votes}>{votes}</Badge>
    </li>
  );
}

Skill.propTypes = {
  title: Proptypes.string.isRequired,
  votes: Proptypes.number.isRequired,
};

export default Skill;
