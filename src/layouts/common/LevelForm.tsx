import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import type { LevelDetails } from '../../types';
import type { FormikErrors, FormikTouched } from 'formik/dist/types';
import { useCallback } from 'react';
import dayjs from 'dayjs';
import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined';

type LevelFormProps = {
  index: number;
  values: LevelDetails;
  touched: FormikTouched<LevelDetails>;
  errors: FormikErrors<LevelDetails>;
  isMobile: boolean;
  levelDetails: LevelDetails[];
  setFieldValue: (field: string, value: LevelDetails[]) => void;
};

const LevelForm = ({
  index,
  values,
  touched,
  errors,
  isMobile,
  levelDetails,
  setFieldValue,
}: LevelFormProps) => {
  const theme = useTheme();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      const updated = [...levelDetails];
      updated[index] = { ...updated[index], [name]: value, level: index + 1 };
      setFieldValue('levelDetails', updated);
    },
    [index, levelDetails, setFieldValue],
  );

  const handleDateChange = useCallback(
    (value: dayjs.Dayjs | null) => {
      const updated = [...levelDetails];
      updated[index] = { ...updated[index], date: value, level: index + 1 };
      setFieldValue('levelDetails', updated);
    },
    [index, levelDetails, setFieldValue],
  );

  const handleDelete = useCallback(() => {
    const updated = [...levelDetails];
    updated.splice(index, 1);
    const reIndexed = updated.map((item, idx) => ({ ...item, level: idx + 1 }));
    setFieldValue('levelDetails', reIndexed);
  }, [index, levelDetails, setFieldValue]);

  return (
    <Card>
      <CardHeader
        title={
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography variant="h4" display={'flex'} alignItems={'center'}>
              <NumbersOutlinedIcon
                sx={{
                  mr: 1,
                  background: '#fff',
                  padding: '2px',
                  borderRadius: '5px',
                }}
              />
              Level {index + 1}
            </Typography>
            <DeleteOutlineTwoToneIcon
              sx={{
                mr: 1,
                background: '#fff',
                padding: '2px',
                borderRadius: '5px',
                cursor: 'pointer',
                color: theme.palette.error.main,
              }}
              onClick={handleDelete}
            />
          </Box>
        }
      />
      <CardContent sx={{ borderTop: `1px solid ${theme.palette.divider}` }}>
        <Box>
          <Grid container spacing={2} mt={2}>
            <Grid size={12}>
              <FormControl fullWidth>
                <Typography mb={1} variant="h6">
                  Date
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={values.date ? dayjs(values.date) : null}
                    onChange={handleDateChange}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        size: 'small',
                        error: touched?.date && Boolean(errors?.date),
                        helperText: touched?.date && errors?.date,
                      },
                    }}
                    views={isMobile ? ['year', 'month', 'day'] : undefined}
                  />
                </LocalizationProvider>
              </FormControl>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <Typography mb={1} variant="h6">
                  Document
                </Typography>
                <TextField
                  id="document"
                  name="document"
                  size="small"
                  value={values.document}
                  onChange={handleInputChange}
                  error={touched?.document && Boolean(errors?.document)}
                  helperText={touched?.document && errors?.document}
                />
              </FormControl>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <Typography mb={1} variant="h6">
                  Remarks
                </Typography>
                <TextField
                  id="remarks"
                  name="remarks"
                  size="small"
                  value={values.remarks}
                  onChange={handleInputChange}
                  error={touched?.remarks && Boolean(errors?.remarks)}
                  helperText={touched?.remarks && errors?.remarks}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LevelForm;
