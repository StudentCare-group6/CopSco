import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ProfileData from "../../data/profileData.js";
import Profile from "./ProfilePic.jsx";
import HelpIcon from "@mui/icons-material/Help";
import Stack from "@mui/material/Stack";
import { MuiBreadcrumbs } from "../Traffic police/Breadcrumbs";
import TextField from "@mui/material/TextField";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InputAdornment from "@mui/material/InputAdornment";

export default function Header() {
  const profileElements = ProfileData.map((profile) => {
    return (
      <Profile
        key={profile.id} // to remove a warning
        profile={profile}
      />
    );
  });

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div className="flex justify-center ">
        <MuiBreadcrumbs />
      </div>
      <div
        className="flex items-center "
        // style={{ marginLeft: "auto" }}
      >
        <TextField
          id="input-with-icon-textfield"
          placeholder="Search across your profile"
          variant="outlined"
          autoFocus={false}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment>
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="">
        <Typography variant="h6" component="div">
          {profileElements}
        </Typography>
      </div>
    </div>
  );
}
