import {
    Button,
    CircularProgress,
    Grid,
} from "@mui/material";
import AccountLayout from "Components/Common/Layout/AccountLayout";
import ServerURL from "Components/Common/Layout/config";
import GetToken from "GetToken";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import CompaniesSliderForm from "Components/Common/HomePageSteps/CompaniesSlider/CompaniesSliderForm";
import CompaniesSliderList from "Components/Common/HomePageSteps/CompaniesSlider/CompaniesSliderList";
const ChangeCompanies = () => {
    const router = useRouter();

    const [rows, setRows] = useState([]);
    const [rowsTemp, setRowsTemp] = useState([]);
    const [name, setName] = useState("");
    const [nameEdit, setNameEdit] = useState("");

    const [title, setTitle] = useState("");
    const [titleEdit, setTitleEdit] = useState("");

    const [description, setDescription] = useState("");
    const [descriptionEdit, setDescriptionEdit] = useState("");
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
                    `${ServerURL.url}/admin/sliders/company/list?page=${page}&perPage=${perPage}`,
                    config
                );
                const formattedData = formatData(responseLevels.data.data);
                setRows(formattedData);
                setRowsTemp(formattedData);
            } catch (error) {
                console.error("Error fetching data from server", error);
            }
        }
        const formatData = (data) => {
            return data.map((x, index) => ({
                id: x.id,
                // name: x.data.title,
                title: x.link,
                // description: x.data.txtBtn,
                // id_storage: x.id
            }));
        };
        fetchData()
    }
    useEffect(() => {

        getItems();
    }, [count]);
    const handleAddRow = () => {
        if (title.trim() === "" || selectedFileItem.length === 0) {
            toast.error("تمامی فیلد ها را پر کنید");
            return;
        }

        const isDuplicate = rows.some((row) => row.title === title && row.selectedFileItem === selectedFileItem);
        if (!isDuplicate) {
            setRows([...rows, { id: Date.now(), title, id_storage: selectedFileItem }]);
            setName("");
            setSelectedFileItem([]);
            setTitle('');
            setDescription('');
            toast.info("به لیست اضافه شد");

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

            const response = await axios.post(`${ServerURL.url}/admin/sliders/company/delete`, data, config);

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
            setNameEdit(editingRow.name);
            setSelectedFileItemEdit(editingRow.selectedFileItem ? editingRow.selectedFileItem.id : "");
            setTitleEdit(editingRow.title);
            setDescriptionEdit(editingRow.description);

        }
    };


    const handleCancelEdit = () => {
        setEditingRowId(null);
        setName("");
        setSelectedFileItem([]);
        setTitle('')
        setDescription('')
    };

    const handleSaveEdit = (id, currentIdStorage) => {
        setRows(
            rows.map((row) =>
                row.id === id
                    ? {
                        ...row,
                        name: nameEdit,
                        title: titleEdit,
                        description: descriptionEdit,
                        id_storage: currentIdStorage,
                    }
                    : row
            )
        );

        setEditingRowId(null);
        setNameEdit("");
        setSelectedFileItemEdit("");
        setTitleEdit('');
        setDescriptionEdit('');
        toast.warning(" عملیات انجام شد. برای اعمال، تغییرات را ذخیره کنید");
    };
    const handleSubmit = async () => {
        const isDuplicate = rows.some((row) => row.title === title && row.selectedFileItem === selectedFileItem);
        if (!isDuplicate) {
            const isValidData = rows.every((data) => data.title !== '' && data.selectedFileItem !== 0);
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
                    link: title,
                    id_storage: selectedFileItem
                }
                console.log(dataSend)


                await axios.post(`${ServerURL.url}/admin/sliders/company/create`, dataSend, config);
                console.log(rows)
                toast.success("با موفقیت اضافه شد");
                setCount(count + 1)
                setName("");
                setSelectedFileItem([]);
                setTitle('')
                setDescription('')
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
                    <CompaniesSliderForm
                        name={name}
                        title={title}
                        description={description}
                        selectedFileItem={selectedFileItem}
                        onAddRow={handleSubmit}
                        // onEditRow={handleEditRow}
                        // onCancelEdit={handleCancelEdit}
                        // onSaveEdit={handleSaveEdit}
                        setName={setName}
                        setTitle={setTitle}
                        setDescription={setDescription}
                        setSelectedFileItem={setSelectedFileItem}
                        editingRowId={editingRowId}
                    />
                    <CompaniesSliderList
                        rows={rows}
                        expanded={expanded}
                        handleChange={handleChange}
                        editingRowId={editingRowId}
                        // nameEdit={nameEdit}
                        // titleEdit={titleEdit}
                        // descriptionEdit={descriptionEdit}
                        setNameEdit={setNameEdit}
                        // setTitleEdit={setTitleEdit}
                        setDescriptionEdit={setDescriptionEdit}
                        // handleEditRow={handleEditRow}
                        // handleCancelEdit={handleCancelEdit}
                        handleDeleteRow={handleDeleteRow}
                    // handleSaveEdit={handleSaveEdit}
                    // setSelectedFileItemEdit={setSelectedFileItemEdit}
                    />
                    <Grid container spacing={1}>
                        {/* <Grid item>
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
                        </Grid> */}
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

export default ChangeCompanies;
