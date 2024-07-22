import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";

import { Insights, Timeline, Settings } from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", visits: 4000 },
  { name: "Feb", visits: 3000 },
  { name: "Mar", visits: 2000 },
  { name: "Apr", visits: 2780 },
  { name: "May", visits: 1890 },
  { name: "Jun", visits: 2390 },
];

function Dashboard() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom component="div">
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper
            sx={{ p: 2, display: "flex", flexDirection: "column", height: 240 }}
          >
            <Typography variant="h6" gutterBottom component="div">
              Site Visits
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="visits" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{ p: 2, display: "flex", flexDirection: "column", height: 240 }}
          >
            <Typography variant="h6" gutterBottom component="div">
              Quick Actions
            </Typography>
            <List>
              <ListItem button>
                <ListItemIcon>
                  <Insights />
                </ListItemIcon>
                <ListItemText primary="View Insights" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <Timeline />
                </ListItemIcon>
                <ListItemText primary="Generate Report" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText primary="Update Settings" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" gutterBottom component="div">
              Recent Activity
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="New user signup"
                  secondary="2 minutes ago"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Feedback received"
                  secondary="15 minutes ago"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Site traffic spike detected"
                  secondary="1 hour ago"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
