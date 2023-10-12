import React, { useState } from "react";
import {
    Box,
    Button,
    Grid,
    MenuItem,
    Select,
    SvgIcon,
    TextField,
    Typography,
} from "@mui/material";

const CreateProductOptionForm = ({ onCreateProductOption }) => {
    const [region, setRegion] = useState("Europe");
    const [category, setCategory] = useState("ندارد");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [isPopular, setIsPopular] = useState(false);

    const handleCreateProductOption = () => {
        if (name.trim() === "" || price.trim() === "" || stock.trim() === "") {
            console.log("نام، قیمت و موجودی نمی‌توانند خالی باشند.");
        } else {
            const newProductOption = {
                name: name,
                price: price,
                stock: stock,
                region: region,
                category: category,
                isPopular: isPopular,
            };
            onCreateProductOption(newProductOption);
            // پاک کردن فرم برای ورود اطلاعات جدید
            setName("");
            setPrice("");
            setStock("");
            setRegion("Europe");
            setCategory("ندارد");
            setIsPopular(false);
        }
    };

    return (
        <Grid>
            {/* اضافه کردن فرم اطلاعات محصول جدید */}
            <Typography variant="h6" sx={{ my: 2 }}>
                ساخت ویژگی جدید
            </Typography>
            <Grid container spacing={2}>
                <Grid item md={4} xs={12}>
                    <TextField
                        fullWidth
                        label="نام محصول"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Grid>
                <Grid item md={4} xs={12}>
                    <TextField
                        fullWidth
                        label="قیمت (تومان)"
                        variant="outlined"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </Grid>
                <Grid item md={4} xs={12}>
                    <TextField
                        fullWidth
                        label="موجودی"
                        variant="outlined"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />
                </Grid>
                <Grid item md={4} xs={12}>
                    <Select
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        fullWidth
                        label="ریجن"
                        variant="outlined"
                    >
                        {/* افزودن آیتم‌های منو */}
                    </Select>
                </Grid>
                <Grid item md={4} xs={12}>
                    <Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        fullWidth
                        label="دسته"
                        variant="outlined"
                    >
                        {/* افزودن آیتم‌های منو */}
                    </Select>
                </Grid>
                <Grid item md={4} xs={12}>
                    <Button variant="contained" color="primary" onClick={handleCreateProductOption}>
                        ایجاد ویژگی جدید
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CreateProductOptionForm;
