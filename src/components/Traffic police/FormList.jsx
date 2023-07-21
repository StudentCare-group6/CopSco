import * as React from "react";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import CancelDialog from "./CancelDialog.jsx";

export default function FormList(props) {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/fineprint");
  };

  return (
    <Stack direction="row" spacing={30}>
      <Stack direction="column" spacing={4} alignItems="flex-start">
        {props.detailsArr.map((value) => (
          <Typography
            sx={{ wordWrap: "break-word", height: "30px" }}
            className="font-semibold text-md text-neutral-600"
          >
            {`${value}:`}
          </Typography>
        ))}
      </Stack>
      <Stack direction="column" spacing={4} alignItems="flex-end">
        {props.detailsArr.map((value) => (
          <Typography
            className="font-medium text-neutral-500 text-md"
            sx={{ height: "30px" }}
          >
            {props.dataArr[props.detailsArr.indexOf(value)]}
          </Typography>
        ))}
        <Stack direction="row" spacing={3}>
          <Button
            variant="contained"
            className="text-white"
            onClick={handleButtonClick}
          >
            Issue Fine
          </Button>
          <CancelDialog />
        </Stack>
      </Stack>
    </Stack>
  );
}
