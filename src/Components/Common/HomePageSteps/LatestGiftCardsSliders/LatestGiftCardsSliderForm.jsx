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

const LatestGiftCardsSliderForm = ({
  input3,
  input1,
  input2,
  selectedFileItem,
  onAddRow,
  onEditRow,
  onCancelEdit,
  onSaveEdit,
  setInput3,
  setInput1,
  setInput2,
  setSelectedFileItem,
  editingRowId,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item container xs={12} md={12} spacing={2} display={"flex"} alignItems={"center"}>
        <Grid item xs={12} md={5.5}>
          <InputLabel>نام</InputLabel>
          <TextField
            value={input3}
            error={input3.length < 3 && input3 !== ""}
            helperText={input3.length < 3 && input3 !== "" ? "حداقل سه کاراکتر وارد کنید" : ""}
            fullWidth
            onChange={(e) => setInput3(e.target.value)}
          />
        </Grid>
        <Grid item md={5.5}>
          <StandardImageList
            label={"ویدیو (728*357)"}
            onChange={(e) => setSelectedFileItem(e)}
            idStorage={selectedFileItem.length !== 0 ? true : false}
          />
        </Grid>
        <Grid item md={1} sx={{ display: { xs: 'none', md: 'block' } }}>
          <BackArrow />
        </Grid>
      </Grid>
      <Grid item xs={12} md={12}>
        <InputLabel>عنوان</InputLabel>
        <TextField
          value={input1}
          error={input1.length < 3 && input1 !== ""}
          helperText={input1.length < 3 && input1 !== "" ? "حداقل سه کاراکتر وارد کنید" : ""}
          fullWidth
          multiline
          onChange={(e) => setInput1(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <InputLabel>متن</InputLabel>
        <TextField
          value={input2}
          error={input2.length < 3 && input2 !== ""}
          helperText={input2.length < 3 && input2 !== "" ? "حداقل سه کاراکتر وارد کنید" : ""}
          fullWidth
          multiline
          onChange={(e) => setInput2(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <Button
          sx={{ my: 2 }}
          variant="contained"
          size="medium"
          color="primary"
          onClick={onAddRow}
          disabled={input3 !== "" && selectedFileItem.length !== 0 && input1 !== "" && input2 !== "" && editingRowId === null ? false : true}
        >
          افزودن به لیست +
        </Button>
      </Grid>
    </Grid>
  );
};

export default LatestGiftCardsSliderForm;
