import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Snackbar,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import { ContentCopy, Code, ExpandMore } from "@mui/icons-material";
import AppAppBar from "../nav/AppBar";
import getLPTheme from "../../templates/landing-page/getLPTheme";
import axiosInstance from "../../../service/axiosInstance";
import CodeSnippetDisplay from "../CodeSnippet";

const TrackingCodeDisplay = () => {
  const [mode] = React.useState("light");
  const [showCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const [trackingCode, setTrackingCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const location = useLocation();
  const [tabValue, setTabValue] = useState(2);
  const [testUrl, setTestUrl] = useState("");
  const [isDetected, setIsDetected] = useState(false);
  const [siteId, setSiteId] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const siteId = searchParams.get("site_id");
    if (siteId) {
      setLoading(true);
      setError("");
      axiosInstance
        .get(`/tracking-code?site_id=${siteId}`)
        .then((response) => {
          if (!response.data && !response.data.code) {
            console.error("Received undefined data from the server");
            throw new Error("No data received from the server");
          }
          setTrackingCode(response.data.code);
          setLoading(false);
        })
        .catch((err) => {
          setError("Error fetching tracking code. Please try again.");
          setLoading(false);
        });
    }
  }, [location]);

  const handleTestInstallation = () => {
    setLoading(true);
    setIsDetected(false);
    axiosInstance
      .get(`/integration/detect?site_id=5002`)
      .then((data) => {
        console.log("DATA: ", data);
        setIsDetected(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error testing installation. Please try again.");
        setLoading(false);
      });
  };

  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(trackingCode)
      .then(() => setSnackbarOpen(true))
      .catch((err) => console.error("Failed to copy: ", err));
  };

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppAppBar mode={mode} />
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mt: "10rem" }}>
            <Typography variant="h4" gutterBottom color="primary">
              Your Tracking Code
            </Typography>
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "200px",
                }}
              >
                <CircularProgress />
              </Box>
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : trackingCode ? (
              <Box>
                <CodeSnippetDisplay
                  code={trackingCode}
                  onClick={handleCopyCode}
                />

                {tabValue === 2 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Test Your Installation
                    </Typography>
                    <Typography variant="body1" paragraph>
                      To test your installation: 1. Make sure you've installed
                      the tracking code on your website. 2. Visit your website
                      and interact with it for a few minutes. 3. Come back here
                      and click the "Test Installation" button.
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={handleTestInstallation}
                      color="primary"
                      size="large"
                    >
                      Test Installation
                    </Button>
                  </Box>
                )}
              </Box>
            ) : (
              <Box>
                <Typography variant="body1" paragraph>
                  No site_id provided in the URL. Please add a site_id query
                  parameter to generate the tracking code.
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Example URL: http://yourapp.com/tracking?site_id=YOUR_SITE_ID
                </Typography>
              </Box>
            )}
          </Paper>
        </Container>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Tracking code copied to clipboard!
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default TrackingCodeDisplay;
