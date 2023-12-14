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

const TopUpPopularGamesForm = ({
  input1,
  input2,
  input3,
  input4,
  input5,
  selectedFileItem,
  onAddRow,
  onEditRow,
  onCancelEdit,
  onSaveEdit,
  setInput1,
  setInput2,
  setInput3,
  setInput4,
  setInput5,
  setSelectedFileItem,
  editingRowId,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item container xs={12} md={12} spacing={2} display={"flex"} alignItems={"center"}>
        <Grid item md={11}>
          <StandardImageList
            label={'تصویر'}
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
          label='تایتل'
          value={input2}
          error={input2.length < 3 && input2 !== ""}
          helperText={input2.length < 3 && input2 !== "" ? "حداقل سه کاراکتر وارد کنید" : ""}
          fullWidth
          multiline
          onChange={(e) => setInput2(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <TextField
          label='لینک'
          value={input1}
          error={input1.length < 3 && input1 !== ""}
          helperText={input1.length < 3 && input1 !== "" ? "حداقل سه کاراکتر وارد کنید" : ""}
          fullWidth
          multiline
          placeholder="https://"
          onChange={(e) => {
            const inputValue = e.target.value;
            const startsWithHttps = inputValue.toLowerCase().startsWith("https://");
            setInput1(startsWithHttps ? inputValue : `https://${inputValue}`);
          }}
        // onChange={(e) => setInput1(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <Button
          sx={{ my: 2 }}
          variant="contained"
          size="medium"
          color="primary"
          onClick={onAddRow}
          disabled={input1 !== "" && input2 !== "" && selectedFileItem.length !== 0 && editingRowId === null ? false : true}
        >
          افزودن به لیست +
        </Button>
      </Grid>
    </Grid>
  );
};

export default TopUpPopularGamesForm;
