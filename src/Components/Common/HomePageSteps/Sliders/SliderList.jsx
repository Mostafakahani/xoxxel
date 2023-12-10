// LevelList.js
import React from "react";
import { Typography, Accordion, AccordionSummary, AccordionDetails, Grid, TextField, IconButton } from "@mui/material";
// import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
// import CloseIcon from "@mui/icons-material/Close";
// import CheckIcon from "@mui/icons-material/Check";
// import StandardImageList from "Components/Common/Images";

const SliderList = ({
  rows,
  expanded,
  handleChange,
  editingRowId,
  // nameEdit,
  // titleEdit,
  // descriptionEdit,
  setNameEdit,
  // setTitleEdit,
  setDescriptionEdit,
  // handleEditRow,
  // handleCancelEdit,
  handleDeleteRow,
  // handleSaveEdit,
  // setSelectedFileItemEdit,
}) => {
  return (
    <div>
      <Typography variant="h6" style={{ marginTop: "15px" }}>
        لیست اسلایدر ها
      </Typography>
      {rows.length === 0 ? (
        <Typography my={2}>هیچ اسلایدری وجود ندارد</Typography>
      ) : (
        <div>
          {rows.map((row) => (
            <Accordion
              key={row.id}
              expanded={expanded === `panel${row.id}`}
              onChange={handleChange(`panel${row.id}`)}
              sx={{
                border: "2px dashed #5a5a5a75",
                borderRadius: "10px",
                my: "15px",
                boxShadow: "none",
              }}
            >
              <AccordionSummary aria-controls={`panel${row.id}d-content`} id={`panel${row.id}d-header`}>
                <Typography sx={{ color: "#2C7EFA", my: "10px", fontSize: "16px", width: "100%", containerType: "inline-size", overflow: "hidden", textOverflow: "ellipsis" }}>{row.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid container item xs={12} sm={12} md={12} spacing={3}>
                    <Grid container item xs={12} sm={5} md={6}>
                      <TextField
                        value={row.name}
                        label="متن"
                        variant="outlined"
                        fullWidth
                        sx={{ my: "10px" }}
                        disabled
                        onChange={(e) => (editingRowId === row.id ? setNameEdit(e.target.value) : {})}
                      />
                    </Grid>
                    <Grid item xs={8} sm={5} md={5} display={"flex"} alignItems={"center"}>
                      {/* <StandardImageList
                        label={"ویدیو (728*357)"}
                        onChange={(e) => (editingRowId === row.id ? setSelectedFileItemEdit(e) : null)}
                        disableStatus={editingRowId !== row.id}
                        idStorage={row.id_storage}
                      /> */}
                    </Grid>
                    <Grid container item xs={4} sm={2} md={1} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                      <IconButton
                        size="medium"
                        color="error"
                        fullWidth
                        sx={{ height: "fit-content" }}
                        onClick={() => (handleDeleteRow(row.id))}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <TextField
                      value={row.title}
                      label="لینک"
                      variant="outlined"
                      fullWidth
                      sx={{ my: "10px" }}
                      disabled
                    // disabled={editingRowId !== row.id}
                    // onChange={(e) => (editingRowId === row.id ? setTitleEdit(e.target.value) : {})}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      value={row.description}
                      label="متن دکمه (حداکثر 10 کاراکتر)"
                      variant="outlined"
                      fullWidth
                      sx={{ my: "10px" }}
                      disabled
                      onChange={(e) => (editingRowId === row.id ? setDescriptionEdit(e.target.value) : {})}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      )}
    </div>
  );
};

export default SliderList;
