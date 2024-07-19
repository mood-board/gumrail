import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axiosInstance from "../../../service/axiosInstance";

import getLPTheme from "../../templates/landing-page/getLPTheme";
import { useNavigate } from "react-router-dom";

function CreateOrganisation() {
  const navigate = useNavigate();
  const [mode] = React.useState("light");
  const [showCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const [name, setName] = useState("");
  const [authEmail] = useState("dev@gumrail.com");
  const [employeeRange, setEmployeeRange] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, employeeRange, authEmail);
    axiosInstance
      .post("/organisation", {
        name: name,
        size: employeeRange,
        email: authEmail,
      })
      .then(({ data }) => {
        if (!data) {
          console.error("Received undefined data from the server");
          throw new Error("No data received from the server");
        }
        const { org_id: orgId } = data;

        if (orgId == null) {
          console.error("Organization ID is missing in the response");
          throw new Error("Invalid organization data");
        }

        localStorage.setItem("orgId", orgId);
        navigate("/onboard/site");
      })
      .catch((err) => {
        console.log("an error occurred while creating organisation", err);
      });
  };

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <Container sx={{ marginTop: "50px" }}>
        <Box sx={{ maxWidth: 400, margin: "auto", mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Create Organisation
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
              <FormLabel htmlFor="name">Organisation Name</FormLabel>
              <TextField
                id="name"
                type="text"
                name="name"
                placeholder="Organisation name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></TextField>
            </FormControl>

            <FormControl fullWidth margin="normal" required>
              <FormLabel htmlFor="number-of-employees">
                Number of Employees
              </FormLabel>
              <Select
                labelId="number-of-employees"
                value={employeeRange}
                label="Number of Employees"
                placeholder="Select number of employees"
                onChange={(e) => setEmployeeRange(e.target.value)}
              >
                <MenuItem value="1-50">1 - 50 employees</MenuItem>
                <MenuItem value="51-200">50 - 200 employees</MenuItem>
                <MenuItem value="201-1000">200 - 1000 employees</MenuItem>
                <MenuItem value="1000+">More than 1000 employees</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Create Organization
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default CreateOrganisation;
