import React from "react";
import { Paper, Typography, Button, Box } from "@mui/material";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";

SyntaxHighlighter.registerLanguage("javascript", js);

const CodeSnippetDisplay = ({ code, language = "javascript", onClick }) => {
  return (
    <Box sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 2, my: 2, bgcolor: "#f8f8f8" }}>
        <Typography variant="h6" gutterBottom>
          Install Gumrail on your site
        </Typography>
        <Paper variant="outlined" sx={{ p: 1, mb: 2, bgcolor: "white" }}>
          <SyntaxHighlighter
            language={language}
            style={github}
            showLineNumbers
            customStyle={{ margin: 0 }}
          >
            {code}
          </SyntaxHighlighter>
        </Paper>
        <Button variant="outlined" size="small" onClick={onClick}>
          Copy code
        </Button>
      </Paper>
    </Box>
  );
};

export default CodeSnippetDisplay;
