import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';

type GridHeaderProps = {
  title: string;
  onClickAdd?: () => void;
  onClickPDF?: () => void;
  onClickExcel?: () => void;
};

const GridHeader: React.FC<GridHeaderProps> = ({ title, onClickAdd }: GridHeaderProps) => {
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
      <Typography
        variant="h3"
        component="h1"
        sx={{ fontWeight: 'bold', pb: { xs: '10px', sm: '0px', md: '0px', lg: '0px', xl: '0px' } }}
      >
        All {title}
      </Typography>
      <Box display={'flex'} gap={2}>
        {onClickAdd && (
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<AddIcon />}
            onClick={onClickAdd}
          >
            Add {title}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default GridHeader;
