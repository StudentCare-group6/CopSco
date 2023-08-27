import * as React from "react";
import Typography from "@mui/material/Typography";
import ProfileData from "../../data/profileData.js";
import Profile from "./ProfilePic.jsx";
import { MuiBreadcrumbs } from "../Traffic police/Breadcrumbs";
import TextField from "@mui/material/TextField";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import useAuth from '../../hooks/useAuth';

export default function Header() {
  const { auth } = useAuth();
  const name = auth.fname;
  const profileElements = ProfileData.map((profile) => {
    return (
      <Profile
        key={profile.id} // to remove a warning
        profile={profile}
        name={name}
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
