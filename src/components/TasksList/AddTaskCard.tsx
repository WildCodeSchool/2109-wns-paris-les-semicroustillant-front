import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import '../../styles/TaskList.css';

const iconCheck = <FontAwesomeIcon icon={faCheck} />;

const AddTaskCard = (): JSX.Element => (
  <div className="cardContainer">
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <TextField id="outlined-helperText" label="Status" />
        <TextField id="outlined-helperText" label="Subject" />
        <TextField id="outlined-helperText" label="Deadline" />
        <TextField id="outlined-helperText" label="Description" />
        <TextField id="outlined-helperText" label="Initial time estimated" />
        <TextField id="outlined-helperText" label="Total time spent" />
        <TextField id="outlined-helperText" label="Project ID" />
      </CardContent>
      <CardActions className="createActions">
        <Button size="small">{iconCheck}</Button>
      </CardActions>
    </Card>
  </div>
);

export default AddTaskCard;
