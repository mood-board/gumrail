import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Divider,
} from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";

const HotjarSetup = () => {
  const hotjarScript = `
<!-- Hotjar Tracking Code for https://localhost:5500 -->
<script>
  (function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:4969656,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>
  `;

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 5 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Install Hotjar on your site
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            1. Copy this code.
          </Typography>
          <Box
            component="pre"
            sx={{ backgroundColor: "#f5f5f5", padding: 2, borderRadius: 1 }}
          >
            {hotjarScript}
          </Box>
          <CopyToClipboard text={hotjarScript}>
            <Button variant="contained" sx={{ mt: 2 }}>
              Copy code
            </Button>
          </CopyToClipboard>
          <Divider sx={{ my: 3 }} />
          <Typography variant="body1" component="div" gutterBottom>
            2. Paste the code into the <code>&lt;head&gt;</code> of every page
            where you want to track user behavior or collect feedback.
          </Typography>
          <Divider sx={{ my: 3 }} />
          <Typography variant="body1" component="div" gutterBottom>
            3. To make sure everything is ready, verify that your code was
            installed.
          </Typography>
          <Button variant="outlined" sx={{ mt: 2 }}>
            Verify installation
          </Button>
          <Divider sx={{ my: 3 }} />
          <Typography variant="body1" component="div" gutterBottom>
            Other ways to install:
          </Typography>
          <Button variant="outlined" sx={{ mt: 2, mr: 2 }}>
            Install with a developer's help
          </Button>
          <Button variant="outlined" sx={{ mt: 2, mr: 2 }}>
            Install on a platform
          </Button>
          <Button variant="outlined" sx={{ mt: 2 }}>
            Install with a npm package
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HotjarSetup;
