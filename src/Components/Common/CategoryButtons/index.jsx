import { Box, Button } from "@mui/material";
import React from "react";
import styles from "./styles";
import { useGlobal } from "Context/GlobalContext";

function CategoryButtons({
  data,
  active,
  setActive,
  catType,
  listCustomTabs = null,
}) {
  const { category } = useGlobal();

  const dataMap = listCustomTabs ? listCustomTabs : category[catType];

  return (
    <Box
      className="center tab-box"
      sx={{
        ml: { xs: 0, sm: 4 },
        justifyContent: { xs: "center", sm: "start" },
        width: { xs: "100%", sm: "auto" },
        overflow: "auto",
      }}
    >
      {!listCustomTabs && (
        <Button
          color="inherit"
          sx={styles.btn}
          className={`
            ${active === null && "active"}
          `}
          onClick={() => setActive(null)}
        >
          همه
        </Button>
      )}
      {dataMap?.map((e, i) => (
        <Button
          color="inherit"
          key={i}
          sx={styles.btn}
          className={`${i === 0 && "first"} ${i === data?.length - 1 && "last"} 
            ${active === e["cat-id"] && "active"}
          `}
          onClick={() => setActive(e["cat-id"])}
        >
          {e?.cat_name}
          {/* {e?.icon} */}
        </Button>
      ))}
    </Box>
  );
}

export default CategoryButtons;
