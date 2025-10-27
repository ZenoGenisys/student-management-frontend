import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useCallback, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import { TbFileExport } from 'react-icons/tb';
import { RiFileExcel2Line } from 'react-icons/ri';
import { StyledMenu } from '../../components';

type GridHeaderProps = {
  title: string;
  onClickAdd?: () => void;
  onClickPDF?: () => void;
  onClickExcel?: () => void;
};

const GridHeader: React.FC<GridHeaderProps> = ({
  title,
  onClickAdd,
  onClickPDF,
  onClickExcel,
}: GridHeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handlePDF = useCallback(() => {
    handleClose();
    onClickPDF?.();
  }, [onClickPDF, handleClose]);

  const handleExcel = useCallback(() => {
    handleClose();
    onClickExcel?.();
  }, [onClickExcel, handleClose]);

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
