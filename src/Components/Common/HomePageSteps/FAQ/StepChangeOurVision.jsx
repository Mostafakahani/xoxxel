import { Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

const StepChangeOurVision = ({ getTitel, des, handleChange }) => {
    const [titel, setTitel] = useState(getTitel);
    const [text, setText] = useState(des);

    return (
        <>
            <Grid sx={{ border: '2px dashed #5a5a5a75', borderRadius: '10px', my: '15px', boxShadow: 'none', p: '20px' }}>
                <Typography sx={{ color: '#2C7EFA', my: '10px', fontSize: '16px' }}> Our vision </Typography>
                <Grid>
                    <Grid container>
                        <Grid container>
                            <Grid item xs={12} sm={7} md={6}>
                                <TextField
                                    onChange={(e) => {
                                        const newTitel = e.target.value;
                                        setTitel(newTitel);
                                        handleChange(newTitel, text);
                                    }}
                                    value={titel || getTitel}
                                    label="عنوان  "
                                    variant="outlined"
                                    sx={{ width: { xs: '100%', sm: '100%', md: '100%' }, my: '10px' }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} sm={7} md={12}>
                                <TextField
                                    onChange={(e) => {
                                        const newText = e.target.value;
                                        setText(newText);
                                        handleChange(titel, newText);
                                    }}
                                    value={text || des}
                                    label="متن  "
                                    variant="outlined"
                                    multiline
                                    flexGrow={1}
                                    sx={{ width: { xs: '100%', sm: '100%', md: '100%' }, my: '10px' }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default StepChangeOurVision;
