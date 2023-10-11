import React, { useState } from 'react';
import { Button, TextField, Box, Grid, SvgIcon } from '@mui/material';

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
                            sx={{ color: '#4B4B57', p: '15px', marginLeft: '10px', border: '1px solid #bdbdbd', alignItems: 'center', display: 'flex', fontSize: '13px' }}
                        >
                            Popular
                            <SvgIcon sx={{ ml: '35px' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path d="M9.65325 7.59868C10.6785 5.75946 11.1911 4.83984 11.9576 4.83984C12.724 4.83984 13.2366 5.75945 14.2619 7.59868L14.5271 8.07451C14.8185 8.59716 14.9641 8.85848 15.1913 9.0309C15.4184 9.20333 15.7013 9.26733 16.267 9.39534L16.7821 9.51188C18.7731 9.96235 19.7685 10.1876 20.0054 10.9492C20.2422 11.7108 19.5636 12.5044 18.2063 14.0915L17.8551 14.5022C17.4694 14.9532 17.2766 15.1787 17.1898 15.4577C17.1031 15.7367 17.1322 16.0376 17.1905 16.6393L17.2436 17.1872C17.4488 19.3048 17.5514 20.3636 16.9314 20.8343C16.3113 21.305 15.3793 20.8759 13.5152 20.0176L13.0329 19.7955C12.5032 19.5516 12.2383 19.4297 11.9576 19.4297C11.6768 19.4297 11.4119 19.5516 10.8822 19.7955L10.4 20.0176C8.53585 20.8759 7.60379 21.305 6.98375 20.8343C6.3637 20.3636 6.4663 19.3048 6.67151 17.1872L6.7246 16.6393C6.78291 16.0376 6.81206 15.7367 6.72531 15.4577C6.63855 15.1787 6.4457 14.9532 6.06 14.5022L5.70886 14.0915C4.35157 12.5044 3.67292 11.7108 3.90976 10.9492C4.1466 10.1876 5.14206 9.96235 7.13299 9.51188L7.64807 9.39534C8.21384 9.26733 8.49672 9.20333 8.72385 9.0309C8.95098 8.85848 9.09666 8.59716 9.388 8.07451L9.65325 7.59868Z" stroke="#2C7EFA" stroke-width="1.4284" />
                                    <path opacity="0.55" d="M4.80809 1.98291C4.80809 1.98291 5.08228 3.37104 5.68344 3.96815C6.28459 4.56526 7.67455 4.83006 7.67455 4.83006C7.67455 4.83006 6.28641 5.10425 5.6893 5.70541C5.0922 6.30656 4.82739 7.69652 4.82739 7.69652C4.82739 7.69652 4.5532 6.30838 3.95205 5.71128C3.35089 5.11417 1.96094 4.84936 1.96094 4.84936C1.96094 4.84936 3.34907 4.57518 3.94618 3.97402C4.54329 3.37287 4.80809 1.98291 4.80809 1.98291Z" stroke="#2C7EFA" stroke-width="0.952268" stroke-linejoin="round" />
                                    <path opacity="0.55" d="M17.1953 4.83996H19.0998M18.1476 5.79223L18.1476 3.8877" stroke="#2C7EFA" stroke-width="1.4284" stroke-linecap="round" />
                                </svg>
                            </SvgIcon>
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
