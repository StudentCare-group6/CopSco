import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ImageSlideShow from "../../components/Login/ImageCarousel";
import { Stack } from "@mui/material";
import Container from "@mui/material/Container";
import useFormContext from "../../hooks/useFormContext";
import FormInputs from "./FormInputs";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "../../api/posts";


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Register() {
  const { page, setPage, title, subtitle, handleSubmit, getValues, setValue, errors } =
    useFormContext();

  const onSubmit = async (e) => {
    if (page === 3) {
      if (getValues('verifyMode') === '1') {
        if (!getValues('nicFrontFile') || !getValues('nicRearFile')) {
          alert("Error: Check whether you've uploaded files ");
        } else {
          setPage(page + 1);
        }
      } else {
        setPage(page + 1);
      }
      setPage(page + 1);
    } else if (page === 4) {
      setValue("username", getValues("nic"));
      const data = getValues();
      try {
        //send basic data to the backend
        const response = await axios.post("auth/register", data);
        alert(response.data.message);

      } catch (err) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }
      
      //send the uploaded files to the backend
      try {
        //send the uploaded files to the backend
        const frontFile = e.nicFrontFile[0];
        const backFile = e.nicRearFile[0];
        const userImageBlob = localStorage.getItem("takenPhoto");
        const nicNum = getValues("nic");
        const FrontName = getValues("nic") + "_front.png";
        const BackName = getValues("nic") + "_rear.png";
        const UserImageName = getValues("nic") + "_img.png";

        // Create a new File object with the preferred name
        const renamedFrontFile = new File([frontFile], FrontName, {
          type: frontFile.type,
        });
        const renamedBackFile = new File([backFile], BackName, {
          type: backFile.type,
        });
        const userImageFile = new File([userImageBlob], UserImageName, {
          type: userImageBlob.type,
        });

        let formData2 = new FormData();
        formData2.append("nic_front", renamedFrontFile);
        formData2.append("nice_back", renamedBackFile);
        formData2.append("user_img", userImageFile);
        formData2.append("nic_num", nicNum);
        const response = await axios.post("/upload/verify-doc", formData2);
        console.log(response.data);
        handleNext();

      } catch (err) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }
    } else if (page === 5) {

      try {
        const response = await axios.post("auth/verify-otp",
          JSON.stringify({ otp: getValues("otp") }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (response.data.message === "OTP verification successful") {
          console.log(response.data);
          setPage(page + 1);
        } else {
          alert("Error: " + response.data.message);
        }
      } catch (err) {
        alert("Error occurred");
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }

    } else {
      handleNext();
    }
  };

  const handlePrev = () => setPage(page - 1);
  const handleNext = () => setPage(page + 1);


  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Typography
            sx={{ margin: "20px" }}
            component="h1"
            variant="h5"
            className="font-extrabold text-black"
          >
            CopSco
          </Typography>
          <Stack
            justifyContent="center"
            alignItems="center"
            spacing={3}
            sx={{ marginTop: "3%" }}
          >
            <Typography
              component="h1"
              variant="h4"
              className="font-extrabold text-neutral-500"
            >
              {title[page]}
            </Typography>
            <Typography
              component="h1"
              textAlign="center"
              variant="subtitle1"
              sx={{ width: "50%" }}
              className="font-light text-neutral-500"
            >
              {subtitle[page]}
            </Typography>
          </Stack>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{ mt: 3 }}
              >
                <FormInputs />
                <Stack
                  direction="row"
                  justifyContent="space-around"
                  sx={{ marginTop: "30px" }}
                >
                  {page === 0 && (
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ width: "30%" }}
                    >
                      Next
                    </Button>
                  )}
                  {page > 0 && page < 3 && (
                    <>
                      <Button
                        variant="outlined"
                        type="button"
                        onClick={handlePrev}
                        sx={{ width: "30%" }}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        type="submit"
                        sx={{ width: "30%" }}
                      >
                        Next
                      </Button>
                    </>
                  )}
                  {page === 3 && (
                    <>
                      <Button
                        variant="outlined"
                        type="button"
                        onClick={handlePrev}
                        sx={{ width: "30%" }}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        type="submit"
                        sx={{ width: "30%" }}
                      >
                        Next
                      </Button>
                    </>
                  )}
                  {page === 4 && (
                    <>
                      <Button
                        variant="outlined"
                        type="button"
                        onClick={handlePrev}
                        sx={{ width: "30%" }}
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ width: "30%" }}
                      >
                        Send OTP
                      </Button>
                    </>
                  )}
                  {page === 5 && (
                    <>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ width: "30%" }}
                      >
                        Verify OTP
                      </Button>
                    </>
                  )}
                  {page === 6 && (
                    <>
                      <Button
                        variant="outlined"
                        type="button"
                        onClick={handleButtonClick}
                        sx={{ width: "30%" }}
                      >
                        Return
                      </Button>
                    </>
                  )}
                </Stack>
              </Box>
            </Box>
            <div>
              {page === 4 && (
                <Grid container justifyContent="center" className="mt-10">
                  <Grid item>
                    Didn't receive OTP ?
                    <Link href="#" className="ml-1">
                      Resend
                    </Link>
                  </Grid>
                </Grid>
              )}

              {page !== 3 && page !== 4 && (
                <Grid container justifyContent="flex-end" sx={{ mt: 3 }}>
                  <Grid item>
                    <Link href="#" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              )}
            </div>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </Grid>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={6}>
          <ImageSlideShow />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
