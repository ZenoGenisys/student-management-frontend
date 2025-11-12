import { Box, Button, Typography } from '@mui/material';
import ListView from '../../components/ListView';
import { useStaffSalary } from '../../hooks';
import { MenuCell, Pagination } from '../../components';
import type { CellRender, ColumnDefsProps, StaffSalaryRequest, StaffSalaryType } from '../../types';
import { useCallback, useMemo, useState } from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AddSalaryModal from './AddSalaryModal';
import { useAuth } from '../../state';

const StaffSalaryTab = () => {
  const {
    data,
    search,
    sort,
    page,
    rowsPerPage,
    handleSearch,
    handlePageChange,
    handleSort,
    handleRowPerPageChange,
    handleDelete,
    handleAdd,
    handleUpdate,
  } = useStaffSalary();
  const { role } = useAuth();
  const [open, setOpen] = useState(false);
  const [editSalary, setEditSalary] = useState<StaffSalaryType | null>(null);

  const handleToggleModal = useCallback(() => {
    setOpen((prev) => !prev);
    setEditSalary(null);
  }, []);

  const handleEdit = useCallback(
    (id: number) => {
      const salary = data?.data.find((s) => s.feesId === id);
      if (salary) {
        setEditSalary(salary);
        setOpen(true);
      }
    },
    [data?.data],
  );

  const handleSave = useCallback(
    (salary: StaffSalaryRequest) => {
      handleToggleModal();
      if (editSalary) {
        handleUpdate(salary);
      } else {
        handleAdd(salary);
      }
    },
    [handleToggleModal, handleUpdate, handleAdd, editSalary],
  );

  const Column = useMemo<ColumnDefsProps[]>(
    () => [
      { id: 'feesId', label: 'Fees ID', sortable: true },
      { id: 'salaryMonth', label: 'Salary For', sortable: true, dateFormat: true },
      { id: 'amount', label: 'Net Salary', sortable: true },
      { id: 'mode', label: 'Mode', sortable: true },
      { id: 'paymentDate', label: 'Payment Date', sortable: true, dateFormat: true },
      {
        id: 'actions',
        label: 'Action',
        sortable: false,
        hidden: role !== 'ADMIN',
        cellRenderer: (cellProps: CellRender<StaffSalaryType>) => (
          <MenuCell
            id={cellProps.row?.feesId}
            onClickEdit={() => handleEdit(cellProps.row.feesId)}
            onClickDelete={() => handleDelete(cellProps.row.feesId)}
          />
        ),
      },
    ],
    [role, handleDelete, handleEdit],
  );

  return (
    <Box>
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        alignItems={'center'}
        justifyContent={'space-between'}
        p={2}
        mb={2}
        sx={{ bgcolor: '#fff', border: '1px solid #E3E8EE' }}
      >
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: 16,
            pb: { xs: '10px', sm: '0px', md: '0px', lg: '0px', xl: '0px' },
          }}
        >
          Staff Salary
        </Typography>
        {role === 'ADMIN' && (
          <Box display={'flex'} alignItems={'center'} gap={2}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircleOutlineOutlinedIcon />}
              onClick={handleToggleModal}
            >
              Add Salary
            </Button>
          </Box>
        )}
      </Box>
      <Pagination
        page={page}
        pagination={data?.pagination}
        rowsPerPage={rowsPerPage}
        search={search as string | undefined}
        handleSearch={handleSearch}
        handlePageChange={handlePageChange}
        handleRowPerPageChange={handleRowPerPageChange}
      >
        <Box flexGrow={1}>
          <ListView
            columns={Column}
            rows={data?.data ?? []}
            sort={sort}
            showCheckbox={false}
            handleSort={handleSort}
            getRowId={(row) => row.feesId.toString()}
          />
        </Box>
      </Pagination>
      <AddSalaryModal
        open={open}
        onClose={handleToggleModal}
        editData={editSalary}
        onSave={handleSave}
      />
    </Box>
  );
};

export default StaffSalaryTab;
