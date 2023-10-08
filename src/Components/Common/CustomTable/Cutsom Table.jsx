import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Avatar, Button, SvgIcon } from "@mui/material";

export default function CustomTable(props) {
  const rows = props?.rows;

  const Svg = {
    edit: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.5357 3.80739C15.7073 2.63582 17.6067 2.63582 18.7783 3.80739L20.1925 5.2216C21.3641 6.39318 21.3641 8.29267 20.1925 9.46424L9.80003 19.8568C9.66043 19.9964 9.48263 20.0915 9.28904 20.1302L3.98573 21.1909C3.28601 21.3308 2.66909 20.7139 2.80904 20.0142L3.8697 14.7109C3.90842 14.5173 4.00357 14.3395 4.14317 14.1999L14.5357 3.80739ZM17.3641 5.2216L18.7783 6.63582C19.1688 7.02634 19.1688 7.65951 18.7783 8.05003L17.3641 9.46425L14.5357 6.63582L15.9499 5.2216C16.3404 4.83108 16.9736 4.83108 17.3641 5.2216ZM13.1215 8.05003L5.77148 15.4L5.06437 18.9356L8.59991 18.2284L15.9499 10.8785L13.1215 8.05003Z"
          fill="#2A85FF"
        />
      </svg>
    ),
    phone: (
      <svg viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.8248 13.4984L13.3172 11.4425C13.2147 11.3027 13.0209 11.2671 12.8754 11.3613C10.903 12.6376 10.3608 14.5872 11.1521 16.0244C12.0175 17.5961 13.3523 19.5237 15.3996 21.5711C17.447 23.6185 19.3746 24.9532 20.9464 25.8187C22.3836 26.61 24.3332 26.0678 25.6095 24.0954C25.7036 23.9498 25.668 23.7561 25.5282 23.6535L23.4723 22.1459C23.17 21.9242 22.7691 21.8902 22.4338 22.0579L21.6143 22.4676C20.9173 22.8161 19.9619 22.9385 19.0575 22.4732C18.4528 22.1622 17.5209 21.571 16.4603 20.5104C15.3998 19.4499 14.8086 18.5179 14.4975 17.9133C14.0322 17.0089 14.1547 16.0534 14.5031 15.3564L14.9129 14.537C15.0805 14.2017 15.0466 13.8007 14.8248 13.4984ZM11.7889 9.68215C9.24837 11.326 7.94061 14.3383 9.40011 16.989C10.3526 18.719 11.7995 20.7994 13.9854 22.9853C16.1714 25.1713 18.2518 26.6181 19.9817 27.5706C22.6325 29.0301 25.6447 27.7224 27.2886 25.1819C27.9582 24.147 27.7049 22.7696 26.7109 22.0407L24.6551 20.5331C23.7481 19.868 22.5453 19.766 21.5393 20.269L20.7199 20.6788C20.4827 20.7974 20.2083 20.8161 19.9724 20.6948C19.5428 20.4737 18.7813 20.003 17.8745 19.0962C16.9677 18.1894 16.497 17.428 16.276 16.9983C16.1546 16.7625 16.1734 16.4881 16.292 16.2509L16.7017 15.4314C17.2047 14.4255 17.1028 13.2227 16.4377 12.3157L14.93 10.2598C14.2011 9.26588 12.8237 9.01256 11.7889 9.68215Z"
          fill="#737373"
        />
        <rect x="1" y="1" width="35" height="35" rx="17.5" stroke="#636363" />
      </svg>
    ),
    email: (
      <svg viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.03 13.1469H26.8535C27.2625 13.1469 27.6173 13.3788 27.7937 13.7182L20.0291 18.8946C19.6734 19.1317 19.2101 19.1317 18.8544 18.8946L11.0899 13.7182C11.2662 13.3788 11.621 13.1469 12.03 13.1469ZM10.9712 16.1842V24.794C10.9712 25.3788 11.4452 25.8528 12.03 25.8528H26.8535C27.4383 25.8528 27.9123 25.3788 27.9123 24.794V16.1842L21.2038 20.6566C20.1368 21.3679 18.7468 21.3679 17.6798 20.6566L10.9712 16.1842ZM8.85352 14.2058C8.85352 12.4515 10.2757 11.0293 12.03 11.0293H26.8535C28.6078 11.0293 30.03 12.4515 30.03 14.2058V24.794C30.03 26.5483 28.6078 27.9705 26.8535 27.9705H12.03C10.2757 27.9705 8.85352 26.5483 8.85352 24.794V14.2058Z"
          fill="#737373"
        />
        <rect
          x="0.912224"
          y="0.970818"
          width="37.0588"
          height="37.0588"
          rx="18.5294"
          stroke="#636363"
          strokeWidth="1.05882"
        />
      </svg>
    ),
    delete: (
      <svg viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.2851 5.59948C5.94152 5.2559 5.38447 5.2559 5.04089 5.59948C4.69731 5.94306 4.69731 6.50011 5.04089 6.84369L9.69754 11.5003L5.04091 16.157C4.69733 16.5006 4.69733 17.0576 5.04091 17.4012C5.38449 17.7448 5.94155 17.7448 6.28513 17.4012L10.9418 12.7446L15.5984 17.4012C15.942 17.7448 16.499 17.7448 16.8426 17.4012C17.1862 17.0576 17.1862 16.5006 16.8426 16.157L12.186 11.5003L16.8426 6.8437C17.1862 6.50012 17.1862 5.94306 16.8426 5.59948C16.499 5.2559 15.942 5.2559 15.5984 5.59948L10.9418 10.2561L6.2851 5.59948Z"
          fill="#B54D4D"
        />
      </svg>
    ),
    show: (
      <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.95206 7.66255C9.95206 8.81755 9.01872 9.75089 7.86372 9.75089C6.70872 9.75089 5.77539 8.81755 5.77539 7.66255C5.77539 6.50755 6.70872 5.57422 7.86372 5.57422C9.01872 5.57422 9.95206 6.50755 9.95206 7.66255Z" stroke="#362FD9" strokeWidth="0.875" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7.86368 12.4867C9.92284 12.4867 11.842 11.2734 13.1778 9.17335C13.7028 8.35085 13.7028 6.96835 13.1778 6.14585C11.842 4.04585 9.92284 2.83252 7.86368 2.83252C5.80451 2.83252 3.88534 4.04585 2.54951 6.14585C2.02451 6.96835 2.02451 8.35085 2.54951 9.17335C3.88534 11.2734 5.80451 12.4867 7.86368 12.4867Z" stroke="#362FD9" strokeWidth="0.875" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

    )
  };
  function EnhancedTableHead(inputs) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = inputs;

    return (    
      <TableHead>
        <TableRow className="custom-row" sx={{ borderBottom: "2px solid " + ((theme) => theme.palette.custom.hrColor) }}>
          {props?.selected && (
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                // indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
                inputProps={{
                  "aria-label": "select all desserts",
                }}
                sx={{ color: "red" }}
                icon={
                  <SvgIcon sx={{ width: "15px", height: "15px" }} >
                    <svg

                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="24" height="24" rx="6" />
                      <rect
                        x="1"
                        y="1"
                        width="22"
                        height="22"
                        rx="5"
                        stroke="#6F767E"
                        strokeOpacity="0.4"
                        strokeWidth="2"
                      />
                    </svg>
                  </SvgIcon>
                }
                checkedIcon={
                  <SvgIcon sx={{ width: "15px", height: "15px" }} >
                    <svg

                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_323_14364)">
                        <rect width="24" height="24" rx="6" fill="#2A85FF" />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M20.7071 6.29289C21.0976 6.68342 21.0976 7.31658 20.7071 7.70711L12.1213 16.2929C10.9497 17.4645 9.05026 17.4645 7.87868 16.2929L4.29289 12.7071C3.90237 12.3166 3.90237 11.6834 4.29289 11.2929C4.68342 10.9024 5.31658 10.9024 5.70711 11.2929L9.29289 14.8787C9.68342 15.2692 10.3166 15.2692 10.7071 14.8787L19.2929 6.29289C19.6834 5.90237 20.3166 5.90237 20.7071 6.29289Z"
                          fill="#FCFCFC"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_323_14364">
                          <rect width="24" height="24" rx="6" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </SvgIcon>
                }
              />
            </TableCell>
          )}
          {props.headCells.map((headCell, index) => (
            <TableCell
              key={headCell.id}
              align="center"
              padding={headCell.disablePadding ? "none" : "normal"}
            >
              <Typography
                sx={{ flex: "1 1 100%", fontSize: "12px", color: "#212121", textAlign: 'left' }}
                variant="h6"
                id="tableTitle"
                component="div"
              >
                {headCell.label}
              </Typography>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) => "#111223",
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} مورد انتخاب شده
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            دیتا
          </Typography>
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  }

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(props.page);
  const [rowsPerPage, setRowsPerPage] = React.useState(props.rowsPerPage);


  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    // setPage(newPage);
    props.pageChange(newPage)
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    if (props?.selected) {
      props.selected(selected);
    }
  }, [selected]);

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const colors = {
    red: "#BF2F2F",
    yellow: "#D4A228",
    orange: "#D27621",
    purple: "#993F9B",
    turquoise: "#419EA4",
    blue: "#2A85FF",
    green: "#25AD43",
    white: "#ffffff",
  };








  const [withBtn, setWithBtn] = React.useState(false);

  React.useEffect(() => {
    rows.map((x) => {
      if (typeof x === "object" && Object.keys(x)?.length > 0) {
        Object.keys(x).map((rowsss) => {
          if (
            typeof x[rowsss] === "object" &&
            Object.keys(x[rowsss])?.length > 0
          ) {
            if (x[rowsss].type === "btn") {
              setWithBtn(true);
            }
          }
        });
      }
    });
  }, []);
  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        sx={{
          width: "100%",
          mb: 2,
          backgroundColor: "#FFFFFF",
          backgroundImage: "none",
          boxShadow: "none"
        }}
      >

        <TableContainer >
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows?.length}
            />
            <TableBody>
              {rows
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      sx={{
                        borderBottom: "2px solid " + ((theme) => theme.palette.custom.hrColor),
                        backgroundColor:
                          isItemSelected === false ? "#FFFFFF" : "#e3e3e3",
                      }}
                    >
                      {props?.selected && (
                        <TableCell
                          padding="checkbox"
                          onClick={(event) => handleClick(event, row.id)}
                        >
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                            sx={{ color: "#fff" }}
                            icon={
                              <SvgIcon sx={{ width: "15px", height: "15px" }} >

                                <svg

                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width="24"
                                    height="24"
                                    rx="6"
                                  />
                                  <rect
                                    x="1"
                                    y="1"
                                    width="22"
                                    height="22"
                                    rx="5"
                                    stroke="#6F767E"
                                    strokeOpacity="0.4"
                                    strokeWidth="2"
                                  />
                                </svg>
                              </SvgIcon>
                            }
                            checkedIcon={
                              <SvgIcon sx={{ width: "15px", height: "15px" }} >
                                <svg

                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clipPath="url(#clip0_323_14364)">
                                    <rect
                                      width="24"
                                      height="24"
                                      rx="6"
                                      fill="#2A85FF"
                                    />
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M20.7071 6.29289C21.0976 6.68342 21.0976 7.31658 20.7071 7.70711L12.1213 16.2929C10.9497 17.4645 9.05026 17.4645 7.87868 16.2929L4.29289 12.7071C3.90237 12.3166 3.90237 11.6834 4.29289 11.2929C4.68342 10.9024 5.31658 10.9024 5.70711 11.2929L9.29289 14.8787C9.68342 15.2692 10.3166 15.2692 10.7071 14.8787L19.2929 6.29289C19.6834 5.90237 20.3166 5.90237 20.7071 6.29289Z"
                                      fill="#FCFCFC"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_323_14364">
                                      <rect
                                        width="24"
                                        height="24"
                                        rx="6"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </SvgIcon>
                            }
                          />
                        </TableCell>
                      )}

                      {Object.keys(row).map((x, index) => {
                        return (
                          <TableCell key={index} align="right">
                            {typeof row[x] === "object" &&
                              Object.keys(row[x])?.length > 0 &&
                              row[x].type === "text" && (
                                <Typography
                                  sx={{
                                    fontSize: "12px",
                                    borderRadius: "8px",
                                    padding: "5px",
                                    color: 'red',
                                    //  colors[row[x].status],
                                    textAlign: "center",
                                  }}
                                  variant="h6"
                                  id="tableTitle"
                                  component="h6"
                                >
                                  {row[x].value}
                                </Typography>
                              )}
                           
                           
                            
                            {typeof row[x] === "object" &&
                              Object.keys(row[x])?.length > 0 &&
                              row[x].type === "EventModal" && (
                                <Button variant="contained" disableElevation
                                  onClick={() => props.show(row["id"])}
                                  sx={{
                                    fontSize: "12px",
                                    textAlign: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    m: "auto"
                                  }}>
                                  {row[x].value}
                                  {row[x].icon &&
                                    <SvgIcon
                                      sx={{
                                        width: "23px",
                                        height: "23px",
                                        mr: "5px",
                                      }}
                                    >
                                      {Svg[row[x].icon]}
                                    </SvgIcon>
                                  }

                                </Button>

                              )}
                            {typeof row[x] === "object" &&
                              Object.keys(row[x])?.length > 0 &&
                              row[x].type === "textWidthIcon" && (
                                <Typography
                                  sx={{
                                    fontSize: "12px",
                                    textAlign: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    cursor: "pointer",
                                  }}
                                  variant="h6"
                                  id="tableTitle"
                                  component="a"
                                  href={row[x].href}
                                >
                                  {row[x].value}
                                  <SvgIcon
                                    sx={{
                                      width: "23px",
                                      height: "23px",
                                      mr: "5px",
                                    }}
                                  >
                                    {Svg[row[x].icon]}
                                  </SvgIcon>
                                </Typography>
                              )}

                            {typeof row[x] === "object" &&
                              Object.keys(row[x])?.length > 0 &&
                              row[x].type === "textWithImage" && (
                                <Typography
                                  sx={{
                                    fontSize: "12px",
                                    textAlign: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    cursor: "pointer",
                                  }}
                                  variant="h6"
                                  id="tableTitle"
                                  component="a"
                                  href={row[x].href}
                                >
                                  <Avatar
                                    src={row[x].img}
                                    sx={{
                                      width: "25px",
                                      height: "25px",
                                      ml: "10px",
                                    }}
                                  />
                                  {row[x].value}
                                </Typography>
                              )}

                            {(typeof row[x] === "object" &&
                              Object.keys(row[x])?.length > 0) !== true && (
                                <Typography
                                  sx={{ fontSize: "14px", textAlign: "left", color: "#212121  " }}
                                  variant="h6"
                                  id="tableTitle"
                                  component="h6"

                                >
                                  {row[x]}
                                </Typography>
                              )}
                          </TableCell>
                        );
                      })}

                      {withBtn === true && (
                        <TableCell key={index} align="right">
                          {Object.keys(row).map((x, index) => {
                            return (
                              typeof row[x] === "object" &&
                              Object.keys(row[x])?.length > 0 &&
                              row[x].type === "btn" && (
                                <Button
                                  key={index}
                                  sx={{
                                    backgroundColor: "#d8ab2d",
                                    color: "#fff",
                                    fontSize: "10px",
                                  }}
                                >
                                  {row[x].value}
                                </Button>
                              )
                            );
                          })}
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              {/* {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </TableContainer>


        <TablePagination
          labelDisplayedRows={({ from, to, count }) =>
            `نمایش مورد ${from} تا ${to} از ${count} مورد`
          }
          labelRowsPerPage="نمایش در هر صفحه"
          sx={{
            fontSize: "12px",
            "& p": {
              fontSize: "12px",
            },
            color: "#fff"
          }}
          rowsPerPageOptions={[props.rowsPerPage]}
          component="div"
          count={props.total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          backIconButtonProps={{
            style: { transform: "rotate(180deg)" },
          }}
          nextIconButtonProps={{
            style: { transform: "rotate(180deg)" },
          }}
        />


      </Paper>
    </Box>
  );
}