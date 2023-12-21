import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import axios from "axios";
import TableFeatures from "Components/Common/TableItems/TableFeatures";

import { useEffect } from "react";
import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import ServerURL from "../Layout/config";
import GetToken from "GetToken";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export default function CheckboxesTags({ onChange = () => { }, value = [], responseId }) {
  const [localCheckBoxList, setLocalCheckBoxList] = useState(value);
  const [page, setPage] = useState(1);
  const [dataBody, setDataBody] = useState([]);
  const [pageDataAll, setPageDataAll] = useState({});
  const [perPage, setPerPage] = useState(15);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}`,
        },
      };

      try {
        const response = await axios.get(
          `${ServerURL.url}/admin/feature/get-all-feature-without-pagination`,
          config
        );

        const pageData = response.data;
        // const updatedPageData = {
        //   nowPage: pageData.page,
        //   totalPages: pageData.totalPages,
        //   perPage: pageData.perPage ? pageData.perPage : 15,
        //   totalItems: pageData.totalItems,
        //   pagesToDisplay: Array.from(
        //     { length: pageData.totalPages },
        //     (_, i) => i + 1
        //   ),
        // };

        // setPageDataAll(updatedPageData);
        setPageDataAll(pageData);

        const apiData = response.data;
        const updatedData = apiData.map((item) => {
          return {
            id: item.id,
            data: [
              `#${item.id}`,
              {
                type: "avatar",
                text: "مدیریت",
              },
              {
                type: "textBold",
                text: item.name,
              },
              {
                type: "text",
                text: 'VIP',
              },
              {
                type: "text",
                text: 'jYYYY/jM/jD',
              },
              {
                type: "text",
                text: 'AUTO',
              },
              // {
              //   type: "text",
              //   text: moment(item.created_at).format("jYYYY/jM/jD یا YYYY/M/D"),
              // },
              {
                type: "statusBtn",
                text: 'Edit',
              },
            ],
          };
        });
        setSelected([]);
        setDataBody(updatedData);
      } catch (error) {
        console.error("Error fetching data from the server:", error);
      }
    };

    fetchData();
  }, [page, perPage, count]);
  const [selected, setSelected] = useState([]);

  const handleDelete = async () => {
    try {
      const config = {
        headers: {
          Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}`,
        },
      };

      const deleteData = {
        ids: selected,
      };

      const response = await axios.post(
        `${ServerURL.url}/admin/product/delete`,
        deleteData,
        config
      );
      if (response.data.status === "success") {
        toast.success("با موفقیت حذف شد.");
        setCount(count + 1);
      } else {
        toast.error("لطفا دوباره امتحان کنید");
      }
    } catch (error) {
      console.error("Error sending delete request:", error);
    }
  };
  const dataHead = [
    "کد ویژگی",
    "نام ویژگی",
    "قیمت",
    "vip",
    "تاریخ ایجاد",
    "sell_mode",
    "status",
  ];
  useEffect(() => {
    setLocalCheckBoxList(value);
  }, [value]);

  // const handleChange = (event, value) => {
  //   const selectedId = value.map((v) => v.id);
  //   setLocalCheckBoxList(value);
  //   onChange(selectedId);
  // };

  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const config = {
  //         headers: {
  //           Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}`,
  //         },
  //       };
  //       const response = await axios.get(
  //         `${ServerURL.url}/admin/feature/get-all-feature-without-pagination`,
  //         config
  //       );
  //       const apiData = response.data;
  //       const updatedRegionData = apiData.map((item) => ({
  //         id: item.id,
  //         title: item.name,
  //       }));
  //       setData(updatedRegionData);
  //     } catch (error) {
  //       console.error("Error fetching data from the server:", error);
  //     }
  //   };
  //   fetchData();
  // }, [responseId]);
  return (
    <>
      <Grid container spacing={2} my={4} sx={{ boxShadow: 5, borderRadius: 2, overflowY: 'auto', height: '500px' }}>
        <TableFeatures
          selected={selected}
          setSelected={setSelected}
          dataHead={dataHead}
          dataBody={dataBody}
          // selectedItemId={selectedItemId}
          pageData={pageDataAll}
          setPage={(e) => setPage(e)}
          setPerPage={(e) => setPerPage(e)}
          perPage={pageDataAll.perPage}
        />
      </Grid>

      {/* <Autocomplete
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
        /> */}
    </>
  );
}
