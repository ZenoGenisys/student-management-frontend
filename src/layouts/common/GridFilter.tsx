import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import IconButton from '@mui/material/IconButton';
import { Search } from '../../components';

type GridFilterProps = {
  title: string;
  activeView: 'grid' | 'list';
  search?: string;
  handleViewToggle: (view: 'grid' | 'list') => void;
  handleSearch?: (value: string) => void;
};
const GridFilter = ({
  title,
  activeView,
  search,
  handleViewToggle,
  handleSearch,
}: GridFilterProps) => {
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
        <Button
          variant="outlined"
          color="secondary"
          size="medium"
          startIcon={<FilterAltOutlinedIcon />}
          endIcon={<KeyboardArrowDownIcon />}
        >
          Filter
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          size="medium"
          startIcon={<SwapVertOutlinedIcon />}
          endIcon={<KeyboardArrowDownIcon />}
        >
          Sort by A-Z
        </Button>
      </Box>
    </Box>
  );
};

export default GridFilter;
