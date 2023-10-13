import { Grid, TextField, Typography } from "@mui/material";
import UploadFile from "../UploadFile";

const StepOne = () => {
    return (
        <>
            <Grid sx={{ border: '2px dashed #5A5A5A', borderRadius: '10px', p: '20px' }}>
                <Grid container>
                    <Grid container>
                        <Grid md={4}>
                            <TextField
                                // error={!priceError ? false : true}
                                // helperText={!priceError ? '' : ErrorList[1]}
                                // onChange={(e) => setName(e.target.value)}
                                // value={name}
                                label="نام  "
                                variant="outlined"
                                sx={{ width: { xs: '100%', sm: '100%', md: '100%' }, my: '10px' }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid md={7}>
                            <TextField
                                // error={!priceError ? false : true}
                                // helperText={!priceError ? '' : ErrorList[1]}
                                // onChange={(e) => setName(e.target.value)}
                                // value={name}
                                label="نام  "
                                variant="outlined"
                                sx={{ width: { xs: '100%', sm: '100%', md: '100%' }, my: '10px' }}
                            />
                        </Grid>
                    </Grid>
                    <Grid md={12}>
                        <TextField
                            // error={!priceError ? false : true}
                            // helperText={!priceError ? '' : ErrorList[1]}
                            // onChange={(e) => setName(e.target.value)}
                            // value={name}
                            label="نام  "
                            variant="outlined"
                            type="text"
                            multiline
                            flexGrow={1}
                            sx={{ width: { xs: '100%', sm: '100%', md: '100%' }, my: '10px' }}
                        />
                    </Grid>
                    <Grid container>
                        <UploadFile
                            id={"file1"}
                            accept="video/*"
                            label={"ویدیو  ( 728*357)"}
                            onChange={(e) => console.log(e)}
                        />
                    </Grid>
                </Grid>
            </Grid>

        </>
    )
}
export default StepOne;