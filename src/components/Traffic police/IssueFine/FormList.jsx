import * as React from "react";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import CancelDialog from "./CancelDialog.jsx";

export default function FormList(props) {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/traffic-police/fine-confirmation");
  };

  return (
    <Stack direction="row" spacing={{ xs: 5, sm: 20, md: 30 }}>
      <Stack direction="column" spacing={4} align='left'>
        {props.detailsArr.map((value) => (
          <Typography
            sx={{ height: "40px"}}
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
            sx={{ height: "40px",  }}
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
