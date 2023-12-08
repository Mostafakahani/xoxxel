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
import { Avatar, Button, Dialog, DialogContent, DialogTitle, Grid, MenuItem, Pagination, Select, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import StatusButton from "Components/Common/StatusButton";
import { EyesIcon } from "Icons/icons";
import AddProductFeatureNew from "../Popup/CreateProductOptionNew";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import ServerURL from "../Layout/config";
import GetToken from "GetToken";
import axios from "axios";

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount, dataHead, selected } = props;

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
            align={i === dataHead.length - 1 ? "left" : "center"}
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

export default function TableItems({
  dataHead,
  dataBody,
  setSelected = false,
  selected = false,
  setPage = () => { },
  setPerPage = () => { },
  pageData, // اضافه کردن اطلاعات صفحه به props


}, props) {
  const { page, perPage } = props;

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  // const [perPage, setPerPage] = React.useState(15);
  ////Dialog
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedRowId, setSelectedRowId] = React.useState(null);
  const [selectedStatus, setSelectedStatus] = React.useState('');
  const [submitToServer, setSubmitToServer] = React.useState('');
  const [count, setCount] = React.useState(0);
  const [alignment, setAlignment] = React.useState('');

  React.useEffect(() => {
    if (selectedStatus === 'waiting') {
      setAlignment('');
    } else if (selectedStatus === 'accepted') {
      setAlignment('accepted');
    }

    setSubmitToServer(alignment);
  }, [selectedStatus, count]);

  const handleChange = async (event, newAlignment) => {
    setAlignment(newAlignment);
    setSubmitToServer(newAlignment);
    if (newAlignment !== '' & newAlignment !== null) {
      try {
        const config = {
          headers: {
            Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}`,
          },
        };

        const sendData = {
          id_payment: selectedRowId,
          status: newAlignment,
        };

        const response = await axios.post(
          `${ServerURL.url}/admin/payment/change-status`,
          sendData,
          config
        );
        if (response.status === 201) {
          toast.success("با موفقیت تغغیر داده شد.");
          setCount(count + 1);
        } else {
          toast.error("لطفا دوباره امتحان کنید");
        }
      } catch (error) {
        console.error("Error sending delete request:", error);
      }
    }
  };

  const openDialog = (id) => {
    setIsDialogOpen(true);
    setSelectedRowId(id);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedRowId(null);
  };
  const handleStatusBtnClick = (id) => {
    openDialog(id);
  };


  // New for pages:
  const itemsPerPage = pageData.perPage;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const listPerPage = [15, 25, 50, 100]



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
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        limit={5}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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

            <Dialog open={isDialogOpen} onClose={closeDialog}>
              <DialogContent>
                <DialogTitle>{`Row ID: ${selectedRowId}`}</DialogTitle>

                <ToggleButtonGroup
                  color="primary"
                  value={selectedStatus === '' ? null : alignment}
                  exclusive
                  onChange={handleChange}
                  aria-label="Platform"
                >
                  <ToggleButton value="accepted" color="success">
                    Accepted
                  </ToggleButton>
                  <ToggleButton value="rejected" color="error">
                    Rejected
                  </ToggleButton>
                </ToggleButtonGroup>
              </DialogContent>
            </Dialog>

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
                          {e?.type === "statusBtn" && (
                            <StatusButton
                              {...e}
                              onClick={() => {
                                handleStatusBtnClick(row?.id);
                                setSelectedStatus(e?.text);
                              }}
                              variant="contained"
                            >
                              {e?.text}
                            </StatusButton>

                          )}
                          {e?.type === "btn" && (
                            <>
                              <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
                                {/* <AddProductFeatureNew tableId={row.data[0]} />
                              <Button
                                onClick={(x) => console.log(row.data[0])}
                                // onClick={() => props.show(row["id"])}

                                sx={{ backgroundColor: '#1C49F11A', color: '#1C49F1', borderRadius: "5px", mr: "10px" }}>

                              </Button>
                              <Button startIcon={<EyesIcon />} sx={{ backgroundColor: '#1C49F11A', color: '#1C49F1', borderRadius: "5px" }}>
                                <Link href={'/panel/admin/CreateProduct'} style={{ display: 'flex', alignItems: 'center', color: '#1C49F1' }}>
                                  مشاهده و ویرایش
                                </Link>
                              </Button> */}
                                <Button disabled startIcon={<EyesIcon />} sx={{ backgroundColor: '#1C49F11A', color: '#1C49F1', borderRadius: "5px" }}>
                                  <Link href={'/panel/admin/CreateProduct'} style={{ display: 'flex', alignItems: 'center', color: '#1C49F1' }}>
                                    مشاهده و ویرایش
                                  </Link>
                                </Button>
                              </Grid>
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
        {
          dataBody?.length === 0 && (
            <Typography
              component={"h6"}
              sx={{
                textAlign: "center",
                color: "black",
                my: 3
              }}
            >
              موردی پیدا نشد!
            </Typography>
          )
        }
        {dataBody?.length !== 0 && (
          <Grid
            spacing={5}
            display="flex"
            alignItems="center"
            sx={{ mt: 2, flexDirection: { xs: "row", sm: 'row', }, justifyContent: { xs: 'space-between', sm: 'center' } }}
          >
            <Grid item>
              <Stack spacing={2}>
                <Pagination
                  shape="rounded"
                  count={pageData.totalPages}
                  page={page}
                  onChange={(event, value) => setPage(value)}
                  color="standard"
                />
              </Stack>
            </Grid>
            <Grid item container xs={3} sm={2} md={1}>
              {/* <Typography
              sx={{
                fontSize: '11px',
                textAlign: "center",
                color: "black",
              }}
            >
              تعداد نمایش
            </Typography> */}
              <Select
                displayEmpty
                size="small"
                value={perPage}
                onChange={(e) => setPerPage(e.target.value)}
                sx={{ width: { xs: '100%', sm: "80%" } }}
                defaultValue={15}
              // onOpen={() => setCountTwo(countTwo + 1)}
              >
                {Array.isArray(listPerPage) ? (
                  listPerPage.map((data, index) => (
                    <MenuItem key={index} value={data}>
                      {data}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value={null}>
                    Loading...
                  </MenuItem>
                )}
              </Select>
            </Grid>
          </Grid>
        )}
      </Box >
    </>

  );
}
