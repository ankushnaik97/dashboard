import React, { useState } from 'react';  // Added useState import here
import { 
  TextField, 
  Button, 
  Stack, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem 
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';

const FilterPanel = ({ onNameFilterChange }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [score, setScore] = useState('');

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    onNameFilterChange(value);
  };

  const handleClearFilters = () => {
    setName('');
    setStatus('');
    setScore('');
    onNameFilterChange('');
  };

  return (
    <div className="filter-panel">
      <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          name="name"
          label="Search by Name"
          variant="outlined"
          size="small"
          value={name}
          onChange={handleNameChange}
          sx={{ minWidth: 200 }}
        />
        
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={status}
            label="Status"
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value=""><em>All</em></MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </Select>
        </FormControl>
        
        <TextField
          name="score"
          label="Min Score"
          variant="outlined"
          size="small"
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          sx={{ minWidth: 120 }}
        />
        
        <Button
          variant="outlined"
          startIcon={<ClearIcon />}
          onClick={handleClearFilters}
        >
          Clear
        </Button>
      </Stack>
    </div>
  );
};

export default FilterPanel;