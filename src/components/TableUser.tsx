import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(firstname: any, lastname: any, role: any, option: any) {
  return { firstname, role, lastname, option };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 1),
  createData('Ice cream sandwich', 237, 9.0, 1),
  createData('Eclair', 262, 16.0, 1),
  createData('Cupcake', 305, 3.7, 1),
  createData('Gingerbread', 356, 16.0, 1),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nom </TableCell>
            <TableCell align="right">Prénom</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Option</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.firstname}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.firstname}
              </TableCell>
              <TableCell align="right">{row.lastname}</TableCell>
              <TableCell align="right">{row.role}</TableCell>
              <TableCell align="right">{row.option}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
