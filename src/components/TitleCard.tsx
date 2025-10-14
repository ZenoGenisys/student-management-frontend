import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import type { JSX } from 'react';

type TitleCardProps = {
  title: string | JSX.Element;
  icon?: JSX.Element;
  children: JSX.Element;
  suffixIcon?: JSX.Element;
};

const TitleCard = ({ title, icon, suffixIcon, children }: TitleCardProps) => {
  const theme = useTheme();
  return (
    <>
      <Card>
        <CardHeader
          title={
            <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
              <Typography variant="h4" display="flex" alignItems="center">
                {icon}
                {title}
              </Typography>
              {suffixIcon}
            </Box>
          }
        />
        <CardContent sx={{ borderTop: `1px solid ${theme.palette.divider}` }}>
          {children}
        </CardContent>
      </Card>
    </>
  );
};

export default TitleCard;
