import * as React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Steppers from "../../components/GeneralUserRegistration/Steppers";
import Alert from "@mui/material/Alert";
import useFormContext from "../../hooks/useFormContext";
import { policeDivisions } from "../../data/Constants";
import { useState } from "react";
import { Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

export default function GeneralDetails() {
  const { register, errors, setValue } = useFormContext();
  const [selectedDivision, setSelectedDivision] = useState([]);
  const [selectedDivisionCode, setSelectedDivisionCode] = useState(""); // State to hold selected offences
  const handleDivisionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedDivision(selectedValue);

    const selectedDivisionCode = policeDivisions.get(selectedValue);
    setSelectedDivisionCode(selectedDivisionCode);
    setValue('divisionCode', selectedDivisionCode);
  };
  return (
    <div>
      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Steppers step={0} />
        <Grid item xs={12} sm={6} sx={{ mt: 6 }}>
          <TextField
            autoComplete="given-name"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
            {...register("fname", {
              required: "field required",
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Invalid first name",
              },
            })}
          />
          {errors.firstName?.message ? (
            <Alert sx={{ mt: "10px" }} severity="error">
              {errors.firstName?.message}
            </Alert>
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={12} sm={6} sx={{ mt: 6 }}>
          <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            autoComplete="family-name"
            {...register("lname", {
              required: "field required",
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Invalid last name",
              },
            })}
          />
          {errors.lastName?.message ? (
            <Alert sx={{ mt: "10px" }} severity="error">
              {errors.lastName?.message}
            </Alert>
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={12} sx={{ mt: 3 }}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            {...register("email", {
              required: "field required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address",
              },
              // validate: {
              //     checkEmail: async (value) => {
              //         // const res = await fetch(`http://localhost:3001/user/checkEmail/${value}`);
              //         const res = await fetch(`https://jsonplaceholder.typicode.com/users?email=${value}`)
              //         const data = await res.json();
              //         return data.length === 0 || "Email already exists";
              //     }
              // }
            })}
          />
          {errors.email?.message ? (
            <Alert sx={{ mt: "10px" }} severity="error">
              {errors.email?.message}
            </Alert>
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={12} >
          <Typography
            variant="caption"
            className="font-light text-neutral-500"
          >
            *Select the nearest police division
          </Typography>
          <TextField
            id="division"
            label="Division"
            fullWidth
            select
            sx={{ marginTop: "3%" }}
            SelectProps={{
              
              value: selectedDivision,
              onChange: handleDivisionChange,
            }}
            {...register("divisionTitle", {
              required: "field required",
            })}
          >
            {Array.from(policeDivisions.keys()).map((division) => (
              <MenuItem
                key={division}
                value={division}
                sx={{ marginTop: "3%", width: "80%" }}
              >
                {division}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </div>
  );
}
