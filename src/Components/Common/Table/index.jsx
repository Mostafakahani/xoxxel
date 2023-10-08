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
import { Avatar, Button } from "@mui/material";
import StatusButton from "Components/Common/StatusButton";

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    numSelected,
    rowCount,
    onRequestSort,
    dataHead,
    selected,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead sx={{ height: "50px" }}>
      <TableRow
        sx={{
          th: {
            backgroundColor: "grey.themeColor",
            p: "16px",
            pt: "27px",
            pb: 1,
          },
        }}
      >
        {selected && (
          <TableCell padding="checkbox" sx={{}}>
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
            align={"left"}
            padding={"normal"}
            sx={{ color: "#212121", pb: 3 }}
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

export default function MyTable({
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

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer className="container-table table-scroll">
        <Table
          stickyHeader
          aria-label="sticky table"
          sx={{
            minWidth: 600,
            "td,tr": {
              fontSize: "12.67px",
              color: "#212121",
              fontWeight: 500,
            },
            th: {
              fontSize: "12.67px",
              color: "#212121",
              fontWeight: 500,
              p: 0.5,
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
          <TableBody
            sx={{
              td: {
                pt: 2.7,
              },
            }}
          >
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
                    sx={{ cursor: "pointer" }}
                  >
                    {selected && (
                      <TableCell padding="checkbox" sx={{ p: "16px" }}>
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
                      <TableCell align="left" key={i}>
                        {!e?.type && e}
                        {e?.type === "avatar" && (
                          <Box className="center">
                            <Avatar
                              src={e?.href}
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
                              سروش نوروزی
                            </Typography>
                          </Box>
                        )}
                        {e?.type === "status" && (
                          <StatusButton {...e} variant="contained">
                            {e?.text}
                          </StatusButton>
                        )}
                        {e?.type === "btn" && (
                          <StatusButton {...e} variant="contained">
                            {e?.text}
                          </StatusButton>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {dataBody?.length === 0 && (
        <Typography
          component={"h6"}
          sx={{
            pb: 2,
            pt: 3,
            textAlign: "center",
            color: "#fff",
          }}
        >
          موردی پیدا نشد!
        </Typography>
      )}
    </Box>
  );
}
