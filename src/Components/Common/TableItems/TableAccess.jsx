import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import { Avatar, Button, Dialog, DialogContent, DialogContentText, FormControlLabel, Grid, TextField } from "@mui/material";
import StatusButton from "Components/Common/StatusButton";
import { EyesIcon } from "Icons/icons";
import Link from "next/link";
import CreateAccessLevel from "../Popup/CreateAccessLevel";
import CreateAccessLevelNew from "../Popup/CreateAccessLevelNew";

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount, dataHead, selected, updatedData } = props;

  return (
    <TableHead sx={{ height: "48px" }}>
      <TableRow
        sx={{
          th: {
            backgroundColor: "grey.themeColor",
            px: "16px",
            fontSize: "12.04px",
            color: "#212121",
            textAlign: 'left'
          },
          ".MuiCheckbox-indeterminate": {
            svg: {
              color: "primary.main",
            },
          },
          ".Mui-checked": {
            svg: {
              color: "primary.main",
            },
          },
        }}
      >
        {selected && (
          <TableCell padding="checkbox" sx={{ px: "6px !important" }}>
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
              sx={{
                ".MuiSvgIcon-root": {
                  color: "#9E9E9E",
                },
              }}
            />
          </TableCell>
        )}
        {dataHead?.map((headCell, i) => (
          <TableCell
            key={i}
            padding={"normal"}
            sx={{
              color: "#212121", pb: 3,
              textAlign: i >= dataHead.length - 1 ? "center !Important" : "right",
              width: i === dataHead.length - 1 ? "250px" : "fit-content"

            }}
          >
            {headCell}
          </TableCell>
        ))}

      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function TableItems({
  dataHead,
  dataBody,
  setSelected = false,
  selected = false,
}) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (selected) {
      if (event.target.checked) {
        const newSelected = dataBody?.map((data) => data.id);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    }
  };

  const handleClick = (id) => {
    if (selected) {
      const index = selected.findIndex((x) => x === id);
      const copySelects = [...selected];

      if (index === -1) {
        copySelects.push(id);
        setSelected(copySelects);
      } else {
        const filterSelects = copySelects.filter((x) => x !== id);
        setSelected(filterSelects);
      }
    }
  };

  const isSelected = (id) => {
    if (selected) {
      let index = selected.findIndex((x) => x === id);
      if (index === -1) {
        return false;
      } else {
        return true;
      }
    }
  };

  // Update Datas
  const [updatedData, setUpdatedData] = React.useState(null);
  const handleDataUpdate = (newData) => {
    setUpdatedData(newData);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer className="container-table table-scroll">
        <Table
          stickyHeader
          aria-label="sticky table"
          sx={{
            borderRadius: "8px",
            overflow: "hidden",
            minWidth: 1000,
            "td,tr": {
              fontSize: "12.67px",
              color: "#212121",
              fontWeight: 500,
              py: 1.6,
              borderBottom: "none",
            },
            th: {
              fontSize: "12.67px",
              color: "#212121",
              fontWeight: 500,
              p: 0.5,
              borderBottom: "none",
            },
            "tr:hover": {
              backgroundColor: "transparent !important",
            },
            tr: {
              position: "relative",
              "&::before": {
                content: '""',
                width: "100%",
                height: "56px",
                backgroundColor: "grey.themeColor",
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                left: "0",
                borderRadius: "8px",
                zIndex: -1,
                borderBottom: "1px solid #EEEEEE",
              },
              "&.Mui-selected": {
                backgroundColor: "transparent !important",
                ".MuiCheckbox-root": {
                  svg: {
                    color: "primary.main",
                  },
                },

                // opacity: 0.7,
              },
            },
          }}
          size={"medium"}
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={dataBody?.length}
            dataHead={dataHead}
            selected={selected}
          />
          <TableBody sx={{ transform: "translateY(7px)" }}>
            {dataBody?.length !== 0 &&
              dataBody?.map((row, index) => {
                const isItemSelected = isSelected(row?.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role={selected && "checkbox"}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    {selected && (
                      <TableCell padding="checkbox" sx={{ pl: "6px" }}>
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onClick={() => handleClick(row?.id)}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                          sx={{
                            ".MuiSvgIcon-root": {
                              color: "#6F767E66",
                            },
                          }}
                        />
                      </TableCell>
                    )}
                    {row?.data?.map((e, i) => (
                      <TableCell align="center" sx={{
                        textAlign: 'left'
                      }} key={i}>
                        {!e?.type && e}
                        {e?.type === "avatar" && (
                          <Box className="center">
                            <Avatar
                              src={e?.url}
                              sx={{ width: "30px", height: "30px" }}
                            />
                            <Typography
                              component={"h6"}
                              sx={{
                                fontSize: "12.67px",
                                color: "#212121",
                                fontWeight: 500,
                                ml: 1,
                              }}
                            >
                              {e?.text}
                            </Typography>
                          </Box>
                        )}
                        {e?.type === "textBold" && (
                          <>
                            <Typography variant="p" sx={{ fontWeight: 600, fontSize: "15px" }}> {e?.text}</Typography>
                          </>
                        )}
                        {e?.type === "text" && (
                          <>
                            <Typography variant="p" sx={{}}> {e?.text}</Typography>
                          </>
                        )}

                        {e?.type === "status" && (
                          <StatusButton {...e} variant="contained">
                            {e?.text}
                          </StatusButton>
                        )}
                        {e?.type === "btn" && (
                          <>
                            <CreateAccessLevelNew onDataUpdate={handleDataUpdate} tableId={row.data[0]} dataBodyFormat={row.data[1].text} />
                            {/* <Button
                                onClick={(x) => console.log(row.data[0])}
                                // onClick={() => props.show(row["id"])}

                                sx={{ backgroundColor: '#1C49F11A', color: '#1C49F1', borderRadius: "5px", mr: "10px" }}>

                              </Button> */}
                          </>
                        )}


                        {/* {e?.type === "jsx" && e?.jsx} */}
                        {/* M */}
                        {/* {e?.type === "text" && (
                          <>
                            <Avatar src="/" />
                            <Typography {...e} variant="contained">
                              {e?.text}
                            </Typography>
                          </>
                        )} */}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* {dataBody?.length === 0 && (
        <Typography
          component={"h6"}
          sx={{
            textAlign: "center",
            color: "#fff",
          }}
        >
          موردی پیدا نشد!
        </Typography>
      )} */}
    </Box>
  );
}
