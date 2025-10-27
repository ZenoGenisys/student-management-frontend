import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { getAvatarProps } from '../utils/avatar';
import type { FeesPending } from '../types';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../routes';

type FeesPendingListProps = {
  data: FeesPending[];
};

const FeesPendingList = ({ data }: FeesPendingListProps) => {
  const navigate = useNavigate();

  return (
    <Box>
      <List disablePadding sx={{ p: 0 }}>
        {data.map((row, index) => (
          <ListItem
            key={row.studentId}
            divider={index < data.length - 1}
            sx={{
              py: 2,
              transition: 'background-color 0.3s',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
            onClick={() =>
              navigate(PATH.STUDENT_DETAILS.replace(':studentId', row.studentId.toString()))
            }
          >
            <ListItemAvatar>
              <Avatar {...getAvatarProps(row.name)} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="subtitle1" fontWeight="bold">
                  {row.name}
                </Typography>
              }
              secondary={`ID: ${row.studentId} | Total: ₹${row.totalAmount.toLocaleString()}`}
            />
            <Box textAlign="right">
              <Typography variant="body2" color="text.secondary">
                Outstanding
              </Typography>
              <Typography variant="h6" color="error.main" fontWeight="bold">
                ₹{row.outstandingAmount.toLocaleString()}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FeesPendingList;
