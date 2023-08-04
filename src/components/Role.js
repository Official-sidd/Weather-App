import { Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";

export function Role() {
  const [selectState, setSelectState] = useState("");

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectState(selectedValue);
  };

  return (
    <Grid
      border={"2px solid black"}
      style={{ borderRadius: "16px", padding: "2rem" }}
    >
      <Grid container border={"2px solid red"} style={{display:"flex",flexDirection:"column"}}>
        <Grid item>
          <InputLabel htmlFor="roleSelect">Admin role</InputLabel>
        </Grid>
        <Grid>
          <Select
            id="roleSelect"
            value={selectState}
            label=""
            onChange={handleSelectChange}
            fullWidth
            style={{width:"20%"}}
          >
            <MenuItem value="role1">Admin Role 1</MenuItem>
            <MenuItem value="role2">Admin Role 2</MenuItem>
            <MenuItem value="role3">Admin Role 3</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <Grid className="roleAccess">
        <Grid
          className="roleHeaders"
          style={{
            border: "2px solid yellow",
            display: "flex",
            paddingLeft: "2rem",
          }}
        >
          <Typography width={"40%"}>Modules</Typography>
          <Typography width={"15%"}>Create</Typography>
          <Typography width={"15%"}>Read</Typography>
          <Typography width={"15%"}>Update</Typography>
          <Typography width={"15%"}>Delete</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
