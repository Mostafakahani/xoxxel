import { Accordion, AccordionDetails, AccordionSummary, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

const StepChangeOurVision = () => {
    const [titel, setTitel] = useState('')
    const [text, setText] = useState('')
    const handleSubmit = () => {

    };

    return (
        <>
            <Grid sx={{ border: '2px dashed #5a5a5a75', borderRadius: '10px', my: '15px', boxShadow: 'none', p: '20px' }}>
                <Typography sx={{ color: '#2C7EFA', my: '10px', fontSize: '16px' }}> Our vision </Typography>
                <Grid >
                    <Grid container>
                        <Grid container>
                            <Grid item xs={12} sm={7} md={6}>
                                <TextField
                                    // error={!priceError ? false : true}
                                    // helperText={!priceError ? '' : ErrorList[1]}
                                    onChange={(e) => setTitel(e.target.value)}
                                    value={titel}
                                    label="عنوان  "
                                    variant="outlined"
                                    sx={{ width: { xs: '100%', sm: '100%', md: '100%' }, my: '10px' }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} sm={7} md={12}>
                                <TextField
                                    // error={!priceError ? false : true}
                                    // helperText={!priceError ? '' : ErrorList[1]}
                                    onChange={(e) => setText(e.target.value)}
                                    value={text}
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
    )
}
export default StepChangeOurVision;