import {
    Button,
    CircularProgress,
    Grid,
} from "@mui/material";
import LatestGiftCardsSliderForm from "Components/Common/HomePageSteps/LatestGiftCardsSliders/LatestGiftCardsSliderForm";
import LatestGiftCardsSliderList from "Components/Common/HomePageSteps/LatestGiftCardsSliders/LatestGiftCardsSliderList";
import AccountLayout from "Components/Common/Layout/AccountLayout";
import ServerURL from "Components/Common/Layout/config";
import GetToken from "GetToken";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const ChangeGiftCards = () => {
    const router = useRouter();

    const [rows, setRows] = useState([]);
    const [rowsTemp, setRowsTemp] = useState([]);

    const [input1, setInput1] = useState("");
    const [input1Edit, setInput1Edit] = useState("");

    const [input2, setInput2] = useState("");
    const [input2Edit, setInput2Edit] = useState("");

    const [input3, setInput3] = useState("");
    const [input3Edit, setInput3Edit] = useState("");

    const [input4, setInput4] = useState("");
    const [input4Edit, setInput4Edit] = useState("");

    const [input5, setInput5] = useState("");
    const [input5Edit, setInput5Edit] = useState("");

    const [count, setCount] = useState(0);

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(30);

    const [selectedFileItem, setSelectedFileItem] = useState([]);
    const [selectedFileItemEdit, setSelectedFileItemEdit] = useState("");

    const [addingFeature, setAddingFeature] = useState(false);
    const [editingRowId, setEditingRowId] = useState(null);
    const [expanded, setExpanded] = useState(null);

    const getItems = () => {
        const fetchData = async () => {
            const config = { headers: { Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}` } };
            try {
                const responseLevels = await axios.get(
                    `${ServerURL.url}/admin/sliders/giftcart/gift-latest/list`,
                    config
                );
                const formattedData = formatData(responseLevels.data);
                console.log(formattedData)
                setRows(formattedData);
                setRowsTemp(formattedData);
            } catch (error) {
                console.error("Error fetching data from server", error);
            }
        }
        const formatData = (data) => {
            return data.map((x, index) => ({
                id: x.id,
                // title: x.data.title,
                btn: x.data.button,
                customer: x.data.customer,
                deliveryType: x.data.deliveryType,
                save: x.data.save,
                link: x.link,
                id_storage: x.id
            }));
        };
        fetchData()
    }
    useEffect(() => {

        getItems();
    }, [count]);
    const handleAddRow = () => {
        if (input3.trim() === "" || input1.trim() === "" || input2.trim() === "" || selectedFileItem.length === 0) {
            toast.error("تمامی فیلد ها را پر کنید");
            return;
        }

        const isDuplicate = rows.some((row) => row.name === input3 && row.title === input1 && row.description === input2 && row.selectedFileItem === selectedFileItem);
        if (!isDuplicate) {
            if (rows.length < 3) {
                setRows([...rows, { id: Date.now(), name: input3, title: input1, description: input2, id_storage: selectedFileItem }]);
                setInput3("");
                setSelectedFileItem([]);
                setInput1('');
                setInput2('');
                toast.info("به لیست اضافه شد");
            } else {
                toast.error("حداکثر سه مرحله وجود دارد");
            }
        } else {
            toast.error("فیلد ها تکراری است");
        }
    };

    const handleDeleteRow = async (id) => {
        const config = {
            headers: {
                Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}`
            }
        };
        try {
            const data = {
                ids: [id]
            }

            const response = await axios.post(`${ServerURL.url}/admin/sliders/main/delete`, data, config);

            setRows(rows.filter((row) => row.id !== id));

            setCount(count + 1);

            toast.success("عملیات انجام شد");
        } catch (error) {
            console.error("Error deleting row", error);
            toast.error("خطا در حذف ردیف");
        }
    };


    const handleEditRow = (id) => {
        setEditingRowId(id);
        const editingRow = rows.find((row) => row.id === id);
        if (editingRow) {
            setInput3Edit(editingRow.name);
            setSelectedFileItemEdit(editingRow.selectedFileItem ? editingRow.selectedFileItem.id : "");
            setInput1Edit(editingRow.title);
            setInput2Edit(editingRow.description);

        }
    };


    const handleCancelEdit = () => {
        setEditingRowId(null);
        setInput3("");
        setSelectedFileItem([]);
        setInput1('')
        setInput2('')
    };

    const handleSaveEdit = (id, currentIdStorage) => {
        setRows(
            rows.map((row) =>
                row.id === id
                    ? {
                        ...row,
                        name: input3Edit,
                        title: input1Edit,
                        description: input2Edit,
                        id_storage: currentIdStorage,
                    }
                    : row
            )
        );

        setEditingRowId(null);
        setInput3Edit("");
        setSelectedFileItemEdit("");
        setInput1Edit('');
        setInput2Edit('');
        toast.warning(" عملیات انجام شد. برای اعمال، تغییرات را ذخیره کنید");
    };
    const handleSubmit = async () => {
        const isDuplicate = rows.some((row) => row.name === input3 && row.title === input1 && row.description === input2 && row.selectedFileItem === selectedFileItem);
        if (!isDuplicate) {
            const isValidData = rows.every((data) => data.name && data.title !== '' && data.description !== '' && data.selectedFileItem !== 0);
            if (!isValidData) {
                toast.error('همه فیلدها باید پر شوند.');
                return;
            }

            try {
                setAddingFeature(true);
                const config = {
                    headers: {
                        Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}`
                    }
                };

                const dataSend = {
                    title: input3,
                    link: input1,
                    txtBtn: input2,
                    id_storage: selectedFileItem
                }
                console.log(dataSend)


                await axios.post(`${ServerURL.url}/admin/sliders/main/create`, dataSend, config);
                console.log(rows)
                toast.success("با موفقیت اضافه شد");
                setCount(count + 1)
                setInput3("");
                setSelectedFileItem([]);
                setInput1('')
                setInput2('')
                getItems();
                setRowsTemp([])

            } catch (error) {
                // toast.error(error.response.data.message === 'levels must contain at least 3 elements' ? 'باید هر سه مرحله را وارد کنید' : 'خطایی رخ داده است دوباره تلاش کنید');
                console.error("خطا در ارسال درخواست به سرور", error);
            } finally {
                setAddingFeature(false);
            }
        }
    };
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <>
            <AccountLayout>
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
                <Grid>
                    <LatestGiftCardsSliderForm
                        input3={input3}
                        input1={input1}
                        input2={input2}
                        selectedFileItem={selectedFileItem}
                        onAddRow={handleSubmit}
                        onEditRow={handleEditRow}
                        onCancelEdit={handleCancelEdit}
                        onSaveEdit={handleSaveEdit}
                        setInput3={setInput3}
                        setInput1={setInput1}
                        setInput2={setInput2}
                        setSelectedFileItem={setSelectedFileItem}
                        editingRowId={editingRowId}
                    />
                    <LatestGiftCardsSliderList
                        rows={rows}
                        expanded={expanded}
                        handleChange={handleChange}
                        editingRowId={editingRowId}
                        input3Edit={input3Edit}
                        input1Edit={input1Edit}
                        input2Edit={input2Edit}
                        setInput3Edit={setInput3Edit}
                        setInput1Edit={setInput1Edit}
                        setInput2Edit={setInput2Edit}
                        handleEditRow={handleEditRow}
                        handleCancelEdit={handleCancelEdit}
                        handleDeleteRow={handleDeleteRow}
                        handleSaveEdit={handleSaveEdit}
                        setSelectedFileItemEdit={setSelectedFileItemEdit}
                    />
                    <Grid container spacing={1}>
                        <Grid item>
                            <Button
                                startIcon={addingFeature && (
                                    <CircularProgress color="warning" size={24} />
                                )}
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                sx={{ borderRadius: "5px" }}
                                disabled={rows === rowsTemp || rows.length < 3}
                            >
                                ذخیره تغییرات
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => router.push("/panel/admin/Setting")}
                                sx={{ borderRadius: "5px" }}
                            >
                                بازگشت
                            </Button>
                        </Grid>
                    </Grid>
                </Grid >
            </AccountLayout>
        </>
    );
};

export default ChangeGiftCards;
