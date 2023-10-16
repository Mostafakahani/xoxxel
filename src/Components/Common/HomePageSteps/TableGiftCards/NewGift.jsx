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
import { Avatar, Button, Grid, InputAdornment, SvgIcon, TextField } from "@mui/material";
import StatusButton from "Components/Common/StatusButton";
import { EyesIcon } from "Icons/icons";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import SearchComponent from "./Search";

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





  // Search
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(dataBody);

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredData(dataBody);
    } else {
      const lowercaseSearchText = searchText.toLowerCase();
      const filteredItems = dataBody.filter(row => {
        const hasTextBold = row.data.some(e => e.type === 'textBold' && e.text.toLowerCase().includes(lowercaseSearchText));
        return hasTextBold;
      });
      setFilteredData(filteredItems);
    }
  }, [searchText, dataBody]);




  return (
    <Box sx={{ width: "100%" }}>
      <Typography sx={{ color: '#3C3C3C', fontWeight: 700, my: '15px' }}>
        صفحه اصلی Trending gift card
      </Typography>
      <Grid sx={{ width: { xs: '100%', sm: '60%', md: '50%', lg: '30%' }, my: '15px' }}>
        <TextField
          size="small"
          placeholder="جستجو محصول مورد نظر"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{
            "& input::placeholder": {
              fontSize: 13, 
              // color: "#B0B0B0", 
            }, mb: 2, backgroundColor: '#EBEBEC', borderRadius: '15px', border: 'none', "& fieldset": {border: 'none' }, }}
        InputProps={{
          startAdornment: <InputAdornment position="start">
            <Box component={'img'} src="/images/light.svg" />
          </InputAdornment>,

        }}
          
        />
      </Grid>
      <TableContainer className="container-table table-scroll" sx={{ border: '1px solid #E0E0E0', borderRadius: '15px', py: ' 15px', px: '5px' }}>
        <Table
          stickyHeader
          aria-label="sticky table"
          sx={{
            borderRadius: "8px",
            overflow: "hidden",
            minWidth: 500,
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
            {filteredData?.length !== 0 &&
              filteredData?.map((row, index) => {
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
                              {/* <AddProductFeatureNew tableIdi={row.data[0]} /> */}
                              {/* <Button
                                onClick={(x) => console.log(row.data[0])}
                                // onClick={() => props.show(row["id"])}

                                sx={{ backgroundColor: '#1C49F11A', color: '#1C49F1', borderRadius: "5px", mr: "10px" }}>

                              </Button> */}
                              <Button sx={{ backgroundColor: '#1C49F11A', color: '#1C49F1', borderRadius: "5px" }}>
                                <Link href={'/panel/admin/CreateProduct'} style={{ display: 'flex', alignItems: 'center', color: '#1C49F1' }}>
                                  <EyesIcon />
                                  <Typography>مشاهده و ویرایش</Typography>
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
