import React from "react";
import ReactDOM from "react-dom";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import RevertIcon from "@mui/icons-material/Close";
import { useAuth0 } from "@auth0/auth0-react";

const createData = (
  name,
  played,
  won,
  even,
  lost,
  goals,
  points,
  isEdit = false
) => ({
  id: name.replace(" ", "_"),
  name,
  played,
  won,
  even,
  lost,
  goals,
  points,
  isEditMode: isEdit,
});

const CustomTableCell = ({ row, name, onChange }) => {
  const { isEditMode } = row;
  return (
    <TableCell align="left">
      {isEditMode ? (
        <Input
          value={row[name]}
          name={name}
          onChange={(e) => onChange(e, row)}
        />
      ) : (
        row[name]
      )}
    </TableCell>
  );
};

const TableLeague = () => {
  const [rows, setRows] = React.useState([
    createData("Arsenal", 11, 9, 1, 1, "25:11", 28),
    createData("Manchester City", 11, 8, 2, 1, "36:11", 26),
    createData("Tottenhan", 12, 7, 2, 3, "23:14", 23),
    createData("Newcastle", 12, 5, 6, 1, "20:10", 21),
    createData("Chelsea", 11, 6, 3, 2, "16:11", 21),
  ]);
  const [previous, setPrevious] = React.useState({});

  const onToggleEditMode = (id) => {
    setRows((state) => {
      return rows.map((row) => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };
  const onAdd = () => {
    const rowsInput = createData("", "", "", "", "", "", "", true);
    setRows([...rows, rowsInput]);
  };
  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious((state) => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  const onRevert = (id) => {
    const newRows = rows.map((row) => {
      if (row.id === "") setRows([rows.pop()]);
      if (row.id === id) {
        return previous[id] ? previous[id] : row;
      }
      return row;
    });
    setRows(newRows);
    setPrevious((state) => {
      delete state[id];
      return state;
    });
    onToggleEditMode(id);
  };

  const { isAuthenticated, user } = useAuth0();

  const isAdmin = isAuthenticated && user.name === 'antonio@mailinator.com' ? true : false
  
  return (
    <Paper>
      <Table aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell align="left" />
            <TableCell align="left">TIM</TableCell>
            <TableCell align="left">OS</TableCell>
            <TableCell align="left">P</TableCell>
            <TableCell align="left">N</TableCell>
            <TableCell align="left">I</TableCell>
            <TableCell align="left">G</TableCell>
            <TableCell align="left">B</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .sort((a, b) => (a.points < b.points ? 1 : -1))
            .map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  {row.isEditMode ? (
                    <>
                      <IconButton
                        aria-label="done"
                        onClick={() => onToggleEditMode(row.id)}
                      >
                        <DoneIcon />
                      </IconButton>
                      <IconButton
                        aria-label="revert"
                        onClick={() => onRevert(row.id)}
                      >
                        <RevertIcon />
                      </IconButton>
                    </>
                  ) : (
                    <IconButton
                      aria-label="delete"
                      onClick={() => onToggleEditMode(row.id)}
                    >
                      {isAdmin && <EditIcon />}
                    </IconButton>
                  )}
                </TableCell>
                <CustomTableCell {...{ row, name: "name", onChange }} />
                <CustomTableCell {...{ row, name: "played", onChange }} />
                <CustomTableCell {...{ row, name: "won", onChange }} />
                <CustomTableCell {...{ row, name: "even", onChange }} />
                <CustomTableCell {...{ row, name: "lost", onChange }} />
                <CustomTableCell {...{ row, name: "goals", onChange }} />
                <CustomTableCell {...{ row, name: "points", onChange }} />
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {isAdmin && (
        <Button variant="contained" onClick={onAdd} sx={{ marginTop: "15px" }}>
          ADD ROW
        </Button>
      )}
    </Paper>
  );
};
export default TableLeague;
