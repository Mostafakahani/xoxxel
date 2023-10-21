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
import { AccordionSummary, Accordion, AccordionDetails, Avatar, Button, Dialog, DialogContent, DialogContentText, FormControlLabel, Grid, TextField } from "@mui/material";
import StatusButton from "Components/Common/StatusButton";
import { EyesIcon } from "Icons/icons";
import Link from "next/link";

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

  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState({
    accessCustomerList: false,
    accessCustomerInfo: false,
    accessNotes: false,
    accessAttachment: false,
    accessCreateCustomer: false,
    accessActivityCustomer: false,
    accessDocumentsCustomer: false,
    accessHistoryCustomer: false,
    allAccess: false,
    customAccess: false,
  });

  const handleChange = (event, name) => {
    setChecked({
      ...checked,
      [name]: event.target.checked,
    });
  };

  const logValues = () => {
    // جمع‌آوری مقادیر انتخابی
    const values = {
      accessCustomerList: checked.accessCustomerList,
      accessCustomerInfo: checked.accessCustomerInfo,
      accessNotes: checked.accessNotes,
      accessAttachment: checked.accessAttachment,
      accessCreateCustomer: checked.accessCreateCustomer,
      accessActivityCustomer: checked.accessActivityCustomer,
      accessDocumentsCustomer: checked.accessDocumentsCustomer,
      accessHistoryCustomer: checked.accessHistoryCustomer,
      customAccess: checked.customAccess,
      allAccess: checked.allAccess
    };

    // چاپ مقادیر در کنسول
    console.log("مقادیر:", values);
  };

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'row', ml: 3, justifyContent: 'space-around' }}>
      <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
        <FormControlLabel
          label="لیست اشخاص"
          control={
            <Checkbox
              checked={checked.accessCustomerList}
              onChange={(event) => handleChange(event, 'accessCustomerList')}
            />
          } />
        <FormControlLabel
          label="اطلاعات اشخاص"
          control={
            <Checkbox
              checked={checked.accessCustomerInfo}
              onChange={(event) => handleChange(event, 'accessCustomerInfo')}
            />
          }
        />
        <FormControlLabel
          label="یادداشت ها"
          control={
            <Checkbox
              checked={checked.accessNotes}
              onChange={(event) => handleChange(event, 'AccessNotes')}
            />
          }
        />
        <FormControlLabel
          label="پیوست ها"
          control={
            <Checkbox
              checked={checked.accessAttachment}
              onChange={(event) => handleChange(event, 'AccessAttachment')}
            />
          }
        />
      </Grid>
      <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
        <FormControlLabel
          label="ایجاد شخص"
          control={
            <Checkbox
              checked={checked.accessCreateCustomer}
              onChange={(event) => handleChange(event, 'AccessCreateCustomer')}
            />
          }
        />
        <FormControlLabel
          label="فعالیت"
          control={
            <Checkbox
              checked={checked.accessActivityCustomer}
              onChange={(event) => handleChange(event, 'AccessActivityCustomer')}
            />
          }
        />
        <FormControlLabel
          label="اسناد ها"
          control={
            <Checkbox
              checked={checked.accessDocumentsCustomer}
              onChange={(event) => handleChange(event, 'AccessDocumentsCustomer')}
            />
          }
        />
        <FormControlLabel
          label="سابقه ها"
          control={
            <Checkbox
              checked={checked.accessHistoryCustomer}
              onChange={(event) => handleChange(event, 'AccessHistoryCustomer')}
            />
          }
        />
      </Grid>
    </Box>
  );


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
                            <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
                              {/* <Button
                                onClick={(x) => console.log(row.data[0])}
                                // onClick={() => props.show(row["id"])}

                                sx={{ backgroundColor: '#1C49F11A', color: '#1C49F1', borderRadius: "5px", mr: "10px" }}>

                              </Button> */}
                              <Button onClick={() => setOpen(true)} sx={{ backgroundColor: '#1C49F11A', color: '#1C49F1', borderRadius: "5px" }}>
                                <Grid style={{ display: 'flex', alignItems: 'center', color: '#1C49F1' }}>
                                  <EyesIcon />
                                  <Typography>مشاهده و ویرایش</Typography>
                                </Grid>
                              </Button>
                            </Grid>
                            <Dialog
                              fullWidth
                              maxWidth={'sm'}
                              open={open}
                              onClose={() => {
                                setOpen(false)
                              }}
                            >
                              <DialogContent
                                sx={{ px: "50px", py: "30px" }}
                              >
                                <Typography align="left" sx={{ my: ' 15px' }}>ایجاد ویژگی محصول</Typography>
                                <Grid sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                  <TextField
                                    size={'small'}
                                    label={'نوع'}
                                  />
                                  <TextField
                                    size={'small'}
                                    label={'کارمند'}
                                  />

                                </Grid>
                                <Grid>
                                  <FormControlLabel
                                    label="همه دسترسی ها"
                                    control={
                                      <Checkbox
                                        checked={checked.allAccess}
                                        onChange={(event) => handleChange(event, 'AllAccess')}
                                      />
                                    }
                                  />
                                  <FormControlLabel
                                    label="دسترسی اختصاصی"
                                    control={
                                      <Checkbox
                                        checked={checked.customAccess}
                                        onChange={(event) => handleChange(event, 'CustomAccess')}
                                      />
                                    }
                                  />
                                </Grid>

                                <Grid>
                                  <Accordion>
                                    <AccordionSummary
                                      // expandIcon={<ExpandMoreIcon />}
                                      aria-controls="panel1a-content"
                                      id="panel1a-header"
                                    >
                                      <FormControlLabel
                                        label="اشخاص"
                                        control={
                                          <Checkbox
                                            checked={checked[0] && checked[1]}
                                            indeterminate={checked[0] !== checked[1]}
                                            onChange={checked}
                                          />
                                        }
                                      />
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      {children}
                                    </AccordionDetails>
                                  </Accordion>
                                </Grid>
                                <Grid>
                                  <Button variant="contained" onClick={logValues} disableElevation sx={{ borderRadius: '8px', backgroundColor: '#e0b207', color: '#000', fontWeight: 800 }}>ایجاد</Button>
                                </Grid>
                              </DialogContent>
                            </Dialog>
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
