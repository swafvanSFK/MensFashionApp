// src/pages/Dashboard.jsx
import { Box, Grid, Typography } from '@mui/material';
import RevenueDistributionChart from '../components/admin/RevenueDistributionChart'
import TopProductsChart from '../components/admin/TopProductsChart'
import UserGrowthChart from '../components/admin/UserGrowthChart'
import SalesChart from '../components/admin/SalesChart';

const AdminDashboard = () => {
  return (
    <Box className="p-4">
      <Grid container spacing={4}>
        {/* Sales Overview */}
        <Grid item xs={12} md={6}>
          <Box className="bg-white p-4 rounded shadow">
            <Typography variant="h6" className="mb-2">
              Sales Overview
            </Typography>
            <SalesChart />
          </Box>
        </Grid>

        {/* Top Products */}
        <Grid item xs={12} md={6}>
          <Box className="bg-white p-4 rounded shadow">
            <Typography variant="h6" className="mb-2">
              Top Products
            </Typography>
            <TopProductsChart />
          </Box>
        </Grid>

        {/* Revenue Distribution */}
        <Grid item xs={12} md={6}>
          <Box className="bg-white p-4 rounded shadow">
            <Typography variant="h6" className="mb-2">
              Revenue Distribution
            </Typography>
            <RevenueDistributionChart />
          </Box>
        </Grid>

        {/* User Growth */}
        <Grid item xs={12} md={6}>
          <Box className="bg-white p-4 rounded shadow">
            <Typography variant="h6" className="mb-2">
              User Growth
            </Typography>
            <UserGrowthChart />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
