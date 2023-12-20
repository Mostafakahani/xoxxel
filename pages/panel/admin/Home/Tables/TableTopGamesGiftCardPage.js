import HandleTables from "Components/Common/HomePageSteps/TableGiftCards/HandleTables/HandleTables";
import { Button, Dialog, DialogContent, Grid, Typography } from "@mui/material";
import { useState } from "react";
import ServerURL from "Components/Common/Layout/config";
import axios from "axios";
import { toast } from "react-toastify";
import AccountLayout from "Components/Common/Layout/AccountLayout";

const TableTopGamesGiftCardPage = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => { setOpen(true); };
    const handleClose = () => { setOpen(false); };
    const [selectedId, setSelectedId] = useState([]);
    const handleCreate = async () => {
        const config = {
            headers: {
                Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}`
            }
        };
        try {
            const data = {
                id_products: selectedId
            }

            const response = await axios.post(`${ServerURL.url}/admin/sliders/top-up/top-up/create`, data, config);

            toast.success("عملیات انجام شد");
        } catch (error) {
            console.error("Error in add", error);
            toast.error("خطا در افزودن");
        }
    };

    return (
        <>
            <AccountLayout>
                <Grid container>
                    <Grid item container >
                        <Grid item container>
                            <HandleTables labelTable={'Category Top games'} getLinkTable={'/admin/sliders/top-up/top-up/list'} setSelectedId={setSelectedId} />
                        </Grid>
                    </Grid>
                    <Grid item container spacing={1} >
                        <Grid item md={2}>
                            <Button onClick={handleCreate} variant="contained" disableElevation sx={{ borderRadius: '5px', backgroundColor: '#1C49F1', color: '#FFFFFF' }}>ذخیره تغییرات</Button>
                            {/* <Button onClick={handleClose} variant="outlined" disableElevation sx={{ border: '1px solid #989898', '&:hover': { border: '1px solid #989898' }, ml: '10px', borderRadius: '5px', color: '#222' }}>انصراف </Button> */}
                        </Grid>
                    </Grid>
                </Grid>
            </AccountLayout>
        </>
    )
}
export default TableTopGamesGiftCardPage;