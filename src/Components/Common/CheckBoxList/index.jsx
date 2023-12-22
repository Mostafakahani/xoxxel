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
import moment from "moment-jalaali";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export default function CheckboxesTags({ setSelectedItem = () => { }, checkBoxList, refresh, responseId, setResponseId = () => { } }) {
  // const [localCheckBoxList, setLocalCheckBoxList] = useState(value);
  const [page, setPage] = useState(1);
  const [dataBody, setDataBody] = useState([]);
  const [pageDataAll, setPageDataAll] = useState({});
  const [perPage, setPerPage] = useState(15);
  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState([]);
  // const id = ''
  // useEffect(() => {
  //   console.log('1')
  // }, [refresh]);

  // useEffect(() => {
  //   setSelectedItem(selected)
  //   setSelected(checkBoxList);
  //   console.log('2')
  // }, [checkBoxList]);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}`,
        },
      };

      // if (checkBoxList !== id) {

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
                type: "textBold",
                text: item.name,
              },
              {
                type: "text",
                text: item.price + '$',
              },
              {
                type: "statusVip",
                text: item.vip ? 'VIP' : 'NO',
              },
              {
                type: "text",
                text: moment(item.created_at).format("YYYY/M/D"),
              },
              {
                type: "statusBtnSellMode",
                text: item.sell_mode,
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
    }
    // };

    fetchData();
  }, [page, perPage, count, refresh]);

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
      <Typography>انتخاب ویژگی</Typography>
      <Grid container spacing={2} my={2} sx={{ px: 2, py: 2, boxShadow: 3, borderRadius: 1, overflowY: 'auto', height: '500px' }}>
        <TableFeatures
          selected={checkBoxList || selected}
          setSelected={(e) => { setSelected(e); setSelectedItem(e) }}
          dataHead={dataHead}
          dataBody={dataBody}
          // selectedItemId={selectedItemId}
          pageData={pageDataAll}
          setPage={(e) => setPage(e)}
          setPerPage={(e) => setPerPage(e)}
          perPage={pageDataAll.perPage}
          setResponseId={(e) => setResponseId(e)}
          refresh={(e) => setCount(count + 1)}
          
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
