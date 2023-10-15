import { Grid } from "@mui/material";
import NewGift from "Components/Common/HomePageSteps/TableGiftCards/NewGift";
import { useState } from "react";

const TableGiftCardTraning = () => {
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [selected, setSelected] = useState([]);
    const dataHead = ["کد محصول", "ایجاد کننده", "نام محصول", "نوع"]
    const dataBody = [
        {
            id: 1,
            data: [
                "#254",
                {
                    type: "avatar",
                    text: "مدیریت",
                    url: '/images/avatar.png'
                },
                {
                    type: "textBold",
                    text: "Call of duty mobile",
                },
                {
                    type: "text",
                    text: "Gift card",
                },
                
            ],
        },
        {
            id: 3,
            data: [
                "#204",
                {
                    type: "avatar",
                    text: "مدیریت",
                    url: '/images/avatar.png'
                },
                {
                    type: "textBold",
                    text: "Call of duty mobile",
                },
                {
                    type: "text",
                    text: "Gift card",
                },
             

            ],
        },
    ]
    return (
        <>
            <Grid sx={{ p: '50px' }}>
                <NewGift
                    selected={selected}
                    setSelected={setSelected}
                    dataHead={dataHead}
                    dataBody={dataBody}
                    // show={(x) => console.log(dataBody.data[0])}
                    selectedItemId={selectedItemId}
                />



            </Grid>

        </>
    )
}
export default TableGiftCardTraning;