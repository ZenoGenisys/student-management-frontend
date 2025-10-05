import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SensorOccupiedOutlinedIcon from '@mui/icons-material/SensorOccupiedOutlined';

type HeaderProps = {
  title: string;
  showRevoke?: boolean;
  editLabel?: string;
  onClickEdit: () => void;
  onClickPromote?: () => void;
  onClickRevoke?: () => void;
};
const HeaderDetails = ({
  title,
  showRevoke,
  editLabel = 'Edit',
  onClickEdit,
  onClickPromote,
  onClickRevoke,
}: HeaderProps) => {
  return (
    <Box
      flexGrow={1}
      display={'flex'}
      justifyContent="space-between"
      alignItems="center"
      padding={2}
      paddingLeft={0}
      paddingRight={0}
    >
      <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Box display={'flex'} gap={2}>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          startIcon={<EditOutlinedIcon />}
          onClick={onClickEdit}
        >
          {editLabel}
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<SensorOccupiedOutlinedIcon />}
          onClick={onClickPromote}
        >
          Promote
        </Button>
        {showRevoke && (
          <Button
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<SensorOccupiedOutlinedIcon />}
            onClick={onClickRevoke}
          >
            Revoke Promotion
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default HeaderDetails;
