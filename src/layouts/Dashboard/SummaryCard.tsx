import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { formatNumberWithCommas } from '../../utils';

type Props = {
  title: string;
  showContent: boolean;
  icon: string;
  activeCount: number;
  inactiveCount: number;
  totalCount: number;
};

const SummaryCard = ({
  title,
  showContent,
  icon,
  activeCount,
  inactiveCount,
  totalCount,
}: Props) => {
  return (
    <Card
      elevation={2}
      sx={{
        p: 2,
        maxWidth: '100%',
        opacity: showContent ? 1 : 0,
        transform: showContent ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s ease-in-out',
        transitionDelay: '0.4s',
      }}
    >
      <Box display={'flex'} alignItems="center" gap={2}>
        <Box
          sx={{
            backgroundColor: 'primary.lighter',
            borderRadius: '50%',
            width: 60,
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src={icon} alt="Student illustration" style={{ width: '90%', height: 'auto' }} />
        </Box>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            {formatNumberWithCommas(totalCount)}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {title}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ marginTop: '15px', marginBottom: '15px' }} />
      <Box
        display={'flex'}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
          <Typography variant="body1" color="text.secondary">
            Active:
          </Typography>
          <Typography variant="h6" fontWeight="bold" sx={{ paddingLeft: '5px' }}>
            {formatNumberWithCommas(activeCount)}
          </Typography>
        </Box>
        <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
          <Typography variant="body1" color="text.secondary">
            Inactive:
          </Typography>
          <Typography variant="h6" fontWeight="bold" sx={{ paddingLeft: '5px' }}>
            {formatNumberWithCommas(inactiveCount)}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default SummaryCard;
