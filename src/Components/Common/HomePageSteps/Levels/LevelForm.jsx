// LevelForm.js
import React from "react";
import {
  Button,
  Grid,
  InputLabel,
  TextField,
  CircularProgress,
} from "@mui/material";
import StandardImageList from "Components/Common/Images";

const LevelForm = ({
  name,
  title,
  description,
  selectedFileItem,
  onAddRow,
  onEditRow,
  onCancelEdit,
  onSaveEdit,
  setName,
  setTitle,
  setDescription,
  setSelectedFileItem,
  editingRowId,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item container xs={12} md={12} spacing={2} display={"flex"} alignItems={"center"}>
        <Grid item xs={12} md={6}>
          <InputLabel>نام</InputLabel>
          <TextField
            value={name}
            error={name.length < 3 && name !== ""}
            helperText={name.length < 3 && name !== "" ? "حداقل سه کاراکتر وارد کنید" : ""}
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item md={6}>
          <StandardImageList
            label={"ویدیو (728*357)"}
            onChange={(e) => setSelectedFileItem(e)}
            idStorage={selectedFileItem.length !== 0 ? true : false}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} md={12}>
        <InputLabel>عنوان</InputLabel>
        <TextField
          value={title}
          error={title.length < 3 && title !== ""}
          helperText={title.length < 3 && title !== "" ? "حداقل سه کاراکتر وارد کنید" : ""}
          fullWidth
          multiline
          onChange={(e) => setTitle(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <InputLabel>متن</InputLabel>
        <TextField
          value={description}
          error={description.length < 3 && description !== ""}
          helperText={description.length < 3 && description !== "" ? "حداقل سه کاراکتر وارد کنید" : ""}
          fullWidth
          multiline
          onChange={(e) => setDescription(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <Button
          sx={{ my: 2 }}
          variant="contained"
          size="medium"
          color="primary"
          onClick={onAddRow}
          disabled={name !== "" && selectedFileItem.length !== 0 && title !== "" && description !== "" && editingRowId === null ? false : true}
        >
          افزودن به لیست +
        </Button>
      </Grid>
    </Grid>
  );
};

export default LevelForm;
