import { List, ListItem } from "@mui/material";
import Link from "Link";
import React from "react";
import styles from "./styles";

export default function SubMenu({ data }) {
  return (
    <List sx={styles.subMenu} className="submenu">
      {data &&
        data.map((e, i) => (
          <ListItem className="sub-item">
            <Link href={e.href} key={i} sx={{ color: "#000" }}>
              {e.text}
            </Link>
          </ListItem>
        ))}
    </List>
  );
}
