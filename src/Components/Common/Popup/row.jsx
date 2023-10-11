import React, { useState } from 'react';
import { Button, TextField, Box, Grid } from '@mui/material';

const Rows = () => {
    const [rows, setRows] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [isPopular, setIsPopular] = useState(false);

    const handleAddRow = () => {
        // Check if the same name and price combination already exists in rows
        const isDuplicate = rows.some((row) => row.name === name && row.price === price);
        if (!isDuplicate) {
            setRows([...rows, { id: Date.now(), name: name, price: price, isPopular: isPopular }]);
            // Clear input fields after adding a row
            setName("");
            setPrice("");
            setIsPopular(false);
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

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleSubmit = () => {
        // Send data to the API
        const formattedData = rows.map((row) => {
            return {
                name: row.name,
                price: row.price,
                isPopular: row.isPopular
            };
        });
        console.log(formattedData);
        // Here you can make an API request with formattedData
    };
    const fieldDes = {
        width: '250px'
    }
    return (
        <div>
            <TextField
                onChange={handleNameChange}
                value={name}
                label="نام"
                variant="outlined"
                sx={fieldDes}

            />
            <TextField
                onChange={handlePriceChange}
                value={price}
                label="قیمت"
                variant="outlined"
                sx={fieldDes}

            />
            <Button variant="contained" color="primary" onClick={handleAddRow}>
                افزودن ردیف
            </Button>

            {rows.map((row) => (
                <Grid sx={{ display: 'flex', justifyContent: 'space-evenly', width: "100%", my: '30px' }}>

                    <Box key={row.id} display="flex" alignItems="center" marginTop={2}>
                        <TextField value={row.name} label="نام" disabled
                            sx={fieldDes} />
                        <TextField value={row.price} label="قیمت" disabled
                            sx={fieldDes} />
                        <Button
                            onClick={() => handleTogglePopular(row.id)}
                            style={{ marginLeft: '10px', backgroundColor: row.isPopular ? 'green' : 'red' }}
                        >
                            {row.isPopular ? 'روشن' : 'خاموش'}
                        </Button>
                        <Button
                            onClick={() => handleDeleteRow(row.id)}
                            style={{ marginLeft: '10px' }}
                            color="secondary"
                        >
                            حذف
                        </Button>
                    </Box>
                </Grid>
            ))}

            <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '20px' }}>
                ارسال به API
            </Button>
        </div>
    );
};

export default Rows;
