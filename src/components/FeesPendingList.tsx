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

type FeeData = {
  id: string;
  name: string;
  totalAmount: number;
  outstanding: number;
};

type FeesPendingListProps = {
  data: FeeData[];
};

const FeesPendingList = ({ data }: FeesPendingListProps) => {
  return (
    <Box>
      <List disablePadding sx={{ p: 0 }}>
        {data.map((row, index) => (
          <ListItem
            key={row.id}
            divider={index < data.length - 1}
            sx={{
              py: 2,
              transition: 'background-color 0.3s',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
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
              secondary={`ID: ${row.id} | Total: ₹${row.totalAmount.toLocaleString()}`}
            />
            <Box textAlign="right">
              <Typography variant="body2" color="text.secondary">
                Outstanding
              </Typography>
              <Typography variant="h6" color="error.main" fontWeight="bold">
                ₹{row.outstanding.toLocaleString()}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FeesPendingList;