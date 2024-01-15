import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, ListItemIcon, Grid } from '@mui/material';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
function SelectCountry({ selected, value, setValue }) {


    return (
        <Box sx={{ minWidth: 250 }}>
            <FormControl fullWidth>
                <InputLabel>Country</InputLabel>
                <Select
                    value={selected}
                    label="Country"
                    onChange={(e) => setValue(e.target.value)}
                >
                    {value.data.map((x) => (
                        <MenuItem key={x.id} value={x.id}>
                            {
                                x.id_storage !== null ? (
                                    <ListItemIcon>
                                        <Box component={'img'} src={`https://xoxxel.storage.iran.liara.space/${x.id_storage.name}`} width={'25px'} height={'25px'} />
                                    </ListItemIcon>
                                ) : (
                                    <ListItemIcon>
                                        <PanoramaFishEyeIcon fontSize='small' />
                                    </ListItemIcon>
                                )
                            }
                            {x.title}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box >
    );
}

export default SelectCountry;
