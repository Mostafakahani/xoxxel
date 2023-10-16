import { Button, Dialog, DialogContent, Grid, Typography } from "@mui/material";
import { useState } from "react";
import TableGiftCardTraningPage from "./TableGiftCardTraningPage";
import TableTopUpGamesPage from "./TableTopUpGamesPage";

const ListTablePopup = () => {


    return (
        <>
            <Grid container>
                <Grid container>
                    <Typography>List Tables</Typography>
                </Grid>
                <Grid md={6}>
                    <TableGiftCardTraningPage />
                </Grid>
                <Grid md={6}>
                    <TableTopUpGamesPage />
                </Grid>












            </Grid>


        </>
    )
}
export default ListTablePopup; 