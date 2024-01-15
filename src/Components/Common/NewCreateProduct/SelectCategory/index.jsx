import React, { useState } from 'react';
import { Chip, Stack, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

function SelectCategory({ data, selected }) {
    const [selectedId, setSelectedId] = useState(null);

   

    if (!data || data.length === 0) {
        return (
            <Typography color="error">
                Please Select a Country
            </Typography>
        );
    }

    return (
        <Stack direction="row" spacing={1}>
            {data.map((item) => (
                <Chip
                    key={item.id}
                    label={item.title}
                    onClick={() => { selected(item.id); setSelectedId(item.id) }}
                    variant={selectedId === item.id ? 'filled' : 'outlined'}
                // color={selectedId === item.id ? 'primary' : 'default'}
                />
            ))}
        </Stack>
    );
}

export default SelectCategory;
