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
        if (input3.trim() === "" || input1.trim() === "" || input2.trim() === "" || selectedFileItem.length === 0 || input4.trim() === '' || input5.trim() === '') {
            toast.error("تمامی فیلد ها را پر کنید");
            return;
        }

        const isDuplicate = rows.some((row) => row.input3 === input3 && row.input1 === input1 && row.input2 === input2 && row.selectedFileItem === selectedFileItem && row.input4 === input4 && row.input5 === input5);
        if (!isDuplicate) {
            setRows([...rows, { id: Date.now(), customer: input3, link: input1, deliveryType: input2, save: input4, btn: input5, id_storage: selectedFileItem }]);
            setSelectedFileItem([]);
            setInput1('');
            setInput2('');
            setInput3("");
            setInput4('');
            setInput5('');
            toast.info("به لیست اضافه شد");

        } else {
            toast.error("فیلد ها تکراری است");
        }
    };

    const handleDeleteRow = async (id) => {
        setRows(rows.filter((row) => row.id !== id));
        // const config = {
        //     headers: {
        //         Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}`
        //     }
        // };
        // try {
        //     const data = {
        //         ids: [id]
        //     }

        //     const response = await axios.post(`${ServerURL.url}/admin/sliders/main/delete`, data, config);

        // setRows(rows.filter((row) => row.id !== id));

        //     setCount(count + 1);

        //     toast.success("عملیات انجام شد");
        // } catch (error) {
        //     console.error("Error deleting row", error);
        //     toast.error("خطا در حذف ردیف");
        // }
    };


    const handleEditRow = (id) => {
        setEditingRowId(id);
        const editingRow = rows.find((row) => row.id === id);
        if (editingRow) {
            setSelectedFileItemEdit(editingRow.selectedFileItem ? editingRow.selectedFileItem.id : "");
            setInput1Edit(editingRow.input1);
            setInput2Edit(editingRow.input2);
            setInput3Edit(editingRow.input3);
            setInput4Edit(editingRow.input4);
            setInput5Edit(editingRow.input5);

        }
    };


    const handleCancelEdit = () => {
        setEditingRowId(null);
        setSelectedFileItem([]);
        setInput1('');
        setInput2('');
        setInput3("");
        setInput4('');
        setInput5('');
    };

    const handleSaveEdit = (id, currentIdStorage) => {
        setRows(
            rows.map((row) =>
                row.id === id
                    ? {
                        ...row,
                        input1: input1Edit,
                        input2: input2Edit,
                        input3: input3Edit,
                        input4: input4Edit,
                        input5: input5Edit,
                        id_storage: currentIdStorage,
                    }
                    : row
            )
        );

        setEditingRowId(null);
        setSelectedFileItemEdit("");
        setInput1Edit('');
        setInput2Edit('');
        setInput3Edit("");
        setInput4Edit('');
        setInput5Edit('');
        toast.warning(" عملیات انجام شد. برای اعمال، تغییرات را ذخیره کنید");
    };
    const handleSubmit = async () => {
        const isDuplicate = rows.some((row) => row.input3 === input3 && row.input1 === input1 && row.input2 === input2 && row.selectedFileItem === selectedFileItem && row.input4 === input4 && row.input5 === input5);
        if (!isDuplicate) {
            const isValidData = rows.every((data) => data.input3 && data.input1 !== '' && data.input2 !== '' && data.selectedFileItem !== 0 && data.input4 !== '' && data.input5 !== '');
            // if (!isValidData) {
            //     toast.error('همه فیلدها باید پر شوند.');
            //     return;
            // }

            try {
                setAddingFeature(true);
                const config = {
                    headers: {
                        Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}`
                    }
                };

                const dataSend = {
                    latests: rows.map((x) => ({
                        id_storage: x.id_storage,
                        link: x.link,
                        deliveryType: x.deliveryType,
                        customer: x.customer,
                        save: x.save,
                        button: x.btn
                    }))
                };
                console.log(dataSend)


                const responseSend = await axios.post(`${ServerURL.url}/admin/sliders/giftcart/gift-latest/create`, dataSend, config);
                console.log(responseSend)
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
                        input1={input1}
                        input2={input2}
                        input3={input3}
                        input4={input4}
                        input5={input5}
                        selectedFileItem={selectedFileItem}
                        onAddRow={handleAddRow}
                        onEditRow={handleEditRow}
                        onCancelEdit={handleCancelEdit}
                        onSaveEdit={handleSaveEdit}
                        setInput1={setInput1}
                        setInput2={setInput2}
                        setInput3={setInput3}
                        setInput4={setInput4}
                        setInput5={setInput5}
                        setSelectedFileItem={setSelectedFileItem}
                        editingRowId={editingRowId}
                    />
                    <LatestGiftCardsSliderList
                        rows={rows}
                        expanded={expanded}
                        handleChange={handleChange}
                        editingRowId={editingRowId}
                        input1Edit={input1Edit}
                        input2Edit={input2Edit}
                        input3Edit={input3Edit}
                        input4Edit={input4Edit}
                        input5Edit={input5Edit}
                        setInput1Edit={setInput1Edit}
                        setInput2Edit={setInput2Edit}
                        setInput3Edit={setInput3Edit}
                        setInput4Edit={setInput4Edit}
                        setInput5Edit={setInput5Edit}
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
                                disabled={rows === rowsTemp}
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
