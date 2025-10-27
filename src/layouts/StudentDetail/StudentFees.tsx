import { Box, Button, Typography } from '@mui/material';
import ListView from '../../components/ListView';
import { useStudentFees } from '../../hooks';
import { MenuCell, Pagination } from '../../components';
import type { CellRender, ColumnDefsProps, StudentFeesRequest, StudentFeesType } from '../../types';
import { useCallback, useMemo, useState } from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import FeesModal from './FeesModal';

const StudentFees = () => {
  const {
    studentId,
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
  } = useStudentFees();
  const [open, setOpen] = useState(false);
  const [editSalary, setEditSalary] = useState<StudentFeesType | null>(null);

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
    (salary: StudentFeesRequest) => {
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
      { id: 'paymentMonth', label: 'Fees For', sortable: true, dateFormat: true },
      { id: 'amount', label: 'Amount', sortable: true },
      { id: 'outstandingAmount', label: 'Outstanding Amount', sortable: true },
      { id: 'totalAmount', label: 'Total Amount', sortable: true },
      { id: 'mode', label: 'Mode', sortable: true },
      { id: 'level', label: 'Level', sortable: true },
      { id: 'paymentDate', label: 'Payment Date', sortable: true, dateFormat: true },
      {
        id: 'actions',
        label: 'Action',
        sortable: false,
        cellRenderer: (cellProps: CellRender<StudentFeesType>) => (
          <MenuCell
            id={cellProps.row?.feesId}
            onClickEdit={() => handleEdit(cellProps.row.feesId)}
            onClickDelete={() => handleDelete(cellProps.row.feesId)}
          />
        ),
      },
    ],
    [handleEdit, handleDelete],
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
          Student Fees
        </Typography>
        <Box display={'flex'} alignItems={'center'} gap={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineOutlinedIcon />}
            onClick={handleToggleModal}
          >
            Add Fees
          </Button>
        </Box>
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
      <FeesModal
        id={Number(studentId)}
        open={open}
        onClose={handleToggleModal}
        editData={editSalary}
        onSave={handleSave}
      />
    </Box>
  );
};

export default StudentFees;
