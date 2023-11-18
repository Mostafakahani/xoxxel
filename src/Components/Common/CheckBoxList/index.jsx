import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import axios from 'axios';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import { useState } from 'react';
import ServerURL from '../Layout/config';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export default function CheckboxesTags({ onChange = () => { } }) {
    const handleChange = (event, value) => {
        const selectedId = value.map(v => v.id);
        onChange(selectedId);
    };
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `${ServerURL.Bear}`
                    }
                };
                const response = await axios.get(`${ServerURL.url}/admin/feature/get-all-feature?page=1`, config);
                const apiData = response.data;
                const updatedRegionData = apiData.data.map(item => (
                    { id: item.id, title: item.name }
                ));
                setData(updatedRegionData);
            } catch (error) {
                console.error("Error fetching data from the server:", error);
            }
        };
        fetchData();
    }, []);
    return (
        <>
            {data.length > 0 && (
                <Autocomplete
                    fullWidth={true}
                    multiple
                    onChange={handleChange}
                    id="checkboxes-tags-demo"
                    options={data}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.title}
                    renderOption={(props, option, { selected }) => (
                        <li {...props} key={option.id}>
                            <Checkbox
                                key={option.id}
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                            {option.title}
                        </li>
                    )}
                    style={{ width: 500 }}
                    renderInput={(params) => (
                        <TextField {...params} label="انتخاب ویژگی" placeholder="ویژگی ها" />
                    )}
                />
            )
            }
        </>
    );
}
