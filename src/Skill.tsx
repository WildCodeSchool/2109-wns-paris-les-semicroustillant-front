import React from 'react';
import Proptypes from 'prop-types';
import { Badge } from './styles/elements';

export interface ISkill {
  title: string;
  votes: number;
  _id?: string;
}

function Skill({ title, votes }: ISkill): JSX.Element {
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
