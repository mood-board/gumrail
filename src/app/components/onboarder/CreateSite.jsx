import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  FormLabel,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axiosInstance from "../../../service/axiosInstance";

import getLPTheme from "../../templates/landing-page/getLPTheme";
import { useNavigate } from "react-router-dom";

function CreateSite() {
  const navigate = useNavigate();
  const [mode] = React.useState("light");
  const [showCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const [name, setName] = useState("");
  const [url, setURL] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let organisationID = localStorage.getItem("orgId");
    if (!organisationID) {
      console.error("Organization ID is missing in storage");
      throw new Error("Organization ID is missing");
    }

    axiosInstance
      .post("/site", {
        name: name,
        organisation_id: Number(organisationID),
        url: url,
      })
      .then(({ data }) => {
        if (!data) {
          console.error("Received undefined data from the server");
          throw new Error("No data received from the server");
        }
        const { site_id: siteId } = data;

        if (siteId == null) {
          console.error("Site ID is missing in the response");
          throw new Error("Invalid site data");
        }
        navigate("/onboard/setup");
      })
      .catch((err) => {
        console.log("an error occurred while creating site", err);
      });
  };

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <Container sx={{ marginTop: "50px" }}>
        <Box sx={{ maxWidth: 400, margin: "auto", mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Create Site
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
          >
            <FormControl>
              <FormLabel htmlFor="name">Site Name</FormLabel>
              <TextField
                id="name"
                type="text"
                name="name"
                placeholder="site name e.g. WordPress Demo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></TextField>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="url">URL</FormLabel>
              <TextField
                id="url"
                type="text"
                name="url"
                placeholder="enter a valid url"
                value={url}
                onChange={(e) => setURL(e.target.value)}
              ></TextField>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Create Site
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default CreateSite;
