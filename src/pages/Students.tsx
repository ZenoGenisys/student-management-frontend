import {
  Button,
  FormControl,
  InputLabel,
  Select,
  Typography,
  type SelectChangeEvent,
} from '@mui/material';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import { TbFileExport } from 'react-icons/tb';
import { RiFileExcel2Line } from 'react-icons/ri';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

const StyledMenu = styled(Menu)``;

const Students: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [activeView, setActiveView] = useState<'grid' | 'list'>(
    isMobile ? 'grid' : 'list',
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);

  const handleMenuOpen = (
    menu: string,
    event: React.MouseEvent<HTMLElement>,
  ) => {
    setActiveMenu(menu);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setActiveMenu(null);
    setAnchorEl(null);
  };

  const handleViewToggle = (view: 'grid' | 'list') => {
    setActiveView(view);
  };

  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <Box display="flex" flexDirection="column">
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
          All Students
        </Typography>
        <Box display={'flex'} gap={2}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<TbFileExport />}
            id="export-menu"
            aria-controls={open ? 'export-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={(e) => handleMenuOpen('export', e)}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Export Students
          </Button>
          <StyledMenu
            id="export-menu"
            slotProps={{
              list: {
                'aria-labelledby': 'export-menu',
              },
            }}
            anchorEl={anchorEl}
            open={activeMenu === 'export'}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose} disableRipple>
              <PictureAsPdfOutlinedIcon />
              Export as PDF
            </MenuItem>
            <MenuItem onClick={handleMenuClose} disableRipple>
              <RiFileExcel2Line
                style={{ marginRight: 12, width: 16, height: 16 }}
              />
              Export as Excel
            </MenuItem>
          </StyledMenu>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<AddIcon />}
          >
            Add Student
          </Button>
        </Box>
      </Box>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexGrow={1}
        p={2}
        sx={{ bgcolor: '#fff', border: '1px solid #E3E8EE' }}
      >
        <Typography sx={{ fontWeight: 'bold', fontSize: 16 }}>
          Students {activeView === 'grid' ? 'Grid' : 'List'}
        </Typography>
        <Box display={'flex'} gap={2}>
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
            id="filter-menu"
            aria-controls={open ? 'filter-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={(e) => handleMenuOpen('filter', e)}
          >
            Filter
          </Button>
          <StyledMenu
            id="filter-menu"
            slotProps={{
              list: {
                'aria-labelledby': 'filter-menu',
              },
            }}
            anchorEl={anchorEl}
            open={activeMenu === 'filter'}
            onClose={handleMenuClose}
          >
            <Box>
              <Box display={'flex'} flexDirection="row" alignItems="center">
                <FormControl
                  sx={{ m: 1, minWidth: 120, width: '90%' }}
                  size="small"
                >
                  <InputLabel id="demo-select-small-label">Age</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={age}
                    label="Age"
                    autoWidth
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  sx={{ m: 1, minWidth: 120, width: '90%' }}
                  size="small"
                >
                  <InputLabel id="demo-select-small-label">Age</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={age}
                    label="Age"
                    autoWidth
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box display={'flex'} flexDirection="row" alignItems="center">
                <FormControl
                  sx={{ m: 1, minWidth: 120, width: '90%' }}
                  size="small"
                >
                  <InputLabel id="demo-select-small-label">Age</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={age}
                    label="Age"
                    autoWidth
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  sx={{ m: 1, minWidth: 120, width: '90%' }}
                  size="small"
                >
                  <InputLabel id="demo-select-small-label">Age</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={age}
                    label="Age"
                    autoWidth
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </StyledMenu>
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
            <MenuItem onClick={handleMenuClose} disableRipple>
              <ArrowUpwardOutlinedIcon />
              Ascending
            </MenuItem>
            <MenuItem onClick={handleMenuClose} disableRipple>
              <ArrowDownwardOutlinedIcon />
              Descending
            </MenuItem>
            <MenuItem onClick={handleMenuClose} disableRipple>
              <AccessTimeOutlinedIcon />
              Recently Added
            </MenuItem>
          </StyledMenu>
        </Box>
      </Box>
      <Box flexGrow={1}>
        {/* {activeView === 'grid' ? <GridView /> : <ListView />} */}
      </Box>
    </Box>
  );
};

export default Students;
