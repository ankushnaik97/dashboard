// src/components/KpiCards.jsx
import React from 'react';
import { Grid } from '@mui/material';

const KpiCards = ({ totalItems, deletedItems, filteredItems }) => {
  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} sm={6} md={3}>
        <div className="kpi-card">
          <div className="kpi-title">Total Records</div>
          <div className="kpi-value">{totalItems}</div>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <div className="kpi-card">
          <div className="kpi-title">Filtered Records</div>
          <div className="kpi-value">{filteredItems}</div>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <div className="kpi-card">
          <div className="kpi-title">Deleted Items</div>
          <div className="kpi-value">{deletedItems}</div>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <div className="kpi-card">
          <div className="kpi-title">Active Users</div>
          <div className="kpi-value">{Math.round(totalItems * 0.7)}</div>
        </div>
      </Grid>
    </Grid>
  );
};

export default KpiCards;