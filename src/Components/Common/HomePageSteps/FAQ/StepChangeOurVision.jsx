import { Grid, TextField, Typography } from "@mui/material";

const StepChangeOurVision =({ title, description, onFieldChange }) => {
    const handleChange = (fieldName, value) => {
        onFieldChange(fieldName, value);
    };

    return (
        <>
            <Grid sx={{ border: '2px dashed #5a5a5a75', borderRadius: '10px', my: '15px', boxShadow: 'none', p: '20px' }}>
                <Typography sx={{ color: '#2C7EFA', my: '10px', fontSize: '16px' }}> Our vision </Typography>
                <Grid>
                    <Grid container>
                        <Grid container>
                            <Grid item xs={12} sm={7} md={6}>
                                <TextField
                                    onChange={(e) => handleChange("title", e.target.value)}
                                    value={title}
                                    label="عنوان"
                                    variant="outlined"
                                    sx={{ width: { xs: "100%", sm: "100%", md: "100%" }, my: "10px" }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} sm={7} md={12}>
                                <TextField
                                    onChange={(e) => handleChange("description", e.target.value)}
                                    value={description}
                                    label="متن"
                                    variant="outlined"
                                    multiline
                                    flexGrow={1}
                                    sx={{ width: { xs: "100%", sm: "100%", md: "100%" }, my: "10px" }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/*
      Add any other components or logic you might need here
      */}
        </>
    );
};

export default StepChangeOurVision;
