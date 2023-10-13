import { Button, Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import { useState } from "react";
import TabelOptions from "Components/Common/TableItems/TabelOptions";

const EditOptionsDes = () => {
    const [open, setOpen] = useState(false);


    const [selectedButton, setSelectedButton] = useState(null);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [selected, setSelected] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const dataHead = [
        "id",
        "نام ریجن",
    ]
    const dataBody = [
        {
            id: 1,
            data: [
                "#254",
                {
                    type: "text",
                    text: "United state",
                },
            ],
        },
        {
            id: 2,
            data: [
                "#204",
                {
                    type: "text",
                    text: "United state",
                },
            ],
        },
    ]
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
        <>
            <Grid>
                <Button sx={{ fontSize: '12px',mr: { md: "5px", xs: '2px' }, py: '5px', px: '12px', border: '1px solid #B6B6B6', color: '#525252', borderRadius: "5px" }}
                    onClick={() => {
                        handleClickOpen()
                        console.log(open)
                    }}>
                    ویرایش دسته,ریجن,نوع
                </Button>
                <Dialog
                    fullWidth
                    maxWidth={'sm'}
                    open={open}
                    onClose={() => {
                        setOpen(false)
                    }}
                >
                    <DialogTitle>ویرایش دسته,ریجن,نوع</DialogTitle>
                    <DialogContent>
                        <Grid>
                            <Button onClick={() => {
                                setSelectedButton("region");
                                handleClickOpen();
                            }}>
                                ریجن
                            </Button>
                            <Button onClick={() => {
                                setSelectedButton("category");
                                handleClickOpen();
                            }}>
                                دسته
                            </Button>
                            <Button onClick={() => {
                                setSelectedButton("type");
                                handleClickOpen();
                            }}>
                                نوع
                            </Button>

                        </Grid>
                        <Grid>
                            <TabelOptions
                                selected={selected}
                                setSelected={setSelected}
                                dataHead={dataHead}
                                dataBody={
                                    selectedButton === "region"
                                        ? regionData
                                        : selectedButton === "category"
                                            ? categoryData
                                            : typeData
                                }
                                selectedItemId={selectedItemId}
                            />

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
                    </DialogContent>
                </Dialog>

            </Grid>
        </>
    );
};

export default EditOptionsDes;
