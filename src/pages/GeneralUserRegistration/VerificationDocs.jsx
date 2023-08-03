import * as React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Steppers from "../../components/GeneralUserRegistration/Steppers";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from "../../components/GeneralUserRegistration/SnackBar";
import useFormContext from "../../hooks/useFormContext";
import docImg from "../../images/verified.png";

export default function VerificationDocs() {
  const { data, handleChange, form, register, control, errors } =
    useFormContext();
  return (
    <div>
      <Snackbar />
      <Grid container spacing={2}>
        <Stack sx={{ width: "100%" }} alignItems="center">
          <img src={docImg} className="w-32" />
        </Stack>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="nic"
            label="NIC"
            {...register("nic", {
              required: "field required",
              pattern: {
                value: /^(?:\d{12}|(?:\d{9}[vVxX]))$/,
                message: "Invalid NIC No.",
              },
            })}
          />
          {errors.nic?.message ? (
            <Alert sx={{ mt: "10px" }} severity="error">
              {errors.nic?.message}
            </Alert>
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={12}>
          <div className="border-2 p-3 rounded-lg border-zinc-300">
            <label for="nicFile" class="mb-2 inline-block text-neutral-500 ">
              Upload Front image of NIC*
            </label>
            <input
              id="nicFile"
              className="bg-gray-200 rounded-lg p-3"
              type="file"
              accept="image/*" // This line specifies that only image files are accepted
              {...register("nicFrontFile")}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="border-2 p-3 rounded-lg border-zinc-300">
            <label
              htmlFor="nicFile"
              className="mb-2 inline-block text-neutral-500"
            >
              Upload Rear image of NIC*
            </label>
            <input
              id="nicFile"
              className="bg-gray-200 rounded-lg p-3"
              type="file"
              accept="image/*" // This line specifies that only image files are accepted
              {...register("nicRearFile")}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
