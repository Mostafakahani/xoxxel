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
const CreateOption = () => {
    const router = useRouter();

    const [rows, setRows] = useState([]);
    const [rowsTemp, setRowsTemp] = useState([]);
    const [name, setName] = useState("");
    const [nameEdit, setNameEdit] = useState("");
    const [priceEdit, setPriceEdit] = useState("");
    const [price, setPrice] = useState("");
    const [addingFeature, setAddingFeature] = useState(false);
    const [editingRowId, setEditingRowId] = useState(null);
    const [expanded, setExpanded] = useState(null);

    const getItems = () => {
        const fetchData = async () => {
            const config = { headers: { Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}` } };
            try {
                const responseCategory = await axios.get(
                    `${ServerURL.url}/admin/info/faq/list`,
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
                name: category.data.question,
                price: category.data.answer,
            }));
        };
        fetchData()

    }
    useEffect(() => {

        getItems();
    }, []);
    const handleAddRow = () => {
        if (name.trim() === "" || price.trim() === "") {
            toast.error("تمامی فیلد ها را پر کنید");
            return;
        }

        const isDuplicate = rows.some((row) => row.name === name && row.price === price);
        if (!isDuplicate) {
            setRows([...rows, { id: Date.now(), name, price }]);
            setName("");
            setPrice("");
            toast.info("به لیست اضافه شد");

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
            setPriceEdit(editingRow.price);
        }
    };

    const handleCancelEdit = () => {
        setEditingRowId(null);
        setName("");
        setPrice("");
    };

    const handleSaveEdit = (id) => {
        setRows(
            rows.map((row) =>
                row.id === id
                    ? {
                        ...row,
                        name: nameEdit,
                        price: priceEdit,
                    }
                    : row
            )
        );

        setEditingRowId(null);
        setNameEdit("");
        setPriceEdit("");
        toast.warning(" عملیات انجام شد. برای اعمال، تغییرات را ذخیره کنید");
    };

    const handleSubmit = async () => {
        const isValidData = rows.every((data) => data.name && data.price !== '');
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
                "FAQs": rows.map(row => ({ question: row.name, answer: row.price })),
            };

            await axios.post(`${ServerURL.url}/admin/info/faq/create`, dataSend, config);
            console.log(rows)
            toast.success("با موفقیت اضافه شد");
            setName("");
            setPrice("");
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
                            <InputLabel>جواب</InputLabel>
                            <TextField
                                value={price}
                                // label="جواب"
                                fullWidth
                                multiline
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Grid>

                    </Grid>
                </Grid>
                <Button
                    sx={{ my: 2 }}
                    variant="text"
                    color="primary"
                    onClick={handleAddRow}
                    disabled={name !== '' && price !== '' && editingRowId === null ? false : true}
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
                                                    value={editingRowId === row.id ? priceEdit : row.price}
                                                    label="جواب"
                                                    variant="outlined"
                                                    multiline
                                                    fullWidth
                                                    sx={{ my: '10px' }}
                                                    disabled={editingRowId !== row.id}
                                                    onChange={(e) => editingRowId === row.id ? setPriceEdit(e.target.value) : {}}
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
        </>
    );
};

export default CreateOption;
