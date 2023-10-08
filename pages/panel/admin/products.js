import { Button, Grid, Typography } from "@mui/material";
import CustomTable from "Components/Common/CustomTable/Cutsom Table";
import AccountLayout from "Components/Common/Layout/AccountLayout";
import NewT from "Components/Common/TableItems/NewT";
import { AddProductIcon, IconActiveProducts } from "Icons/icons";
import { useState } from "react";
const Products = () => {
    const ButtonData = [
        { text: 'حذف دسته , ریجن , نوع' },
        { text: 'ایجاد نوع' },
        { text: 'ایجاد ریجن' },
        { text: 'ایجاد دسته' }
    ]

    const headCells = [
        // {
        //     id: "id",
        //     label: "#",
        // },
        {
            id: "productCode",
            label: "کد محصول",
        },
        {
            id: "createdBy",
            label: "ایجاد کننده",
        },
        {
            id: "productName",
            label: "نام محصول",
        },
        {
            id: "type",
            label: "نوع",
        },
        {
            id: "createdAt",
            label: "تاریخ ایجاد",
        },
        {
            id: "actions",
            label: "اقدامات",
        },
        // {
        //     id: "status",
        //     label: "تمدید",
        // },
    ];

    function createData(
        // id,
        productCode,
        createdBy,
        type,
        productName,
        createdAt,
        actions,
        // CopyLink,
    ) {
        return {
            // id,
            productCode,
            createdBy,
            type,
            productName,
            createdAt,
            actions,
            // CopyLink,
        };
    }

    const rows = [
        createData(
            "#234",
            "مدیریت",
            "Call of duty mobile",
            " Gift card",
            "1401/7/7",

        ),
        createData(
            "#234",
            "مدیریت",
            "Call of duty mobile",
            " Gift card",
            "1401/7/7",

        ),

    ];
    const [itemsForDel, setItemsForDel] = useState([]);

    const [selected, setSelected] = useState([]);
    const [tags, setTags] = useState([]);
    const dataHead = ["کد محصول", "ایجاد کننده", "نام محصول", "نوع", "تاریخ ایجاد", "اقدامات"]
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
                {
                    type: "text",
                    text: "1401/7/7",
                },
                {
                    type: "btn",
                    text: "1401/7/7",
                },
            ],
        },
        {
            id: 3,
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
                {
                    type: "text",
                    text: "1401/7/7",
                },
                {
                    type: "btn",
                    text: "1401/7/7",
                },

            ],
        },
    ]

    return (
        <>
            <AccountLayout>
                <Grid
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                    <Grid>
                        <Grid sx={{ display: 'flex' }}>
                            <IconActiveProducts />
                            <Typography sx={{ ml: "10px" }}>لیست محصولات</Typography>
                        </Grid>
                        <Grid>
                            <Typography sx={{ mt: "10px" }}>شما میتوانید در لیست زیر تمام محصولات ثبت شده را مشاهده و ویرایش کنید.</Typography>
                        </Grid>
                    </Grid>
                    <Grid>
                        {
                            ButtonData.map((x, index) => (
                                <Button key={index} sx={{ mr: "18px", py: '5px', px: '12px', border: '1px solid #B6B6B6', color: '#525252', borderRadius: "5px" }}>{x.text}</Button>
                            ))
                        }
                        <Button sx={{
                            backgroundColor: '#244CDF', py: "5px", px: '12px', borderRadius: "5px", color: "#FDFDFD",
                            "&:hover": {
                                color: '#FDFDFD',
                                backgroundColor: '#4166ef'
                            }
                        }}>
                            <Grid sx={{ display: 'flex', alignItems: "center" }}>
                                ثبت محصول جدید
                                <AddProductIcon />
                            </Grid>
                        </Button>
                    </Grid>
                </Grid >
                <Grid sx={{ mt: "20px" }}>
                    <Grid sx={{ display: 'flex', justifyContent: 'right' }}>
                        {/* {
                            itemsForDel.length > 0 && */}
                        <Button variant="contained" disabled={itemsForDel.length > 0 ? false : true} disableElevation sx={{
                            fontSize: "12px",
                            textAlign: "right",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: '8px',
                            backgroundColor: '#D24093',
                        }}>حذف</Button>
                        {/* } */}
                    </Grid>

                    {/* <CustomTable
                        headCells={headCells}
                        rows={rows}
                        selected={(object) => {
                            setItemsForDel(object)
                        }}
                        rowsPerPage={10}
                        total={2}
                        pageChange={(x) => console.log(x)
                        }
                        page={0}
                        show={(x) => console.log(x)}
                    /> */}
                    <NewT
                        selected={selected}
                        setSelected={setSelected}
                        dataHead={dataHead}
                        dataBody={dataBody}
                    />
                </Grid>



            </AccountLayout >
        </>
    )
}
export default Products;