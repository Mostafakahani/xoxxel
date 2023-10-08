import { Box } from "@mui/material";
import React from "react";
import styles from "./styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function Inputs({
  id,
  label,
  type = "text",
  icon = null,
  register,
  errors,
  registerOptions = {},
  readOnly = false,
  onChange = null,
  value = null,
}) {
  return (
    <Box sx={styles.box} className="input-box">
      <label htmlFor={id}>
        {label}
        <span>{errors && errors[id]?.message}</span>
      </label>
      <Box
        sx={styles.boxInput}
        className={`center-between ${errors && errors[id] && "error"}`}
      >
        <input
          type={type}
          name={id}
          id={id}
          className={id}
          style={{ paddingLeft: icon ? "28px" : "10px" }}
          {...(register &&
            register(id, { required: true, ...registerOptions }))}
          readOnly={readOnly}
          {...(onChange && { onChange: onChange })}
          {...(value && { value: value })}
        />
        <label htmlFor={id}> {icon}</label>
      </Box>
    </Box>
  );
}

export default Inputs;

export function NewTextarea({
  id,
  label,
  register,
  errors,
  registerOptions = {},
  readOnly = false,
}) {
  return (
    <Box sx={styles.box} className="input-box">
      <label htmlFor={id}>{label}</label>
      <Box
        sx={styles.boxInput}
        className={`textarea center-between ${errors[id] && "error"}`}
      >
        <textarea
          name={id}
          id={id}
          {...register(id, { required: true, ...registerOptions })}
          readOnly={readOnly}
          className="textarea-fill"
        ></textarea>
      </Box>
    </Box>
  );
}

export function Selects({
  id,
  label,
  onChange,
  value,
  dataList,
  readOnly = false,
}) {
  return (
    <Box sx={styles.box} className="box-select">
      <label htmlFor={id}>{label}</label>
      <Select
        value={value}
        onChange={onChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        sx={styles.select}
        readOnly={readOnly}
        name={id}
      >
        {dataList?.map((e) => (
          <MenuItem value={e?.value} key={e?.value}>
            {e?.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}

export function Textarea({
  id,
  label,
  register,
  errors,
  registerOptions = {},
  onChange = null,
  value = null,
}) {
  return (
    <Box sx={styles.box} className="input-box">
      <label htmlFor={id}>{label}</label>
      <Box
        sx={styles.boxInput}
        className={`center-between textarea ${errors && errors[id] && "error"}`}
      >
        <textarea
          multiline
          id={id}
          name={id}
          className={`text-field ${errors && errors[id] && "error"}`}
          {...(register &&
            register(id, { required: true, ...registerOptions }))}
          {...(onChange && { onChange: onChange })}
          {...(value && { value: value })}
        />
      </Box>
    </Box>
  );
}

export function InputAuth({
  id,
  label,
  type = "text",
  icon = null,
  register,
  errors,
  registerOptions = {},
  readOnly = false,
  placeholder = "",
}) {
  return (
    <Box sx={{ ...styles.box, ...styles.boxAuth }} className="input-box">
      <label htmlFor={id}>{label}</label>
      <Box
        sx={styles.boxInput}
        className={`auth center-between ${errors[id] && "error"}`}
      >
        <label htmlFor={id} className="right">
          {" "}
          {icon}
        </label>
        <input
          type={type}
          name={id}
          id={id}
          {...register(id, { required: true, ...registerOptions })}
          readOnly={readOnly}
          placeholder={placeholder}
        />
      </Box>
    </Box>
  );
}
