import HandleTables from "Components/Common/HomePageSteps/TableGiftCards/HandleTables/HandleTables";
import { Button, Dialog, DialogContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ServerURL from "Components/Common/Layout/config";
import { toast } from "react-toastify";
import axios from "axios";
import AccountLayout from "Components/Common/Layout/AccountLayout";
import BackArrow from "Components/Common/Back";

const TableGiftCardTraningPage = () => {
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState([]);
    const handleOpen = () => { setOpen(true); };
    const handleClose = () => { setOpen(false); };

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

            const response = await axios.post(`${ServerURL.url}/admin/sliders/giftcart/trend-gift-cart/create`, data, config);

            toast.success("عملیات انجام شد");
        } catch (error) {
            console.error("Error in add", error);
            toast.error("خطا در افزودن");
        }
    };


    return (
        <>
            <AccountLayout>
                <Grid >
                    <Grid container>
                        <Grid container >
                            <Grid item container>
                            <HandleTables labelTable={'Trending Giftcard'} getLinkTable={'/admin/sliders/trend-gift-cart/list'} setSelectedId={setSelectedId} />
                            </Grid>
                            <Grid item container spacing={1} >
                                <Grid item md={2}>
                                    <Button onClick={handleCreate} variant="contained" color="primary" disableElevation >ذخیره تغییرات</Button>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </AccountLayout>
        </>
    )
}
export default TableGiftCardTraningPage;