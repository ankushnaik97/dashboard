import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  IconButton, 
  Collapse,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox
} from '@mui/material';
import { RestoreFromTrash, ExpandMore, ExpandLess } from '@mui/icons-material';

const DeletedItemsPanel = ({ deletedItems, onRestore }) => {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState([]);

  const handleSelectAll = (event) => {
    setSelected(event.target.checked ? deletedItems.map(item => item.id) : []);
  };

  const handleSelect = (id) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const handleRestoreSelected = () => {
    onRestore(selected);
    setSelected([]);
  };

  return (
    <Paper elevation={3} sx={{ mt: 3, p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">
          Deleted Items ({deletedItems.length})
        </Typography>
        <Box>
          <Button 
            variant="contained" 
            color="secondary" 
            startIcon={<RestoreFromTrash />}
            onClick={handleRestoreSelected}
            disabled={selected.length === 0}
            sx={{ mr: 2 }}
          >
            Restore Selected
          </Button>
          <IconButton onClick={() => setExpanded(!expanded)}>
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
      </Box>
      
      <Collapse in={expanded}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < deletedItems.length}
                    checked={deletedItems.length > 0 && selected.length === deletedItems.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deletedItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selected.includes(item.id)}
                      onChange={() => handleSelect(item.id)}
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Collapse>
    </Paper>
  );
};

export default DeletedItemsPanel;