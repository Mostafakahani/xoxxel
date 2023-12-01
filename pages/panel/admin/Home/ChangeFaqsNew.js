import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SvgIcon,
    TextField,
    Typography,
} from "@mui/material";
import ServerURL from "Components/Common/Layout/config";
import GetToken from "GetToken";
import axios from "axios";
import { useState } from "react";
// ... (قسمت‌های کد قبلی)

const CreateOption = () => {
    const [open, setOpen] = useState(false);
    const [rows, setRows] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [isPopular, setIsPopular] = useState(false);
    const [addingFeature, setAddingFeature] = useState(false);
    const [editingRowId, setEditingRowId] = useState(null);

    const handleAddRow = () => {
        // Validation
        if (name.trim() === "" || price.trim() === "") {
            console.log("نام و قیمت نمی‌تواند خالی باشد.");
            return;
        }

        const isDuplicate = rows.some((row) => row.name === name && row.price === price);
        if (!isDuplicate) {
            // با افزودن یک سوال جدید، وضعیت محبوبیت به حالت اولیه تنظیم می‌شود
            setIsPopular(false);
            setRows([...rows, { id: Date.now(), name, price, isPopular }]);
            setName("");
            setPrice("");
            setIsPopular(false);

        } else {
            console.log("این نام و قیمت قبلاً وارد شده است.");
        }
    };

    const handleDeleteRow = (id) => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleTogglePopular = (id) => {
        setRows(
            rows.map((row) =>
                row.id === id ? { ...row, isPopular: !row.isPopular } : row
            )
        );
    };


    const handleEditRow = (id) => {
        setEditingRowId(id);
        const editingRow = rows.find((row) => row.id === id);
        if (editingRow) {
            setName(editingRow.name);
            setPrice(editingRow.price);
            setIsPopular(editingRow.isPopular);
        }
    };

    const handleCancelEdit = () => {
        setEditingRowId(null);
        setName("");
        setPrice("");
        setIsPopular(false);
    };

    const handleSaveEdit = (id) => {
        setRows(
            rows.map((row) =>
                row.id === id
                    ? {
                        ...row,
                        name,
                        price,
                        isPopular,
                    }
                    : row
            )
        );

        setEditingRowId(null);
        setName("");
        setPrice("");
        setIsPopular(false);
    };
    const handleSubmit = async () => {
        // Validation
        const isValidData = rows.every((data) => data.name && data.price !== '' && data.isPopular !== '');
        if (!isValidData) {
            console.log('Error: همه فیلدها باید پر شوند.');
            return;
        }

        try {
            setAddingFeature(true);
            const config = {
                headers: {
                    Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}`
                }
            };

            // ارسال rows به API
            // await axios.post('API_ENDPOINT', { data: rows }, config);

            setOpen(false);
            setName("");
            setPrice("");
            setRows([]);
        } catch (error) {
            console.error("خطا در ارسال درخواست به سرور", error);
        } finally {
            setAddingFeature(false);
        }
    };

    const handleClosePanel = () => {
        setOpen(false);
        setName("");
        setPrice("");
        setRows([]);
    };

    return (
        <Grid>
            <Button
                variant="outlined"
                color="primary"
                onClick={() => setOpen(true)}
                style={{
                    fontSize: "12px", marginRight: "5px", padding: "5px 12px", borderRadius: "5px", border: "1px solid #B6B6B6",
                    color: "#525252",
                }}
            >
                ایجاد سوال
            </Button>
            <Dialog
                fullWidth
                maxWidth={"lg"}
                open={open}
                onClose={handleClosePanel}
            >
                <DialogContent>
                    <Typography align="left" style={{ marginTop: "15px" }}>
                        ایجاد سوال
                    </Typography>
                    <Grid container>
                        <Grid container sx={{ my: '15px' }}>
                            <Grid xs={12} md={5}>
                                <InputLabel>سوال</InputLabel>
                                <TextField
                                    value={name}
                                    label="سوال"
                                    fullWidth
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid xs={12} md={7}>
                                <InputLabel>جواب</InputLabel>
                                <TextField
                                    value={price}
                                    label="جواب"
                                    fullWidth
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </Grid>

                        </Grid>
                    </Grid>
                    <Button
                        variant="text"
                        color="primary"
                        onClick={handleAddRow}
                        disabled={name !== '' && price !== '' && editingRowId === null ? false : true}
                    >
                        افزودن ردیف +
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
                                    <Grid container key={row.id} sx={{ my: '10px' }}>
                                        {editingRowId === row.id ? (
                                            <Grid container alignItems="center" marginTop={2}>
                                                <Grid container xs={12} md={11}>
                                                    <Grid xs={12} md={5}>
                                                        <TextField
                                                            value={name}
                                                            label="سوال"
                                                            fullWidth
                                                            onChange={(e) => setName(e.target.value)}
                                                        />
                                                    </Grid>
                                                    <Grid xs={12} md={7}>
                                                        <TextField
                                                            value={price}
                                                            label="جواب"
                                                            fullWidth
                                                            onChange={(e) => setPrice(e.target.value)}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid container xs={12} md={1} alignItems={'center'} >
                                                    <Button
                                                        onClick={() => handleSaveEdit(row.id)}
                                                        color="success"
                                                        fullWidth
                                                    >
                                                        ذخیره
                                                    </Button>
                                                </Grid>
                                                <Grid container xs={12} md={1} alignItems={'center'} >
                                                    <Button
                                                        onClick={handleCancelEdit}
                                                        color="error"
                                                        fullWidth
                                                    >
                                                        لغو
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        ) : (
                                            <Grid container alignItems="center" marginTop={2}>
                                                <Grid container xs={12} md={11}>
                                                    <Grid xs={12} md={5}>
                                                        <TextField
                                                            value={row.name}
                                                            label="سوال"
                                                            fullWidth
                                                            disabled
                                                        />
                                                    </Grid>
                                                    <Grid xs={12} md={7}>
                                                        <TextField
                                                            value={row.price}
                                                            label="جواب"
                                                            fullWidth
                                                            disabled
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid container xs={12} md={1} alignItems={'center'} >
                                                    <Button
                                                        onClick={() => handleEditRow(row.id)}
                                                        color="warning"
                                                        fullWidth
                                                    >
                                                        ویرایش
                                                    </Button>
                                                </Grid>
                                                <Grid container xs={12} md={1} alignItems={'center'} >
                                                    <Button
                                                        onClick={() => handleDeleteRow(row.id)}
                                                        color="error"
                                                        fullWidth
                                                    >
                                                        حذف
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        )}
                                    </Grid>
                                ))}
                            </div>

                        )}
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        style={{ fontSize: "12px", margin: "10px 0", padding: "5px 12px", borderRadius: "5px" }}
                        disabled={rows.length === 0 ? true : false}
                    >
                        ذخیره تغییرات
                    </Button>
                    {addingFeature && (
                        <div style={{ marginTop: "10px", textAlign: "center" }}>
                            <CircularProgress size={24} />
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </Grid>
    );
};

export default CreateOption;
