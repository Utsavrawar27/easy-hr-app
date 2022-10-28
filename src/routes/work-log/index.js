import React, { useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Button from "components/Button";
import Spinner from "components/Spinner";
import AddWorklogDialog from "components/AddWorklogDialog";
import { useMergeState } from "utils/custom-hooks";
import { formatDate } from "utils/date";

export default function WorklogContainer() {
  const [state, setState] = useMergeState({
    worklog: [],
    shouldShowAddWorklogDialog: false,
    isLoading: false,
  });

  const handleOpenAddWorklogDialog = () => {
    setState({ shouldShowAddWorklogDialog: true });
  };

  const handleCloseAddWorklogDialog = () => {
    setState({ shouldShowAddWorklogDialog: false });
  };

  const handleAddWorklog = (payload) => {
    console.log("payload : ", payload);
    handleCloseAddWorklogDialog();
  };

  useEffect(() => {
    // TODO: fetch worklog
  }, []);

  return (
    <div>
      {state?.isLoading ? (
        <div className="mt-10 w-full h-screen flex justify-center">
          <Spinner loading={state?.isLoading} />
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center">
            <div className="text-3xl font-semibold text-grey">Worklog</div>
            <div>
              <Button
                label="Add Worklog"
                color="secondary"
                onClick={handleOpenAddWorklogDialog}
                style={{
                  borderRadius: 10,
                  fontSize: 14,
                  color: "#FFFFFF",
                  height: 40,
                }}
              />
            </div>
          </div>

          <TableContainer className="mt-10">
            <Table sx={{ minWidth: 750 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <span className="text-grey">Date</span>
                  </TableCell>
                  <TableCell align="left">
                    <span className="text-grey">Hours</span>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ overflow: "visible" }}>
                {state?.worklog?.map((elem) => (
                  <TableRow key={elem._id}>
                    <TableCell component="th" scope="row" align="center">
                      <span className="text-grey text-xs">
                        {formatDate(elem?.serviceDate, "ll")}
                      </span>
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      <span className="text-grey text-xs">{elem?.hours}</span>
                    </TableCell>

                    <TableCell component="th" scope="row" align="left">
                      <IconButton onClick={handleOpenAddWorklogDialog}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {!state?.worklog.length && (
            <div className="flex justify-center mt-10">
              <div className="text-grey text-xl">Start by adding a Worklog</div>
            </div>
          )}
        </div>
      )}

      {state?.shouldShowAddWorklogDialog && (
        <AddWorklogDialog
          open={state?.shouldShowAddWorklogDialog}
          onClose={handleCloseAddWorklogDialog}
          onSave={handleAddWorklog}
        />
      )}
    </div>
  );
}
