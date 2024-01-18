import { Button, Grid, Typography } from "@mui/material";
import CategorryTable from "Components/Common/TableItems/CategorryTable";
import { useEffect, useState } from "react";
import AccountLayout from "Components/Common/Layout/AccountLayout";
import { IconProduct } from "Icons/icons";
import axios from "axios";
import ServerURL from "Components/Common/Layout/config";
import { ToastContainer, toast } from "react-toastify";
import GetToken from "GetToken";
const Categories = () => {
  const [page, setPage] = useState(1);
  const [dataBody, setDataBody] = useState([]);
  const [pageDataAll, setPageDataAll] = useState({});
  const [perPage, setPerPage] = useState(15);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `${
            ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")
          }`,
        },
      };

      try {
        const response = await axios.get(
          `${ServerURL.url}/admin/cat/get-all-cat`,
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

        const apiData = response.data;
        const updatedRegionData = apiData.map((item) => {
          return {
            id: item.id,
            data: [
              `#${item.id}`,
              {
                type: "textBold",
                text: item.title,
              },
              // {
              //   type: "icon",
              //   text: item.id_storage || null,
              // },
              {
                type: "editAction",
                text: item.id,
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
  }, [count]);
  const [selected, setSelected] = useState([]);

  const handleDelete = async () => {
    try {
      const config = {
        headers: {
          Authorization: `${
            ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")
          }`,
        },
      };

      const deleteData = {
        ids: selected,
      };

      const response = await axios.post(
        `${ServerURL.url}/admin/cat/delete`,
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
  const dataHead = ["کد دسته بندی", "نام دسته بندی", "اقدامات"];

  return (
    <>
      <AccountLayout>
        <Grid
          container
          spacing={2}
          justifyContent="flex-end"
          alignItems="center"
        >
          <Grid item xs={12} md={12} sx={{ mb: { xs: "25px", md: "0" } }}>
            <Grid sx={{ display: "flex" }}>
              <IconProduct />
              <Typography sx={{ ml: "10px" }}>لیست دسته بندی ها</Typography>
            </Grid>
            <Grid>
              <Typography sx={{ mt: "10px", fontSize: "12px" }}>
                شما میتوانید در لیست زیر تمام دسته بندی های ثبت شده را مشاهده و
                ویرایش کنید.
              </Typography>
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

        <Grid
          container
          sx={{
            mt: "20px",
            display: "flex",
            justifyContent: "flex-end",
            my: 1,
          }}
          spacing={1}
        >
          <Grid item sx={{ display: "flex", justifyContent: "right" }}>
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
              }}
            >
              حذف
            </Button>
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
        <CategorryTable
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
      </AccountLayout>
    </>
  );
};
export default Categories;
