import { Button, Dialog, DialogContent, Grid, Typography } from "@mui/material";
import HandleTableCategoryTopUpForYou from "Components/Common/HomePageSteps/TableGiftCards/HandleTables/HandleTableCategoryTopUpForYou";
import { useState } from "react";
const TableProducts = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => { setOpen(true); };
    const handleClose = () => { setOpen(false); };
    return (
        <>
            <Grid>
                <Grid md={6}>
                    <HandleTableCategoryTopUpForYou />
                </Grid>

            </Grid>
        </>
    )
}
export default TableProducts;