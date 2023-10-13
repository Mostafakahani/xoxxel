import React, { useState } from "react";
import { Dialog, Button, DialogContent, DialogTitle, DialogActions } from "@mui/material";

const EditOptions = () => {
    const [values, setValues] = useState({
        title: "عنوان",
        description: "توضیحات",
        value: 100,
    });

    const handleDialogOpen = (value) => {
        setValues({
            ...values,
            [value]: "",
        });
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleInputChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = () => {
        console.log(values);
    };

    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <div>
            <h1>صفحه اصلی</h1>
            <div>
                <Button
                    onClick={() => handleDialogOpen("title")}
                    variant="contained"
                    color="primary"
                >
                    عنوان
                </Button>
                <Button
                    onClick={() => handleDialogOpen("description")}
                    variant="contained"
                    color="primary"
                >
                    توضیحات
                </Button>
                <Button
                    onClick={() => handleDialogOpen("value")}
                    variant="contained"
                    color="primary"
                >
                    مقدار
                </Button>
            </div>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                disableBackdropClick
                disableEscapeKeyDown
            >
                <DialogTitle>ویرایش اطلاعات</DialogTitle>
                <DialogContent>
                    <div>
                        <input
                            name="title"
                            type="text"
                            value={values.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <input
                            name="description"
                            type="text"
                            value={values.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <input
                            name="value"
                            type="number"
                            value={values.value}
                            onChange={handleInputChange}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>بستن</Button>
                    <Button onClick={handleSubmit}>تایید تغییرات</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EditOptions;
