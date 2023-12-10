import { Button, Grid, Typography } from "@mui/material";
import TableOption from "Components/Common/TableItems/TableOption";
import { useEffect, useState } from "react";
import AccountLayout from "Components/Common/Layout/AccountLayout";
import { AddProductIcon, IconProduct, IconTickets, IconXp } from "Icons/icons";
import Link from "next/link";
import CreateRegon from "Components/Common/Creatives/CreateRegon";
import CreateCategory from "Components/Common/Creatives/CreateCategory";
import CreateType from "Components/Common/Creatives/CreateType";
import EditOptionsDes from "Components/Common/Creatives/EditOptions/EditOptionsDes";
import CreateOption from "Components/Common/Creatives/CreateOption";
import axios from "axios";
import ServerURL from "Components/Common/Layout/config";
import moment from "moment-jalaali";
import { ToastContainer, toast } from "react-toastify";
import GetToken from "GetToken";
const OptionPage = () => {
  const [itemsForDel, setItemsForDel] = useState([]);
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
          `${ServerURL.url}/admin/feature/get-all-feature?page=${page}&perPage=${perPage}`,
          config
        );

        const pageData = response.data;
        const updatedPageData = {
          nowPage: pageData.page,
          totalPages: pageData.totalPages,
          perPage: pageData.perPage ? pageData.perPage : 15,
          totalItems: pageData.totalItems,
          pagesToDisplay: Array.from(
            { length: pageData.totalPages },
            (_, i) => i + 1
          ),
        };

        setPageDataAll(updatedPageData);

        const apiData = response.data.data;
        const updatedRegionData = apiData.map((item) => {
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
                text: item.price,
              },
              {
                type: "text",
                text: item.xp_value,
              },
              {
                type: "statusVip",
                text: item.vip ? 'VIP' : 'NO',
              },
              {
                type: "text",
                text: item.sell_mode,
              },
              {
                type: "text",
                text: moment(item.created_at).format("jYYYY/jM/jD یا YYYY/M/D"),
              },
              {
                type: "statusChange",
                text: item.status,
              },
              {
                type: "btn",
              },
            ],
          };
        });
        setSelected([]);
        setDataBody(updatedRegionData);
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
        `${ServerURL.url}/admin/feature/delete`,
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
    "نام",
    "مبلغ",
    "مقدار Xp",
    "vip",
    "حالت فروش",
    "تاریخ",
    "وضعیت",
    "اقدامات",
  ];
  // const [selectedItemId, setSelectedItemId] = useState(null);

  return (
    <>
      <AccountLayout>
        <Grid
          container
          spacing={2}
          justifyContent="flex-end"
          alignItems="center"
        >
          <Grid item xs={12} md={6} sx={{ mb: { xs: "25px", md: "0" } }}>
            <Grid sx={{ display: "flex" }}>
              <IconXp />
              <Typography sx={{ ml: "10px" }}>لیست ویژگی ها</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
          </Grid>

        </Grid>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          limit={5}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <Grid container sx={{ mt: "20px", display: 'flex', justifyContent: 'flex-end', my: 1 }} spacing={1}>
          <Grid item>
            <Link
              href={"/panel/admin/Xp/CreateXp"}
              style={{
                display: "flex",
                alignItems: "center",
                color: "#FDFDFD",
              }}
            >

              <Button
                sx={{
                  backgroundColor: "#244CDF",
                  py: "5px",
                  px: "12px",
                  borderRadius: "5px",
                  color: "#FDFDFD",
                  fontSize: "12px",
                  "&:hover": {
                    color: "#FDFDFD",
                    backgroundColor: "#4166ef",
                  },
                }}
                endIcon={<AddProductIcon />}
              >
                ثبت ویژگی جدید
              </Button>
            </Link>
          </Grid>
          <Grid item sx={{ display: "flex", justifyContent: "right" }}>
            {/* {selected.length > 0 && ( */}
            <Button
              onClick={handleDelete}
              variant="contained"
              color="error"
              disabled={selected.length > 0 ? false : true}
              disableElevation
              sx={{
                fontSize: "12px",
                textAlign: "right",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
                // backgroundColor: "#D24093",
              }}
            >
              حذف
            </Button>
            {/* )} */}
          </Grid>

          {/* <CustomTable
                        headCells={headCells}
                        rows={rows}
                        selected={(object) => {
                            setItemsForDel(object)
                        }}
                        rowsPerPage={10}
                        total={2}
                        pageChange={(x) => console.log(x)
                        }
                        page={0}
                        show={(x) => console.log(x)}
                    /> */}

        </Grid>
        <TableOption
          selected={selected}
          setSelected={setSelected}
          dataHead={dataHead}
          dataBody={dataBody}
          // selectedItemId={selectedItemId}
          pageData={pageDataAll}
          setUptadeCount={(e) => setCount(count + e)}
          setPage={(e) => setPage(e)}
          setPerPage={(e) => setPerPage(e)}
          perPage={pageDataAll.perPage}
        />
      </AccountLayout>
    </>
  );
};
export default OptionPage;
