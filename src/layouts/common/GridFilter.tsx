import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import IconButton from '@mui/material/IconButton';
import { Search } from '../../components';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import { useCallback, useState } from 'react';
import styled from '@emotion/styled';

const StyledMenu = styled(Menu)``;
type GridFilterProps = {
  title: string;
  activeView: 'grid' | 'list';
  search?: string;
  enableFilter?: boolean;
  handleViewToggle: (view: 'grid' | 'list') => void;
  handleSearch?: (value: string) => void;
  handleSortChange: (order: 'asc' | 'desc') => void;
};
const GridFilter = ({
  title,
  activeView,
  search,
  enableFilter = false,
  handleViewToggle,
  handleSearch,
  handleSortChange,
}: GridFilterProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleMenuOpen = useCallback(
    (menu: string, event: React.MouseEvent<HTMLElement>) => {
      setActiveMenu(menu);
      setAnchorEl(event.currentTarget);
    },
    [],
  );

  const handleMenuClose = useCallback(() => {
    setActiveMenu(null);
    setAnchorEl(null);
  }, []);

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-between'}
      flexGrow={1}
      p={2}
      sx={{ bgcolor: '#fff', border: '1px solid #E3E8EE' }}
    >
      <Typography sx={{ fontWeight: 'bold', fontSize: 16 }}>
        {title} {activeView === 'grid' ? 'Grid' : 'List'}
      </Typography>
      <Box display={'flex'} gap={2}>
        <Search search={search} onChange={handleSearch} />
        <Box
          display={'flex'}
          alignItems="center"
          sx={{ border: '1px solid #E3E8EE', borderRadius: 1 }}
        >
          <IconButton
            aria-label="grid view"
            size="small"
            sx={{
              backgroundColor:
                activeView === 'grid' ? 'primary.main' : '#F9FAFB',
              color: activeView === 'grid' ? 'white' : 'inherit',
              borderRadius: 1,
              m: 0.5,
              '&:hover': {
                bgcolor: activeView === 'grid' ? 'primary.main' : '#F9FAFB',
                color: activeView === 'grid' ? 'white' : 'inherit',
              },
            }}
            onClick={() => handleViewToggle('grid')}
          >
            <GridViewOutlinedIcon />
          </IconButton>
          <IconButton
            aria-label="list view"
            size="small"
            sx={{
              backgroundColor:
                activeView === 'list' ? 'primary.main' : '#F9FAFB',
              color: activeView === 'list' ? 'white' : 'inherit',
              borderRadius: 1,
              m: 0.5,
              '&:hover': {
                bgcolor: activeView === 'list' ? 'primary.main' : '#F9FAFB',
                color: activeView === 'list' ? 'white' : 'inherit',
              },
            }}
            onClick={() => handleViewToggle('list')}
          >
            <ListAltOutlinedIcon />
          </IconButton>
        </Box>
        {enableFilter && (
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            startIcon={<FilterAltOutlinedIcon />}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Filter
          </Button>
        )}
        {activeView === 'grid' && (
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            startIcon={<SwapVertOutlinedIcon />}
            endIcon={<KeyboardArrowDownIcon />}
            id="sortby-menu"
            aria-controls={open ? 'sortby-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={(e) => handleMenuOpen('sortby', e)}
          >
            Sort by A-Z
          </Button>
        )}

        <StyledMenu
          id="sortby-menu"
          slotProps={{
            list: {
              'aria-labelledby': 'sortby-menu',
            },
          }}
          anchorEl={anchorEl}
          open={activeMenu === 'sortby'}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleSortChange('asc')} disableRipple>
            <ArrowUpwardOutlinedIcon />
            Ascending
          </MenuItem>
          <MenuItem onClick={() => handleSortChange('desc')} disableRipple>
            <ArrowDownwardOutlinedIcon />
            Descending
          </MenuItem>
        </StyledMenu>
      </Box>
    </Box>
  );
};

export default GridFilter;
