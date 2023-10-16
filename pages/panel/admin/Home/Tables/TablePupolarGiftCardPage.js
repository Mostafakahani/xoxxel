import HandleTablePupolarGiftCard from "Components/Common/HomePageSteps/TableGiftCards/HandleTables/HandleTablePupolarGiftCard";
import { Button, Dialog, DialogContent, Grid, Typography } from "@mui/material";
import { useState } from "react";
const TablePupolarGiftCardPage = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => { setOpen(true); };
    const handleClose = () => { setOpen(false); };
    return (
        <>
            <Grid>
                <Grid md={6}>
                    <Button variant="contained" onClick={handleOpen} style={{ marginLeft: '10px' }}>
                        صفحه گیفت کارت
                        Pupolar gift card
                    </Button>
                    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                        <DialogContent>
                            <HandleTablePupolarGiftCard />
                        </DialogContent>
                        <Grid sx={{ m: '20px' }}>
                            <Button onClick={handleOpen} variant="contained" disableElevation sx={{ borderRadius: '5px', backgroundColor: '#1C49F1', color: '#FFFFFF' }}>ذخیره تغییرات</Button>
                            <Button onClick={handleClose} variant="outlined" disableElevation sx={{ border: '1px solid #989898', '&:hover': { border: '1px solid #989898' }, ml: '10px', borderRadius: '5px', color: '#222' }}>انصراف </Button>
                        </Grid>
                    </Dialog>
                </Grid>
            </Grid>
        </>
    )
}
export default TablePupolarGiftCardPage;