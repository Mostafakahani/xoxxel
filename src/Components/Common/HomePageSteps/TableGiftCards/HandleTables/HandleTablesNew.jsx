import React, { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import NewGift from "Components/Common/HomePageSteps/TableGiftCards/Tables/TablePupolarGiftCard";
import ServerURL from "Components/Common/Layout/config";
import axios from "axios";
import moment from "moment-jalaali";
import GetToken from "GetToken";

const HandleTable = ({
  setSelectedId = () => {},
  getLinkTable,
  labelTable,
  dataBodyItems,
}) => {
  const [selected, setSelected] = useState([]);
  const [dataBody, setDataBody] = useState(dataBodyItems);
  const [dataBodyOptions, setDataBodyOptions] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const [pageDataAll, setPageDataAll] = useState({});
  const dataHead = ["کد محصول", "نام محصول", "نوع"];
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
        // const response = await axios.get(
        //   `${ServerURL.url}/admin/product/get-all-products?page=${page}&perPage=${perPage}`,
        //   config
        // );
        const data = dataBody;
        const pageData = data;

        setSelected(data?.map((x) => x?.id_product.id));

        setDataBodyOptions(
          data?.data?.map((item, index) => ({
            id: index + 1, // Fix the id assignment
            data: [
              `#${index + 1}`, // Use index + 1 as id
              {
                type: "textBold",
                text: item?.title || "نام ناشناخته",
              },
              {
                type: "text",
                text: item?.status,
              },
            ],
          }))
        );

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
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [page, perPage]); // Add page and perPage as dependencies

  return (
    <>
      <NewGift
        BackArrowEnabled={false}
        dataHead={dataHead}
        // label={labelTable}
        selected={selected}
        setSelected={(e) => {
          setSelected(e);
          setSelectedId(e);
        }}
        dataBody={dataBody}
        pageData={pageDataAll}
        setPage={(e) => setPage(e)}
        setPerPage={(e) => setPerPage(e)}
        perPage={pageDataAll.perPage}
      />
    </>
  );
};

export default HandleTable;
