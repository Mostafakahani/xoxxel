import { Button, Dialog, DialogContent, Grid, Typography } from "@mui/material";
import { useState } from "react";
import TableGiftCardTraningPage from "./TableGiftCardTraningPage";
import TableTopUpGamesPage from "./TableTopUpGamesPage";
import TableTrendingGamePage from "./TableTrendingGamePage";
import TablePupolarGiftCardPage from "./TablePupolarGiftCardPage";

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
                <Grid md={6}>
                    <TableTrendingGamePage />
                </Grid>
                <Grid md={6}>
                    <TablePupolarGiftCardPage />
                </Grid>












            </Grid>


        </>
    )
}
export default ListTablePopup; 