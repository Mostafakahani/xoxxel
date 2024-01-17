import React, { useState } from "react";
import NewT from "Components/Common/TableItems/NewT";
import { Grid } from "@mui/material";
import HandleTablesNew from "Components/Common/HomePageSteps/TableGiftCards/HandleTables/HandleTablesNew";

function SelectProduct({
  selected,
  dataBody,
  //   dataHead,
  pageDataAll,
  setPage = () => {},
  setPerPage = 15,
  setSelected = () => {},
}) {
//   const [selectedId, setSelectedId] = useState([]);

  return (
    <>
      {/* <Grid>{console.log(dataBody?.map((x) => x))}</Grid> */}
      <HandleTablesNew
        // dataHead={dataHead}
        dataBodyItems={dataBody}
        labelTable={"Category For You"}
        getLinkTable={"/admin/product/get-all-products?page=1&perPage=50"}
        setSelectedId={(e) => setSelected(e)}
      />
    </>
  );
}

export default SelectProduct;
