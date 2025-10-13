import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SensorOccupiedOutlinedIcon from '@mui/icons-material/SensorOccupiedOutlined';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';

type HeaderProps = {
  title: string;
  showRevoke?: boolean;
  editLabel?: string;
  isStaff?: boolean;
  onClickEdit: () => void;
  onClickPromote?: () => void;
  onClickRevoke?: () => void;
};
const HeaderDetails = ({
  title,
  showRevoke,
  editLabel = 'Edit',
  isStaff = true,
  onClickEdit,
  onClickPromote,
  onClickRevoke,
}: HeaderProps) => {
  return (
    <Box
      flexGrow={1}
      display={'flex'}
      flexWrap={'wrap'}
      justifyContent="space-between"
      alignItems="center"
      padding={2}
      paddingLeft={0}
      paddingRight={0}
    >
      <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Box display={'flex'} flexWrap={'wrap'} justifyContent={'flex-end'} gap={2}>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          startIcon={<EditOutlinedIcon />}
          onClick={onClickEdit}
        >
          {editLabel}
        </Button>
        {isStaff && (
          <>
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
                color="error"
                size="large"
                startIcon={<PersonRemoveOutlinedIcon />}
                onClick={onClickRevoke}
              >
                Delete Role
              </Button>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default HeaderDetails;
