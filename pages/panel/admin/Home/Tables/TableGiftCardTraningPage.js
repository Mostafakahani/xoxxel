import HandleTableGiftCardTraning from "Components/Common/HomePageSteps/TableGiftCards/HandleTables/HandleTableGiftCardTraning";
import { Button, Dialog, DialogContent, Grid, Typography } from "@mui/material";
import { useState } from "react";
const TableGiftCardTraningPage = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => { setOpen(true); };
    const handleClose = () => { setOpen(false); };
    return (
        <>
            <Grid >
                <Grid md={6}>
                    <Button variant="contained" onClick={handleOpen} style={{ marginLeft: '10px' }}>
                        صفحه اصلی Trending gift card
                    </Button>
                    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                        <DialogContent>
                            <Grid container >
                                <Grid item container>
                                    <HandleTableGiftCardTraning />
                                </Grid>
                                <Grid item container spacing={1} >
                                    <Grid item md={2}>
                                        <Button onClick={handleOpen} variant="contained" color="primary" disableElevation >ذخیره تغییرات</Button>
                                    </Grid>
                                    <Grid item md={2}>
                                        <Button onClick={handleClose} variant="outlined" color="error" disableElevation >انصراف </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </DialogContent>
                    </Dialog>
                </Grid>
            </Grid>
        </>
    )
}
export default TableGiftCardTraningPage;