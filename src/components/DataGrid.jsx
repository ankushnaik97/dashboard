import React, { useState, useMemo, useRef, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { 
  Box, 
  Button, 
  Menu, 
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const statusValues = ['Active', 'Inactive', 'Pending'];

const StatusDropdown = ({ value, data, node, api }) => {
  const [status, setStatus] = useState(value);

  const handleChange = (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    data.status = newStatus;
    api.applyTransaction({ update: [data] });
  };

  return (
    <FormControl fullWidth size="small">
      <Select
        value={status}
        onChange={handleChange}
        sx={{
          '& .MuiSelect-select': {
            color: status === 'Active' ? '#2e7d32' : 
                   status === 'Inactive' ? '#d32f2f' : '#ed6c02',
            fontWeight: 'bold',
            padding: '0 8px',
            height: '32px',
            display: 'flex',
            alignItems: 'center'
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none'
          }
        }}
      >
        {statusValues.map((option) => (
          <MenuItem key={option} value={option}>{option}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const DataGrid = ({ rowData, onDelete, onStatusChange }) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const gridRef = useRef();

  // Column definitions with custom status dropdown
  const columnDefs = useMemo(() => [
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 80, 
      checkboxSelection: true,
      headerCheckboxSelection: true 
    },
    { field: 'name', headerName: 'Name', filter: 'agTextColumnFilter', floatingFilter: true },
    { field: 'email', headerName: 'Email', filter: 'agTextColumnFilter' },
    { field: 'age', headerName: 'Age', width: 100, filter: 'agNumberColumnFilter' },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 150,
      cellRenderer: StatusDropdown,
      filter: 'agSetColumnFilter',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: statusValues
      }
    },
    { 
      field: 'score', 
      headerName: 'Score', 
      width: 120,
      filter: 'agNumberColumnFilter',
      cellStyle: params => ({
        color: params.value >= 90 ? '#2e7d32' : 
               params.value >= 80 ? '#689f38' : 
               params.value < 70 ? '#d32f2f' : 'inherit',
        fontWeight: params.value >= 90 ? 'bold' : 'normal'
      })
    },
    { 
      field: 'actions',
      headerName: '',
      width: 80,
      cellRenderer: (params) => (
        <IconButton 
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            setAnchorEl(e.currentTarget);
            setSelectedIds([params.data.id]);
          }}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      ),
      sortable: false,
      filter: false,
      editable: false
    }
  ], []);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    filter: true,
    editable: true,
    floatingFilter: true,
    suppressMenu: true
  }), []);

  const filteredData = useMemo(() => {
    if (!statusFilter) return rowData;
    return rowData.filter(item => item.status === statusFilter);
  }, [rowData, statusFilter]);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    onDelete(selectedIds);
    if (gridRef.current) {
      gridRef.current.api.deselectAll();
    }
    handleMenuClose();
  };

  const onSelectionChanged = useCallback(() => {
    if (gridRef.current) {
      const selectedNodes = gridRef.current.api.getSelectedNodes();
      const selectedIds = selectedNodes.map(node => node.data.id);
      setSelectedIds(selectedIds);
    }
  }, []);

  const onCellValueChanged = useCallback((event) => {
    if (event.colDef.field === 'status' && onStatusChange) {
      onStatusChange(event.data.id, event.data.status);
    }
  }, [onStatusChange]);

  return (
    <Box className="grid-container">
      {/* Navigation Bar for Table */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2,
        p: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: '4px'
      }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Filter Status</InputLabel>
          <Select
            value={statusFilter}
            label="Filter Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {statusValues.map(status => (
              <MenuItem key={status} value={status}>{status}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => {
              onDelete(selectedIds);
              if (gridRef.current) {
                gridRef.current.api.deselectAll();
              }
            }}
            disabled={selectedIds.length === 0}
            sx={{ mr: 1 }}
          >
            Delete ({selectedIds.length})
          </Button>
        </Box>
      </Box>

      {/* AG Grid Table */}
      <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
        <AgGridReact
          ref={gridRef}
          rowData={filteredData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          onSelectionChanged={onSelectionChanged}
          onCellValueChanged={onCellValueChanged}
          pagination={true}
          paginationPageSize={10}
          suppressCellFocus={true}
          animateRows={true}
          domLayout="normal"
          onFirstDataRendered={(params) => params.api.sizeColumnsToFit()}
          onGridReady={(params) => params.api.sizeColumnsToFit()}
        />
      </div>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleDeleteClick}>
          <DeleteIcon sx={{ mr: 1 }} /> Delete
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
        <MenuItem onClick={handleMenuClose}>View Details</MenuItem>
      </Menu>
    </Box>
  );
};

export default DataGrid;