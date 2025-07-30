// src/components/Layout.jsx
import React, { useState } from 'react';
import DashboardHeader from './DashboardHeader';
import KpiCards from './KpiCards';
import FilterPanel from './FilterPanel';
import DataGrid from './DataGrid';
import DeletedItemsPanel from './DeletedItemsPanel';
import { Box } from '@mui/material';

const Layout = () => {
  const [deletedItems, setDeletedItems] = useState([]);
  const [rowData, setRowData] = useState([
    { id: 1, name: 'John Smith', email: 'john.smith@example.com', age: 32, status: 'Active', score: 85, joinDate: '2022-01-15' },
    { id: 2, name: 'Emily Johnson', email: 'emily.j@example.com', age: 28, status: 'Active', score: 92, joinDate: '2021-11-03' },
    { id: 3, name: 'Michael Brown', email: 'michael.b@example.com', age: 41, status: 'Inactive', score: 67, joinDate: '2020-05-22' },
    { id: 4, name: 'Sarah Davis', email: 'sarah.d@example.com', age: 35, status: 'Active', score: 78, joinDate: '2022-02-18' },
    { id: 5, name: 'Robert Wilson', email: 'robert.w@example.com', age: 29, status: 'Pending', score: 88, joinDate: '2023-01-05' },
    { id: 6, name: 'Jennifer Lee', email: 'jennifer.l@example.com', age: 31, status: 'Active', score: 95, joinDate: '2021-09-14' },
    { id: 7, name: 'David Miller', email: 'david.m@example.com', age: 45, status: 'Inactive', score: 72, joinDate: '2019-07-30' },
    { id: 8, name: 'Lisa Taylor', email: 'lisa.t@example.com', age: 27, status: 'Active', score: 81, joinDate: '2022-06-12' },
    { id: 9, name: 'James Anderson', email: 'james.a@example.com', age: 38, status: 'Pending', score: 63, joinDate: '2023-02-28' },
    { id: 10, name: 'Jessica Martinez', email: 'jessica.m@example.com', age: 33, status: 'Active', score: 89, joinDate: '2021-04-17' },
    { id: 11, name: 'Thomas Thomas', email: 'thomas.t@example.com', age: 40, status: 'Inactive', score: 70, joinDate: '2020-08-09' },
    { id: 12, name: 'Amanda Garcia', email: 'amanda.g@example.com', age: 26, status: 'Active', score: 94, joinDate: '2022-09-21' },
    { id: 13, name: 'Christopher Rodriguez', email: 'chris.r@example.com', age: 36, status: 'Active', score: 82, joinDate: '2021-12-05' },
    { id: 14, name: 'Nicole Wilson', email: 'nicole.w@example.com', age: 30, status: 'Pending', score: 76, joinDate: '2023-03-15' },
    { id: 15, name: 'Matthew Moore', email: 'matthew.m@example.com', age: 42, status: 'Inactive', score: 65, joinDate: '2019-11-27' },
    { id: 16, name: 'Elizabeth Jackson', email: 'elizabeth.j@example.com', age: 34, status: 'Active', score: 91, joinDate: '2022-04-08' },
    { id: 17, name: 'Daniel White', email: 'daniel.w@example.com', age: 37, status: 'Active', score: 84, joinDate: '2021-07-19' },
    { id: 18, name: 'Megan Harris', email: 'megan.h@example.com', age: 29, status: 'Pending', score: 79, joinDate: '2023-01-30' },
    { id: 19, name: 'Andrew Clark', email: 'andrew.c@example.com', age: 43, status: 'Inactive', score: 68, joinDate: '2020-03-14' },
    { id: 20, name: 'Olivia Lewis', email: 'olivia.l@example.com', age: 31, status: 'Active', score: 93, joinDate: '2022-07-22' }
  ]);

  const handleDelete = (selectedItems) => {
    const itemsToDelete = rowData.filter(item => selectedItems.includes(item.id));
    setRowData(prev => prev.filter(item => !selectedItems.includes(item.id)));
    setDeletedItems(prev => [...prev, ...itemsToDelete]);
  };

  const handleRestore = (itemIds) => {
    const itemsToRestore = deletedItems.filter(item => itemIds.includes(item.id));
    setRowData(prev => [...prev, ...itemsToRestore]);
    setDeletedItems(prev => prev.filter(item => !itemIds.includes(item.id)));
  };

  const handleStatusChange = (id, newStatus) => {
    setRowData(prev => prev.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));
  };

  return (
    <>
      <DashboardHeader />
      <Box className="main-content">
        <KpiCards 
          totalItems={rowData.length} 
          deletedItems={deletedItems.length} 
        />
        <FilterPanel />
        <DataGrid 
          rowData={rowData} 
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}  
        />
        {deletedItems.length > 0 && (
          <DeletedItemsPanel 
            deletedItems={deletedItems} 
            onRestore={handleRestore}
          />
        )}
      </Box>
    </>
  );
};

export default Layout;