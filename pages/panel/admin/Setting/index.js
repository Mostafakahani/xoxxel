import AccountLayout from "Components/Common/Layout/AccountLayout";
import { Button, Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import { useState } from "react";
import TabelOptions from "Components/Common/TableItems/TabelOptions";
import ChangeFaqs from "../Home/ChangeFaqs";
import ChangeAbout from "../Home/ChangeAbout";
import ChangeOurVision from "../Home/ChangeOurVision";


const Setting = () => {
    const [open, setOpen] = useState(false);


    const [selectedButton, setSelectedButton] = useState(null);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [selected, setSelected] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

   
    const regionData = [
        {
            id: 1,
            data: [
                "#101",
                {
                    type: "text",
                    text: "Region 1",
                },
            ],
        },
        {
            id: 2,
            data: [
                "#102",
                {
                    type: "text",
                    text: "Region 2",
                },
            ],
        },
    ];

    const categoryData = [
        {
            id: 3,
            data: [
                "#201",
                {
                    type: "text",
                    text: "Category 1",
                },
            ],
        },
        {
            id: 4,
            data: [
                "#202",
                {
                    type: "text",
                    text: "Category 2",
                },
            ],
        },
    ];

    const typeData = [
        {
            id: 5,
            data: [
                "#301",
                {
                    type: "text",
                    text: "Type 1",
                },
            ],
        },
        {
            id: 6,
            data: [
                "#302",
                {
                    type: "text",
                    text: "Type 2",
                },
            ],
        },
    ];
    return (
        <AccountLayout>
            <Grid>
                <Grid>
                    <Button onClick={() => {
                        setSelectedButton("region");
                        handleClickOpen();
                    }}>
                        FAQ
                    </Button>
                    <Button onClick={() => {
                        setSelectedButton("category");
                        handleClickOpen();
                    }}>
                        About us
                    </Button>
                    <Button onClick={() => {
                        setSelectedButton("type");
                        handleClickOpen();
                    }}>
                        Our visions
                    </Button>
                </Grid>
                <Grid>
                    {
                        selectedButton === "region" && (
                            <ChangeFaqs />
                        ) ||
                        selectedButton === "category" && (
                            <ChangeAbout />
                        ) || (

                            <ChangeOurVision />
                        )
                    }


                </Grid>
                <Button
                    onClick={() => {
                        // حذف اطلاعات بر اساس selectedItemId
                        const updatedData = selectedButton === "region"
                            ? regionData.filter(item => item.data[0] !== selectedItemId)
                            : selectedButton === "category"
                                ? categoryData.filter(item => item.data[0] !== selectedItemId)
                                : typeData.filter(item => item.data[0] !== selectedItemId);

                        console.log("اطلاعات حذف شده:", updatedData);
                    }}
                >
                    حذف کردن
                </Button>


                <Button onClick={() => setOpen(false)}>
                    بستن
                </Button>


            </Grid>



        </AccountLayout>
    )
}
export default Setting;