import type { AlertColor } from '@mui/material/Alert';
import { createContext, useContext } from 'react';

export type SnackbarOptions = {
  message: string;
  severity?: AlertColor;
};

export type SnackbarContextType = {
  showSnackbar: (options: SnackbarOptions) => void;
};

export const SnackbarContext = createContext<SnackbarContextType>({
  showSnackbar: () => {},
});

export const useSnackbar = () => useContext(SnackbarContext);
