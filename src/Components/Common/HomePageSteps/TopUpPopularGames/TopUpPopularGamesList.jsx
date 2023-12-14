// LevelList.js
import React from "react";
import { Typography, Accordion, AccordionSummary, AccordionDetails, Grid, TextField, IconButton } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import StandardImageList from "Components/Common/Images";

const TopUpPopularGamesList = ({
  rows,
  expanded,
  handleChange,
  editingRowId,
  input1Edit,
  input2Edit,
  input3Edit,
  input4Edit,
  input5Edit,
  setInput1Edit,
  setInput2Edit,
  setInput3Edit,
  setInput4Edit,
  setInput5Edit,
  handleEditRow,
  handleCancelEdit,
  handleDeleteRow,
  handleSaveEdit,
  setSelectedFileItemEdit,
}) => {
  return (
    <div>
      <Typography variant="h6" style={{ marginTop: "15px" }}>
        لیست گیفت کارت ها (items)
      </Typography>
      {rows.length === 0 ? (
        <Typography my={2}>هیچ گیفت کارتی (items) وجود ندارد</Typography>
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
                <Typography sx={{ color: "#2C7EFA", my: "10px", fontSize: "16px", width: "100%", containerType: "inline-size", overflow: "hidden", textOverflow: "ellipsis" }}>{row.link || ''}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid container item xs={12} sm={12} md={12} spacing={3}>
                    <Grid container item xs={10} sm={11} md={11}>
                      <TextField
                        value={editingRowId === row.id ? input1Edit : row.link}
                        label='لینک (728*357)'
                        variant="outlined"
                        fullWidth
                        multiline
                        sx={{ my: "10px" }}
                        disabled={editingRowId !== row.id}
                        onChange={(e) => (editingRowId === row.id ? setInput1Edit(e.target.value) : {})}
                      />
                    </Grid>
                    <Grid container item xs={2} sm={1} md={1} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                      {/* <IconButton
                        size="medium"
                        color={editingRowId === row.id ? "success" : "default"}
                        fullWidth
                        sx={{ height: "fit-content" }}
                        onClick={() => (editingRowId === row.id ? handleSaveEdit(row.id, row.id_storage) : handleEditRow(row.id))}
                      >
                        {editingRowId === row.id ? <CheckIcon fontSize="small" /> : <ModeEditIcon fontSize="small" />}
                      </IconButton> */}
                      <IconButton
                        size="medium"
                        color="error"
                        fullWidth
                        sx={{ height: "fit-content" }}
                        onClick={() => (editingRowId === row.id ? handleCancelEdit(row.id) : handleDeleteRow(row.id))}
                      >
                        {editingRowId === row.id ? <CloseIcon fontSize="small" /> : <DeleteIcon fontSize="small" />}
                      </IconButton>
                    </Grid>
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

export default TopUpPopularGamesList;
