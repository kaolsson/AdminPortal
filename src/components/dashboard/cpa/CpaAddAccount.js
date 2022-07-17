import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  TextField,
} from '@material-ui/core';
import activeStatuses from './activeStatuses';
import userRoles from './userRoles';
import jobTitles from './jobTitles';
import { cpaApi } from '../../../__fakeApi__/cpaApi';
import PropTypes from 'prop-types';

const CpaAddAccount = (props) => {
  const { cpa, add } = props;
  const [avatar] = useState(null);
  const navigate = useNavigate();

  return (
    <Grid
      container
      spacing={3}
      {...props}
    >
      <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <Card>
          <CardContent>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center'
              }}
            >
              <Box
                sx={{
                  p: 1,
                  border: (theme) => `1px dashed ${theme.palette.divider}`,
                  borderRadius: '50%'
                }}
              >
                <Avatar
                  src={avatar}
                  sx={{
                    height: 200,
                    width: 200
                  }}
                />
              </Box>
            </Box>
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              fullWidth
              variant="text"
            >
                {
                    // Upload Picture
                }
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid
        item
        lg={8}
        md={6}
        xl={9}
        xs={12}
      >
        <Formik
          enableReinitialize
          initialValues={cpa}
          validationSchema={Yup
            .object()
            .shape({
              jobTitle: Yup
                .string()
                .max(50)
                .required('Job Title is required'),
              activeStatus: Yup
                .string()
                .max(50)
                .required('Active Status is required'),
              userRole: Yup
                .string()
                .max(50)
                .required('User Role is required'),
              note: Yup
                .string()
                .max(4000),
            })}
          onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
            try {
              if (!add) {
                  const newCpa = await cpaApi.updateCpa(cpa.id, values);
                  setStatus({ success: true });
                  setSubmitting(false);
                  toast.success('CPA Updated!');
                  navigate(['/cpa/details/?eid=', newCpa.cpaID].join(''));
              } else {
                  const newCpa = await cpaApi.addCpa(values);
                  resetForm();
                  setStatus({ success: true });
                  setSubmitting(false);
                  toast.success('New CPA Created!');
                  navigate(['/cpa/details/?eid=', newCpa.cpaID].join(''));
              }
            } catch (err) {
              console.error(err);
              toast.error('Something went wrong!');
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader title="Account" />
                <Divider />
                <CardContent>
                  <Grid
                    container
                    spacing={4}
                  >
                    <Grid
                      item
                      md={4}
                      xs={12}
                    >
                        <TextField
                            error={Boolean(touched.jobTitle && errors.jobTitle)}
//                            helperText={touched.jobTitle && errors.jobTitle}
                            fullWidth
                            label="Job Title"
                            name="jobTitle"
                            onChange={handleChange}
                            select
                            SelectProps={{ native: true }}
                            value={values.jobTitle}
                            variant="outlined"
                        >
                            {jobTitles.map((jobTitle) => (
                                <option
                                    key={jobTitle.value}
                                    value={jobTitle.value}
                                >
                                    {jobTitle.label}
                                </option>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid
                      item
                      md={4}
                      xs={12}
                    >
                        <TextField
                            error={Boolean(touched.userRole && errors.userRole)}
                            helperText={touched.userRole && errors.userRole}
                            fullWidth
                            label="User Role"
                            name="userRole"
                            onChange={handleChange}
                            select
                            SelectProps={{ native: true }}
                            value={values.userRole}
                            variant="outlined"
                        >
                            {userRoles.map((userRole) => (
                                <option
                                    key={userRole.value}
                                    value={userRole.value}
                                >
                                    {userRole.label}
                                </option>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid
                      item
                      md={4}
                      xs={12}
                    >
                        <TextField
                            error={Boolean(touched.activeStatus && errors.activeStatus)}
                            helperText={touched.activeStatus && errors.activeStatus}
                            fullWidth
                            label="Active Status"
                            name="activeStatus"
                            onChange={handleChange}
                            select
                            SelectProps={{ native: true }}
                            value={values.activeStatus}
                            variant="outlined"
                        >
                            {activeStatuses.map((activeStatus) => (
                                <option
                                    key={activeStatus.value}
                                    value={activeStatus.value}
                                >
                                    {activeStatus.label}
                                </option>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid
                      item
                      md={12}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.note && errors.note)}
                        fullWidth
                        helperText={touched.note && errors.note}
                        label="Note"
                        name="note"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.note}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  {errors.submit && (
                    <Box sx={{ mt: 3 }}>
                      <FormHelperText error>
                        {errors.submit}
                      </FormHelperText>
                    </Box>
                  )}
                </CardContent>
                <Divider />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2
                  }}
                >
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                  >
                    Submit
                  </Button>
                </Box>
              </Card>
            </form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

CpaAddAccount.propTypes = {
    cpa: PropTypes.object.isRequired,
    add: PropTypes.bool.isRequired
};

export default CpaAddAccount;
