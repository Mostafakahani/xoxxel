import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import axios from "axios";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { useState } from "react";
import ServerURL from "../Layout/config";
import GetToken from "GetToken";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export default function CheckboxesTags({ onChange = () => { }, value = [], responseId }) {
  const [localCheckBoxList, setLocalCheckBoxList] = useState(value);

  useEffect(() => {
    setLocalCheckBoxList(value);
  }, [value]);

  const handleChange = (event, value) => {
    const selectedId = value.map((v) => v.id);
    setLocalCheckBoxList(value);
    onChange(selectedId);
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}`,
          },
        };
        const response = await axios.get(
          `${ServerURL.url}/admin/feature/get-all-feature-without-pagination`,
          config
        );
        const apiData = response.data;
        const updatedRegionData = apiData.map((item) => ({
          id: item.id,
          title: item.name,
        }));
        setData(updatedRegionData);
      } catch (error) {
        console.error("Error fetching data from the server:", error);
      }
    };
    fetchData();
  }, [responseId]);
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
          getOptionSelected={(option, value) => option.id === value.id} // اضافه شده
          value={data.filter(option => localCheckBoxList.includes(option.id))}
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
            <TextField
              {...params}
              label="انتخاب ویژگی"
              placeholder="ویژگی ها"
            />
          )}
        />
      )}
    </>
  );
}
