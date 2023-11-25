import { Button, Grid, Typography } from "@mui/material";
import ServerURL from "Components/Common/Layout/config";
import TabelOptions from "Components/Common/TableItems/TabelOptions";
import { useEffect, useState } from "react";
import axios from "axios";
import GetToken from "GetToken";

const RegonEdit = () => {
  const [regionData, setRegionData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [updateData, setUpdateData] = useState(false);
  const [page, setPage] = useState(1);

  const dataHead = ["id", "نام ریجن"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}`,
          },
        };
        setUpdateData(false);

        const response = await axios.get(
          `${ServerURL.url}/admin/country/get-all-country`,
          config
        );
        const apiData = response.data;
        const updatedRegionData = apiData.data.map((item) => {
          return {
            id: item.id,
            data: [
              `#${item.id}`,
              {
                type: "textBold",
                text: item.title,
              },
            ],
          };
        });
        setRegionData(updatedRegionData);
      } catch (error) {
        console.error("Error fetching data from the server:", error);
      }
    };

    fetchData();
  }, [updateData]);

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

      await axios.post(
        `${ServerURL.url}/admin/country/delete`,
        deleteData,
        config
      );
      setUpdateData(true);
    } catch (error) {
      console.error("Error sending delete request:", error);
    }
  };

  return (
    <Grid>
      {regionData.length !== 0 ? (
        <>
          <TabelOptions
            selected={selected}
            setSelected={setSelected}
            dataHead={dataHead}
            dataBody={regionData}
          />
          {selected.length !== 0 && (
            <Button
              onClick={handleDelete}
              disableElevation
              sx={{
                my: "10px",
                px: "10px",
                backgroundColor: "#D80027",
                color: "#fff",
                "&:hover": { color: "#000" },
              }}
            >
              حذف کردن
            </Button>
          )}
        </>
      ) : (
        <Typography sx={{ my: "10px" }}>موردی برای نمایش وجود ندارد</Typography>
      )}
    </Grid>
  );
};

export default RegonEdit;
