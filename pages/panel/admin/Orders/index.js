import { Button, Grid, Typography } from "@mui/material";
import AccountLayout from "Components/Common/Layout/AccountLayout";
import { IconAccess, IconOrders, IconPrice } from "Icons/icons";
import Link from "next/link";
import TableOrders from 'Components/Common/TableItems/TableOrders'
import { useState } from "react";

const Orders = () => {
    const [selected, setSelected] = useState([]);
    const dataHead = [
        "کد سفارش",
        "کاربر",
        "نام محصول ",
        "نوع",
        "تاریخ ایجاد",
        "مبلغ",
        "وضعیت",
        "اقدامات",
    ]
    const dataBody = [
        {
            id: 1,
            data: [
                "#254",

                {
                    type: "text",
                    text: "Soroush norozy",
                },
                {
                    type: "textBold",
                    text: "Call of duty mobile",
                },
                {
                    type: "text",
                    text: "Top ups",
                },
                {
                    type: "text",
                    text: "1401/7/7",
                },
                {
                    type: "text",
                    text: "2,000,000",
                },
                {
                    type: "status",
                    text: "Succesfull",
                    color: "Succesfull",
                },
                {
                    type: "btn",
                    text: "opto",
                },

            ],
        },


    ]
    const [selectedItemId, setSelectedItemId] = useState(null);


    return (
        <>
            <AccountLayout>
                <Grid container spacing={2} justifyContent="flex-end" alignItems="center">
                    <Grid item xs={6} md={6} sx={{ mb: { xs: '0px', md: '0' } }}>
                        <Grid sx={{ display: 'flex' }}>
                            <IconOrders />
                            <Typography sx={{ ml: "10px" }}>لیست سفارشات</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Grid sx={{
                            display: 'flex', flexDirection: 'row',
                            flexWrap: { xs: 'nowrap', md: 'wrap' },
                            overflowX: { xs: "auto", md: 'unset' },
                            whiteSpace: { xs: "nowrap", md: 'unset' },
                            justifyContent: { xs: 'flex-end', md: 'flex-end' },
                            alignItems: 'center'
                        }}>
                            <Button variant="contained" disableElevation sx={{ borderRadius: '5px', backgroundColor: '#1C49F1', color: '#FFFFFF' }}>ایجاد دسترسی جدید   </Button>

                        </Grid>
                    </Grid>
                </Grid>
                <Grid sx={{ mt: '20px' }}>
                    <TableOrders
                        selected={selected}
                        setSelected={setSelected}
                        dataHead={dataHead}
                        dataBody={dataBody}
                        // show={(x) => console.log(dataBody.data[0])}
                        selectedItemId={selectedItemId} />
                    <Button variant="contained" disableElevation sx={{ borderRadius: '5px', backgroundColor: '#1C49F1', color: '#FFFFFF', my: '15px' }}>آپدیت قیمت </Button>
                    <Button variant="outlined" disableElevation sx={{ border: '1px solid #989898', '&:hover': { border: '1px solid #989898' }, ml: '10px', borderRadius: '5px', color: '#222' }}>ریست کردن </Button>

                </Grid>
            </AccountLayout>
        </>
    )
}
export default Orders;