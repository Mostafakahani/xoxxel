import { Box } from "@mui/material";
import React from "react";
import styles from "./styles";

function Search(props) {
  return (
    <Box
      sx={{ ...styles.boxSearch, ...props?.sx }}
      className="center searchBar"
    >
      <svg
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.8531 15.6469L11.4313 11.225C12.4063 10.0875 12.9719 8.61563 12.9719 7C12.9719 3.40937 10.0616 0.5 6.47188 0.5C2.88219 0.5 0 3.41031 0 7C0 10.5897 2.91001 13.5 6.47188 13.5C8.08688 13.5 9.56094 12.9075 10.6969 11.9328L15.1188 16.3547C15.2438 16.45 15.3719 16.5 15.5 16.5C15.6281 16.5 15.7559 16.4512 15.8534 16.3535C16.05 16.1594 16.05 15.8406 15.8531 15.6469ZM6.50001 12.5C3.44063 12.5 1.00001 10.0312 1.00001 7C1.00001 3.96875 3.44063 1.5 6.50001 1.5C9.55938 1.5 12 3.94062 12 7C12 10.0594 9.53126 12.5 6.50001 12.5Z"
          fill="#616161"
        />
      </svg>

      <input
        placeholder="جستجو"
        name="search"
        // {...(props?.value && { value: props?.value })}
        // {...(props?.onChange && { onChange: props?.onChange })}
        {...props}
      />
    </Box>
  );
}

export default Search;

Search.defaultProps = {
  sx: {},
};
