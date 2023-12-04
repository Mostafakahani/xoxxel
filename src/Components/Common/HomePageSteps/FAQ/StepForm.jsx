// StepForm.js
import React from 'react';
import { Grid, Typography, Accordion, AccordionSummary, AccordionDetails, TextField, Button } from "@mui/material";
import BackArrow from "Components/Common/Back";
import StandardImageList from "Components/Common/Images";

const StepForm = ({ expanded, handleChange, data, handleFieldChange, selectedFileItem, setSelectedFileItem, titel, setTitel, text, setText }) => {
  return (
    <Grid sx={{ backgroundColor: '#fff', p: '25px' }}>
      <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '10px' }}>
        <Typography sx={{ color: '#333333', my: '15px', fontSize: '18px' }}> مراحل صفحه اصلی</Typography>
        <BackArrow />
      </Grid>

      <Accordion expanded={expanded} onChange={handleChange} sx={{ border: '2px dashed #5a5a5a75', borderRadius: '10px', my: '15px', boxShadow: 'none' }}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography sx={{ color: '#2C7EFA', my: '15px', fontSize: '16px' }}>مرحله اول</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid>
            <Grid container>
              <Grid container>
                <Grid item xs={12} sm={7} md={4}>
                  <TextField
                    onChange={(e) => handleFieldChange("title", e.target.value)}
                    value={data.title}
                    label="نام"
                    variant="outlined"
                    sx={{ width: { xs: '100%', sm: '100%', md: '100%' }, my: '10px' }}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={7} md={7}>
                  <TextField
                    onChange={(e) => setTitel(e.target.value)}
                    value={titel}
                    label="عنوان"
                    variant="outlined"
                    sx={{ width: { xs: '100%', sm: '100%', md: '100%' }, my: '10px' }}
                  />
                </Grid>
              </Grid>
              <Grid xs={12} md={12}>
                <TextField
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                  label="متن"
                  variant="outlined"
                  type="text"
                  multiline
                  sx={{ width: { xs: '100%', sm: '100%', md: '100%' }, my: '10px' }}
                />
              </Grid>
              <Grid container>
                <StandardImageList
                  label={'ویدیو ( 728*357)'}
                  onChange={(e) => {
                    setSelectedFileItem(e);
                    console.log(e);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* ... بقیه بخش‌ها و کدها ... */}

      <Grid sx={{ my: '20px' }}>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={() => console.log(data)}
        >ذخیره تغییرات
        </Button>
      </Grid>
    </Grid>
  );
};

export default StepForm;
