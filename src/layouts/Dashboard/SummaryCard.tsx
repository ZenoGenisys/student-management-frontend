import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

type Props = {
  title: string;
  showContent: boolean;
  icon: string;
  value: string;
  data: { [key: string]: string | number };
};

const SummaryCard = ({ title, showContent, icon, value, data }: Props) => {
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
            {value}
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
        {Object.keys(data).map((key) => (
          <Box display={'flex'} flexDirection={'row'} alignItems={'center'} key={key}>
            <Typography variant="body1" color="text.secondary">
              {key}
            </Typography>
            <Typography variant="h6" fontWeight="bold" sx={{ paddingLeft: '5px' }}>
              {data[key]}
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default SummaryCard;
