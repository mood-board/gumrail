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
} from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import AppAppBar from "../nav/AppBar";
import getLPTheme from "../../templates/landing-page/getLPTheme";
import axiosInstance from "../../../service/axiosInstance";

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
                <Typography variant="body1" paragraph>
                  Here's your generated tracking code. Copy and paste this into
                  your website's HTML.
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={10}
                  value={trackingCode}
                  InputProps={{
                    readOnly: true,
                    sx: { fontFamily: "monospace", fontSize: "0.9rem" },
                  }}
                  sx={{ mb: 3, backgroundColor: "#f8f8f8", height: "250px" }}
                />
                <Button
                  variant="contained"
                  startIcon={<ContentCopy />}
                  onClick={handleCopyCode}
                  color="secondary"
                  size="large"
                >
                  Copy to Clipboard
                </Button>
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
