import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    CircularProgress,
    Grid,
    IconButton,
    InputLabel,
    TextField,
    Typography,
} from "@mui/material";
import AccountLayout from "Components/Common/Layout/AccountLayout";

import ServerURL from "Components/Common/Layout/config";
import GetToken from "GetToken";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import StandardImageList from "Components/Common/Images";
const StepHomePage = () => {
    const router = useRouter();

    const [rows, setRows] = useState([]);
    const [rowsTemp, setRowsTemp] = useState([]);
    const [title, setTitle] = useState("");
    const [titleEdit, setTitleEdit] = useState("");
    const [description, setDescription] = useState("");
    const [descriptionEdit, setDescriptionEdit] = useState("");

    const [name, setName] = useState("");
    const [nameEdit, setNameEdit] = useState("");
    const [selectedFileItem, setSelectedFileItem] = useState([]);
    const [selectedFileItemEdit, setSelectedFileItemEdit] = useState("");

    const [addingFeature, setAddingFeature] = useState(false);
    const [editingRowId, setEditingRowId] = useState(null);
    const [expanded, setExpanded] = useState(null);

    const getItems = () => {
        const fetchData = async () => {
            const config = { headers: { Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}` } };
            try {
                const responseCategory = await axios.get(
                    `${ServerURL.url}/admin/info/level/list`,
                    config
                );

                const formattedData = formatData(responseCategory.data);

                setRows(formattedData);
                setRowsTemp(formattedData);

            } catch (error) {
                console.error("Error fetching data from server", error);
            }
        }
        const formatData = (data) => {
            return data.map((category, index) => ({
                id: index,
                name: category.data.name,
                title: category.data.title,
                description: category.data.description,
            }));
        };
        fetchData()

    }
    useEffect(() => {

        getItems();
    }, []);
    const handleAddRow = () => {
        if (name.trim() === "" || title.trim() === "" || description.trim() === "" || selectedFileItem.length === 0) {
            toast.error("تمامی فیلد ها را پر کنید");
            return;
        }

        const isDuplicate = rows.some((row) => row.name === name && row.title === title && row.description === description && row.selectedFileItem === selectedFileItem);
        if (!isDuplicate) {
            if (rows.length < 3) {
                setRows([...rows, { id: Date.now(), name, title, description, selectedFileItem }]);
                setName("");
                setSelectedFileItem([]);
                setTitle('')
                setDescription('')
                toast.info("به لیست اضافه شد");
            } else {
                toast.error("حداکثر سه مرحله وجود دارد");
            }
        } else {
            toast.error("فیلد ها تکراری است");
        }
    };

    const handleDeleteRow = (id) => {
        setRows(rows.filter((row) => row.id !== id));
        toast.warning(" عملیات انجام شد. برای اعمال، تغییرات را ذخیره کنید");

    };

    const handleEditRow = (id) => {
        setEditingRowId(id);
        const editingRow = rows.find((row) => row.id === id);
        if (editingRow) {
            setNameEdit(editingRow.name);
            setSelectedFileItemEdit(editingRow.price);
            setTitleEdit(editingRow.title)
            setDescriptionEdit(editingRow.description)
            setSelectedFileItemEdit(editingRow.selectedFileItem)
        }
    };

    const handleCancelEdit = () => {
        setEditingRowId(null);
        setName("");
        setSelectedFileItem([]);
        setTitle('')
        setDescription('')
    };

    const handleSaveEdit = (id) => {
        setRows(
            rows.map((row) =>
                row.id === id
                    ? {
                        ...row,
                        name: nameEdit,
                        title: titleEdit,
                        description: descriptionEdit,
                        id_storage: selectedFileItemEdit,
                    }
                    : row
            )
        );

        setEditingRowId(null);
        setNameEdit("");
        setSelectedFileItemEdit("");
        setTitleEdit('')
        setDescriptionEdit('')
        toast.warning(" عملیات انجام شد. برای اعمال، تغییرات را ذخیره کنید");
    };

    const handleSubmit = async () => {
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
                "levels": rows.map(row => ({ name: row.name, title: row.title, description: row.description, id_storage: row.selectedFileItem })),
            };

            await axios.post(`${ServerURL.url}/admin/info/level/create`, dataSend, config);
            console.log(rows)
            toast.success("با موفقیت اضافه شد");
            setName("");
            setSelectedFileItem([]);
            setTitle('')
            setDescription('')
            getItems();
            setRowsTemp([])

        } catch (error) {
            console.error("خطا در ارسال درخواست به سرور", error);
        } finally {
            setAddingFeature(false);
        }
    };
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    // const handleClosePanel = () => {
    //     setName("");
    //     setPrice("");
    //     setRows([]);
    // };

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
                    <Grid container>
                        <Grid container sx={{ mt: '15px' }} spacing={2}>
                            <Grid item xs={12} md={12}>
                                <Grid item md={6}>
                                    <InputLabel>سوال</InputLabel>
                                    <TextField
                                        value={name}
                                        // label="سوال"
                                        fullWidth
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12} >
                                <InputLabel>تایتل</InputLabel>
                                <TextField
                                    value={title}
                                    // label="جواب"
                                    fullWidth
                                    multiline
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={12} >
                                <InputLabel>دیسکرپشن</InputLabel>
                                <TextField
                                    value={description}
                                    // label="جواب"
                                    fullWidth
                                    multiline
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={12} >
                                <StandardImageList
                                    label={"تصویر اصلی (297*147)"}
                                    onChange={(e) => {
                                        setSelectedFileItem(e);
                                        console.log(e);
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Button
                        sx={{ my: 2 }}
                        variant="text"
                        color="primary"
                        onClick={handleAddRow}
                        disabled={name !== '' && selectedFileItem.length !== 0 && title !== '' && description !== '' && editingRowId === null ? false : true}
                    >
                        افزودن به لیست +
                    </Button>
                    <div>
                        <Typography variant="h6" style={{ marginTop: "15px" }}>
                            لیست سوال‌ها
                        </Typography>
                        {rows.length === 0 ? (
                            <Typography my={2}>هیچ سوالی وجود ندارد</Typography>
                        ) : (
                            <div>
                                {rows.map((row) => (
                                    <Accordion expanded={expanded === `panel${row.id}`} onChange={handleChange(`panel${row.id}`)} sx={{ border: '2px dashed #5a5a5a75', borderRadius: '10px', my: '15px', boxShadow: 'none' }}>
                                        <AccordionSummary aria-controls={`panel${row.id}d-content`} id={`panel${row.id}d-header`}>
                                            <Typography sx={{ color: '#2C7EFA', my: '10px', fontSize: '16px', width: '100%', containerType: 'inline-size', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.name}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Grid container spacing={2}>
                                                <Grid container item xs={12} sm={12} md={12}>
                                                    <Grid container item xs={8} sm={10} md={8}>
                                                        <TextField
                                                            value={editingRowId === row.id ? nameEdit : row.name}
                                                            label="سوال"
                                                            variant="outlined"
                                                            fullWidth
                                                            multiline
                                                            sx={{ my: '10px' }}
                                                            disabled={editingRowId !== row.id}
                                                            onChange={(e) => editingRowId === row.id ? setNameEdit(e.target.value) : {}}
                                                        />
                                                    </Grid>
                                                    <Grid container item xs={4} sm={2} md={4} sx={{ justifyContent: { xs: 'flex-end' } }}>
                                                        <IconButton
                                                            size="medium"
                                                            color={editingRowId === row.id ? 'success' : "default"}
                                                            fullWidth
                                                            sx={{ height: 'fit-content' }}
                                                            onClick={() => editingRowId === row.id ? handleSaveEdit(row.id) : handleEditRow(row.id)}

                                                        >
                                                            {
                                                                editingRowId === row.id ? <CheckIcon fontSize="small" /> : <ModeEditIcon fontSize="small" />
                                                            }

                                                        </IconButton>
                                                        <IconButton
                                                            size="medium"
                                                            color="error"
                                                            fullWidth
                                                            sx={{ height: 'fit-content' }}
                                                            onClick={() => editingRowId === row.id ? handleCancelEdit(row.id) : handleDeleteRow(row.id)}

                                                        >
                                                            {
                                                                editingRowId === row.id ? <CloseIcon fontSize="small" /> : <DeleteIcon fontSize="small" />
                                                            }

                                                        </IconButton>
                                                    </Grid>
                                                </Grid>

                                                <Grid item xs={12} sm={12} md={12}>
                                                    <TextField
                                                        value={editingRowId === row.id ? selectedFileItemEdit : row.selectedFileItem}
                                                        label="جواب"
                                                        variant="outlined"
                                                        multiline
                                                        fullWidth
                                                        sx={{ my: '10px' }}
                                                        disabled={editingRowId !== row.id}
                                                        onChange={(e) => editingRowId === row.id ? setSelectedFileItemEdit(e.target.value) : {}}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={12}>
                                                    <TextField
                                                        value={editingRowId === row.id ? titleEdit : row.title}
                                                        label="تایتل"
                                                        variant="outlined"
                                                        multiline
                                                        fullWidth
                                                        sx={{ my: '10px' }}
                                                        disabled={editingRowId !== row.id}
                                                        onChange={(e) => editingRowId === row.id ? setTitleEdit(e.target.value) : {}}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={12}>
                                                    <TextField
                                                        value={editingRowId === row.id ? descriptionEdit : row.description}
                                                        label="دیسکرپشن"
                                                        variant="outlined"
                                                        multiline
                                                        fullWidth
                                                        sx={{ my: '10px' }}
                                                        disabled={editingRowId !== row.id}
                                                        onChange={(e) => editingRowId === row.id ? setDescriptionEdit(e.target.value) : {}}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </div>
                        )}
                    </div >
                    <Grid container spacing={1}>
                        <Grid item>
                            <Button
                                startIcon={addingFeature && (
                                    <CircularProgress color="warning" size={24} />
                                )}
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                // onClick={() => console.log(rows)}
                                sx={{ borderRadius: "5px" }}
                                disabled={rows === rowsTemp}
                            >
                                {/* {
                                addingFeature && (
                                    <div style={{ marginTop: "10px", textAlign: "center" }}>
                                        <CircularProgress size={24} />
                                    </div>
                                )
                            } */}
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

export default StepHomePage;
