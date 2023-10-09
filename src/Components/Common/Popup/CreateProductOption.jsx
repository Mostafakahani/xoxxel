import React, { useState } from "react";
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem } from "@mui/material";

const AddProductFeature = ({ tableId }) => {
    const [open, setOpen] = useState(false);
    const [region, setRegion] = useState("");
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [completedFirstStep, setCompletedFirstStep] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleNext = () => {
        setCompletedFirstStep(true);
    };

    const handleSubmit = () => {
        const product = { region, category, name, price, tableId };
        console.log(product);
        fetch("https://example.com/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
        setOpen(false);
    };

    const handleClear = () => {
        setName("");
        setPrice("");
    };

    return (
        <div>
            <Button sx={{ backgroundColor: '#1C49F11A', color: '#1C49F1', borderRadius: "5px", mr: "10px" }}
                 onClick={handleClickOpen}>
                افزودن ویژگی
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Product Feature</DialogTitle>
                <DialogContent>
                    {completedFirstStep && (
                        <>
                            <TextField
                                margin="dense"
                                id="name"
                                label="Product Name"
                                type="text"
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                id="price"
                                label="Product Price"
                                type="number"
                                fullWidth
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </>
                    )}
                    {!completedFirstStep && (
                        <>
                            <Select
                                value={region}
                                onChange={(e) => setRegion(e.target.value)}
                                fullWidth
                                displayEmpty
                                inputProps={{ "aria-label": "Region" }}
                            >
                                <MenuItem value="" disabled>
                                    Region
                                </MenuItem>
                                <MenuItem value="North America">North America</MenuItem>
                                <MenuItem value="Europe">Europe</MenuItem>
                                <MenuItem value="Asia">Asia</MenuItem>
                            </Select>
                            <Select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                fullWidth
                                displayEmpty
                                inputProps={{ "aria-label": "Category" }}
                            >
                                <MenuItem value="" disabled>
                                    Category
                                </MenuItem>
                                <MenuItem value="Electronics">Electronics</MenuItem>
                                <MenuItem value="Clothing">Clothing</MenuItem>
                                <MenuItem value="Home & Garden">Home & Garden</MenuItem>
                            </Select>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    {region && category && completedFirstStep && (
                        <>
                            <Button onClick={handleSubmit} color="primary">
                                Submit
                            </Button>
                            <Button onClick={handleClear} color="primary">
                                Clear
                            </Button>
                        </>
                    )}
                    {!completedFirstStep && (
                        <Button onClick={handleNext} color="primary">
                            Next
                        </Button>
                    )}
                    {completedFirstStep && (
                        <Button onClick={() => setCompletedFirstStep(false)} color="primary">
                            Previous
                        </Button>
                    )}
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddProductFeature;