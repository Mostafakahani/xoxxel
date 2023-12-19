import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import NewT from "Components/Common/TableItems/NewT";
import { useEffect, useState } from "react";
import AccountLayout from "Components/Common/Layout/AccountLayout";
import { AddProductIcon, IconProduct, IconTickets } from "Icons/icons";
import Link from "next/link";
import CreateRegon from "Components/Common/Creatives/CreateRegon";
import CreateCategory from "Components/Common/Creatives/CreateCategory";
import CreateType from "Components/Common/Creatives/CreateType";
import EditOptionsDes from "Components/Common/Creatives/EditOptions/EditOptionsDes";
import CreateOptionFeature from "Components/Common/Creatives/CreateOptionFeature";
import axios from "axios";
import ServerURL from "Components/Common/Layout/config";
import moment from "moment-jalaali";
import { ToastContainer, toast } from "react-toastify";
import GetToken from "GetToken";
const Departments = () => {
    const [itemsForDel, setItemsForDel] = useState([]);
    const [page, setPage] = useState(1);
    const [dataBody, setDataBody] = useState([]);
    const [pageDataAll, setPageDataAll] = useState({});
    const [perPage, setPerPage] = useState(15);
    const [count, setCount] = useState(0);
    const [open, setOpen] = useState(false);
    const handleOpen = () => { setOpen(true); };
    const handleClose = () => { setOpen(false); };
    useEffect(() => {
        const fetchData = async () => {
            const config = {
                headers: {
                    Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}`,
                },
            };

            try {
                const response = await axios.get(
                    `${ServerURL.url}/admin/department/get-all-department`,
                    config
                );

                const pageData = response.data;

                const apiData = response.data;
                const updatedRegionData = apiData.map((item) => {
                    return {
                        id: item.id,
                        data: [
                            `#${item.id}`,
                            {
                                type: "avatar",
                                text: "مدیریت",
                            },
                            {
                                type: "textBold",
                                text: item.title,
                            },
                            {
                                type: "text",
                                text: moment(item.created_at).format("jYYYY/jM/jD یا YYYY/M/D"),
                            },
                        ],
                    };
                });
                setSelected([]);
                setDataBody(updatedRegionData);
            } catch (error) {
                console.error("Error fetching data from the server:", error);
            }
        };

        fetchData();
    }, [page, perPage, count]);
    const [selected, setSelected] = useState([]);

    const handleDelete = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}`,
                },
            };

            const deleteData = {
                ids: selected,
            };

            const response = await axios.post(
                `${ServerURL.url}/admin/department/delete`,
                deleteData,
                config
            );
            if (response.status === 201) {
                toast.success("با موفقیت حذف شد.");
                setCount(count + 1);
            } else {
                toast.error("لطفا دوباره امتحان کنید");
            }
        } catch (error) {
            console.error("Error sending delete request:", error);
        }
    };
    const dataHead = [
        "کد دپارتمان",
        "ایجاد کننده",
        "نام دپارتمان",
        "تاریخ ایجاد",
    ];
    // const [selectedItemId, setSelectedItemId] = useState(null);
    ////// New Dep
    const [departmanText, setDepartmanText] = useState('');
    const [loadingStatus, setLoadingStatus] = useState(false);

    const handleCreateDep = async () => {
        setLoadingStatus(true)
        if (departmanText !== '') {
            const config = {
                headers: {
                    Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}`,
                },
            };
            const data = {
                name: departmanText
            }
            try {
                const response = await axios.post(
                    `${ServerURL.url}/admin/department/create`,
                    data, config
                );
                const dataResponse = response.data;
                if (dataResponse.status === 'success') {
                    console.log('ok')
                    setCount(count + 1);
                    setDepartmanText('')
                    setLoadingStatus(false)
                    setOpen(false)
                }
                else {
                    return
                }
            } catch (error) {
                if (error.response.data.message === 'There is a department') {
                    toast.info("این دپارتمان وجود دارد")
                }
                console.log(error);
                setLoadingStatus(false)
            } finally {
                setLoadingStatus(false)
            }
        } else {
            toast.info("فیلد نباید خالی باشد")
        }

    }
    return (
        <>
            <AccountLayout>
                <Grid
                    container
                    spacing={2}
                    justifyContent="flex-end"
                    alignItems="center"
                >
                    <Grid item xs={12} md={6} sx={{ mb: { xs: "25px", md: "0" } }}>
                        <Grid sx={{ display: "flex" }}>
                            <IconProduct />
                            <Typography sx={{ ml: "10px" }}>لیست دپارتمان ها</Typography>
                        </Grid>

                    </Grid>
                    <Grid item xs={12} md={6}></Grid>
                </Grid>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    limit={5}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />

                <Grid container sx={{ mt: "20px", display: 'flex', justifyContent: 'flex-end', my: 1 }} spacing={1}>
                    <Grid item>

                        <Button
                            variant="contained"
                            size="small"
                            disableElevation
                            startIcon={<AddProductIcon />}
                            onClick={handleOpen}
                        >
                            ثبت دپارتمان جدید

                        </Button>
                    </Grid>
                    <Grid item sx={{ display: "flex", justifyContent: "right" }}>
                        <Button
                            onClick={handleDelete}
                            variant="contained"
                            color="error"
                            disabled={selected.length > 0 ? false : true}
                            disableElevation
                            sx={{
                                fontSize: "12px",
                                textAlign: "right",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "5px",
                                // backgroundColor: "#D24093",
                            }}
                        >
                            حذف
                        </Button>
                    </Grid>
                </Grid>
                <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
                    <DialogContent>
                        <DialogTitle>افزودن دپارتمان جدید</DialogTitle>
                        <Grid container spacing={2}>
                            <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                                <TextField
                                    label='نام دپارتمان'
                                    size="medium"
                                    fullWidth
                                    onChange={(e) => setDepartmanText(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={handleCreateDep}
                                    disableElevation
                                    fullWidth
                                    disabled={departmanText.length < 3}

                                >
                                    {loadingStatus ? <CircularProgress color="success" size={24} /> : 'افزودن'}
                                </Button>
                            </Grid>


                        </Grid>

                    </DialogContent>
                </Dialog>
                <NewT
                    selected={selected}
                    setSelected={setSelected}
                    dataHead={dataHead}
                    dataBody={dataBody}
                    // selectedItemId={selectedItemId}
                    pageData={pageDataAll}
                // setPage={(e) => setPage(e)}
                // setPerPage={(e) => setPerPage(e)}
                // perPage={pageDataAll.perPage}
                />
            </AccountLayout>
        </>
    );
};
export default Departments;
