import { Button, Grid, Typography } from "@mui/material";
import NewT from "Components/Common/TableItems/NewT";
import { useEffect, useState } from "react";
import AccountLayout from "Components/Common/Layout/AccountLayout";
import { AddProductIcon, IconProduct, IconTickets } from "Icons/icons";
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
const Products = () => {
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
          `${ServerURL.url}/admin/feature/get-all-products?perPage=${perPage}&page=${page}`,
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
                type: "avatar",
                text: "مدیریت",
              },
              {
                type: "textBold",
                text: item.title,
              },
              {
                type: "text",
                text: item.input_lable,
              },
              {
                type: "text",
                text: moment(item.created_at).format("jYYYY/jM/jD یا YYYY/M/D"),
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
    "کد محصول",
    "ایجاد کننده",
    "نام محصول",
    "نوع",
    "تاریخ ایجاد",
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
              <IconProduct />
              <Typography sx={{ ml: "10px" }}>لیست محصولات</Typography>
            </Grid>
            <Grid>
              <Typography sx={{ mt: "10px", fontSize: "12px" }}>
                شما میتوانید در لیست زیر تمام محصولات ثبت شده را مشاهده و ویرایش
                کنید.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: { xs: "nowrap", md: "wrap" },
                overflowX: { xs: "auto", md: "unset" },
                whiteSpace: { xs: "nowrap", md: "unset" },
                justifyContent: { xs: "flex-start", md: "flex-end" },
              }}
            >
              <CreateOption />
              <CreateRegon />
              <CreateCategory />
              <CreateType />
              <EditOptionsDes />
              <Link
                href={"/panel/admin/CreateProduct"}
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
                >
                  ثبت محصول جدید
                  <AddProductIcon />
                </Button>
              </Link>
            </Grid>
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

        <Grid sx={{ mt: "20px" }}>
          <Grid sx={{ display: "flex", justifyContent: "right" }}>
            {selected.length > 0 && (
              <Button
                onClick={handleDelete}
                variant="contained"
                disabled={selected.length > 0 ? false : true}
                disableElevation
                sx={{
                  fontSize: "12px",
                  textAlign: "right",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "8px",
                  backgroundColor: "#D24093",
                }}
              >
                حذف
              </Button>
            )}
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
          <NewT
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
      </AccountLayout>
    </>
  );
};
export default Products;
