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
import BackArrow from "Components/Common/Back";

const SliderForm = ({
  name,
  title,
  description,
  selectedFileItem,
  onAddRow,
  // onEditRow,
  // onCancelEdit,
  // onSaveEdit,
  setName,
  setTitle,
  setDescription,
  setSelectedFileItem,
  editingRowId,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item container xs={12} md={12} spacing={2} display={"flex"} alignItems={"center"}>
        <Grid item xs={12} md={5.5}>
          <TextField
            label='متن'
            value={name}
            error={name.length < 3 && name !== ""}
            helperText={name.length < 3 && name !== "" ? "حداقل سه کاراکتر وارد کنید" : ""}
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item md={5.5}>
          <StandardImageList
            label={'تصویر (728*357)'}
            onChange={(e) => setSelectedFileItem(e)}
            idStorage={selectedFileItem.length !== 0 ? true : false}
          />
        </Grid>
        <Grid item md={1} sx={{ display: { xs: 'none', md: 'block' } }}>
          <BackArrow />
        </Grid>
      </Grid>
      <Grid item xs={12} md={12}>
        <TextField
          label='لینک'
          placeholder="https://"
          value={title}
          error={title.length < 3 && title !== ""}
          helperText={title.length < 3 && title !== "" ? "حداقل سه کاراکتر وارد کنید" : ""}
          fullWidth
          multiline
          onChange={(e) => {
            const inputValue = e.target.value;
            const startsWithHttps = inputValue.toLowerCase().startsWith("https://");
            setTitle(startsWithHttps ? inputValue : `https://${inputValue}`);
          }}
        />

      </Grid>
      <Grid item xs={12} md={12}>
        <TextField
          label="متن دکمه (حداکثر 10 کاراکتر)"
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
          افزودن به اسلایدر ها +
        </Button>
      </Grid>
    </Grid>
  );
};

export default SliderForm;
