import { Box, Chip, Typography } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useState } from "react";
import { stylesInput, chipTag } from "./styles";

export default function TagInput({
  dataTags,
  setDataTags,
  id = "tags",
  type = "text",
  readOnly = false,
}) {
  const [tagValue, setTagValue] = useState("");

  const handelAdd = (e) => {
    const value = e.target.value.trim();

    if (value !== "") {
      const copyTags = [...dataTags];
      const newTag = {
        id: Math.random().toString(),
        value,
      };
      copyTags.push(newTag);
      setDataTags(copyTags);
      setTagValue("");
    }
  };

  const handelEnter = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      e.preventDefault();

      handelAdd(e);
    }
  };

  const handelDelete = (id) => {
    const copyTags = [...dataTags];
    const newTags = copyTags.filter((x) => x.id !== id);
    setDataTags(newTags);
  };

  const handelEdit = (e) => {
    setTagValue(e.value);
    handelDelete(e.id);
  };

  return (
    <Box sx={stylesInput}>
      <Box
        className="box-input-add-tag"
        sx={{ py: dataTags?.length === 0 ? 0 : 1 }}
      >
        {dataTags?.map((e, i) => (
          <Chip
            color="primary"
            label={e.value}
            sx={chipTag}
            key={e.id}
            onDelete={() => handelDelete(e.id)}
            deleteIcon={
              <Typography component="span" sx={{}}>
                <svg
                  width="22"
                  height="23"
                  viewBox="0 0 22 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.8466 7.96294L7.15479 15.6548M14.8466 15.6547L7.15479 7.96289"
                    stroke="#28303F"
                    strokeWidth="1.35974"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Typography>
            }
            onDoubleClick={() => handelEdit(e)}
          />
        ))}
        <input
          type={type}
          id={id}
          name={id}
          onKeyDown={handelEnter}
          onBlur={handelAdd}
          value={tagValue}
          onChange={(e) => setTagValue(e.target.value)}
          // placeholder="برای افزودن Enter بزنید"
          readOnly={readOnly}
        />
      </Box>
    </Box>
  );
}
