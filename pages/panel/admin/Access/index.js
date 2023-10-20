import { Button, Grid, Typography } from "@mui/material";
import AccountLayout from "Components/Common/Layout/AccountLayout";
import { IconAccess, IconPrice } from "Icons/icons";
import Link from "next/link";
import TableUpdatePrice from 'Components/Common/TableItems/TableUpdatePrice'
import { useState } from "react";

const Access = () => {
    const [selected, setSelected] = useState([]);
    const dataHead = ["کد محصول", "ویژگی ", "نوع ", "ریجن", " دسته", "قیمت به دلار"]
    const dataBody = [
        {
            id: 1,
            data: [
                "#254",

                {
                    type: "text",
                    text: "120 Cp",
                },
                {
                    type: "textBold",
                    text: "Top ups",
                },
                {
                    type: "text",
                    text: "United state",
                },
                {
                    type: "text",
                    text: "Cp",
                },
                {
                    type: "input",
                    text: "1401/7/7",
                },
            ],
        },
        {
            id: 2,
            data: [
                "#25v",

                {
                    type: "text",
                    text: "120 Cp",
                },
                {
                    type: "textBold",
                    text: "Top ups",
                },
                {
                    type: "text",
                    text: "United state",
                },
                {
                    type: "text",
                    text: "Cp",
                },
                {
                    type: "input",
                    text: "1401/7/7",
                },
            ],
        },
        {
            id: 3,
            data: [
                "#z54",

                {
                    type: "text",
                    text: "120 Cp",
                },
                {
                    type: "textBold",
                    text: "Top ups",
                },
                {
                    type: "text",
                    text: "United state",
                },
                {
                    type: "text",
                    text: "Cp",
                },
                {
                    type: "input",
                    text: "1401/7/7",
                },
            ],
        },
        {
            id: 4,
            data: [
                "#2a4",

                {
                    type: "text",
                    text: "120 Cp",
                },
                {
                    type: "textBold",
                    text: "Top ups",
                },
                {
                    type: "text",
                    text: "United state",
                },
                {
                    type: "text",
                    text: "Cp",
                },
                {
                    type: "input",
                    text: "1401/7/7",
                },
            ],
        },

    ]
    const [selectedItemId, setSelectedItemId] = useState(null);


    return (
        <>
            <AccountLayout>
                <Grid container spacing={2} justifyContent="flex-end" alignItems="center">
                    <Grid item xs={12} md={6} sx={{ mb: { xs: '25px', md: '0' } }}>
                        <Grid sx={{ display: 'flex' }}>
                            <IconAccess />
                            <Typography sx={{ ml: "10px" }}>لیست دسترسی</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid sx={{
                            display: 'flex', flexDirection: 'row',
                            flexWrap: { xs: 'nowrap', md: 'wrap' },
                            overflowX: { xs: "auto", md: 'unset' },
                            whiteSpace: { xs: "nowrap", md: 'unset' },
                            justifyContent: { xs: 'flex-start', md: 'space-around' }
                        }}>
                            <Typography>نوع: Top ups</Typography>
                            <Typography>ریجن: همه</Typography>
                            <Typography>
                                دسته:
                                Cp
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid sx={{ mt: '20px' }}>
                    <TableUpdatePrice
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
export default Access;