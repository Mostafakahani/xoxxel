import { Button, Grid, Typography } from "@mui/material";
import NewT from "Components/Common/TableItems/NewT";
import { useEffect, useState } from "react";
import AccountLayout from "Components/Common/Layout/AccountLayout";
import { AddProductIcon, IconProduct, IconTickets } from "Icons/icons";
import Link from "next/link";
import CreateRegon from "Components/Common/Creatives/CreateRegon";
import CreateCategory from "Components/Common/Creatives/CreateCategory";
import CreateType from "Components/Common/Creatives/CreateType";
import EditOptionsDes from "Components/Common/Creatives/EditOptions/EditOptionsDes";
import CreateOption from "Components/Common/Creatives/CreateOption";
import axios from "axios";
import ServerURL from "Components/Common/Layout/config";
const Products = () => {
    const ButtonData = [
        { text: 'حذف دسته , ریجن , نوع' },
        { text: 'ایجاد نوع' },
        { text: 'ایجاد ریجن' },
        { text: 'ایجاد دسته' }
    ]

    const [itemsForDel, setItemsForDel] = useState([]);
    const [page, setPage] = useState(1);
    const [dataBody, setDataBody] = useState([]);
    useEffect(() => {
        const config = {
            headers: {
                Authorization: `${ServerURL.Bear}` // YourBearerToken را با مقدار مورد نظر جایگزین کنید
            }
        };

        axios.get(`https://xoxxel.dicato.net/admin/feature/get-all-products?page=${page}`, config)
            .then(response => {
                const apiData = response.data; // داده‌های دریافتی از سرور
                const updatedRegionData = apiData.data.map(item => {
                    return {
                        id: item.id,
                        data: [
                            `#${item.id}`, // مقدار `#` به همراه شناسه از سرور
                            {
                                type: "avatar",
                                text: 'مدیریت',

                            },
                            {
                                type: "textBold",
                                text: item.title,

                            },
                            {
                                type: "text",
                                text: item.input_lable,

                            },
                            {
                                type: 'text',
                                text: item.created_at,
                            },
                            {
                                type: 'btn'
                            }
                        ],
                        data1: [
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
                    };
                });
                setDataBody(updatedRegionData);
            })
            .catch(error => {
                console.error("Error fetching data from the server:", error);
            });
    }, []); // useEffect فقط یکبار در زمان رندر اولیه اجرا می‌شود

    const [selected, setSelected] = useState([]);
    const dataHead = ["کد محصول", "ایجاد کننده", "نام محصول", "نوع", "تاریخ ایجاد", "اقدامات"]
    const dataBody1 = [
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
    const [selectedItemId, setSelectedItemId] = useState(null);

    return (
        <>
            <AccountLayout>
                <Grid container spacing={2} justifyContent="flex-end" alignItems="center">
                    <Grid item xs={12} md={6} sx={{ mb: { xs: '25px', md: '0' } }}>
                        <Grid sx={{ display: 'flex' }}>
                            <IconProduct />
                            <Typography sx={{ ml: "10px" }}>لیست محصولات</Typography>
                        </Grid>
                        <Grid>
                            <Typography sx={{ mt: "10px", fontSize: '12px' }}>شما میتوانید در لیست زیر تمام محصولات ثبت شده را مشاهده و ویرایش کنید.</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid sx={{
                            display: 'flex', flexDirection: 'row',
                            flexWrap: { xs: 'nowrap', md: 'wrap' },
                            overflowX: { xs: "auto", md: 'unset' },
                            whiteSpace: { xs: "nowrap", md: 'unset' },
                            justifyContent: { xs: 'flex-start', md: 'flex-end' }
                        }}>
                            <CreateOption />
                            <CreateRegon />
                            <CreateCategory />
                            <CreateType />
                            <EditOptionsDes />
                            <Link href={'/panel/admin/CreateProduct'} style={{ display: 'flex', alignItems: "center", color: '#FDFDFD' }}>
                                <Button sx={{
                                    backgroundColor: '#244CDF', py: "5px", px: '12px', borderRadius: "5px", color: "#FDFDFD",
                                    fontSize: '12px',
                                    "&:hover": {
                                        color: '#FDFDFD',
                                        backgroundColor: '#4166ef'
                                    }
                                }}>
                                    ثبت محصول جدید
                                    <AddProductIcon />
                                </Button>
                            </Link>

                        </Grid>
                    </Grid>
                </Grid>



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
                        // show={(x) => console.log(dataBody.data[0])}
                        selectedItemId={selectedItemId} />



                </Grid>



            </AccountLayout >
        </>
    )
}
export default Products;