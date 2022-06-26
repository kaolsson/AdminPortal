import { useNavigate } from 'react-router-dom';
// import { Link as RouterLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
//  Autocomplete,
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
  // Link,
  // Switch,
  TextField,
  // Typography
} from '@material-ui/core';
// import useAuth from '../../../hooks/useAuth';
// import wait from '../../../utils/wait';
import countries from './countries';
import states from './states';
// import { authApi } from '../../../__fakeApi__/authApi';
// import FileDropzone from '../../FileDropzone';
// import useMounted from '../../../hooks/useMounted';
import { cpaApi } from '../../../__fakeApi__/cpaApi';
import PropTypes from 'prop-types';

const CpaAdd = (props) => {
  const { cpa, add } = props;
//  const { user } = useAuth();
//  const { update } = useAuth();
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();
//  const [upload, setUpload] = useState(false);
//  const mounted = useMounted();

//  const handleUpload = () => {
//    setUpload(true);
//    setUpload(false);
//  };

//  const getAvatar = useCallback(async () => {
//    try {
//        const data = await authApi.getAvatar();
//        if (mounted.current) {
//            setAvatar(data);
//        }
//    } catch (err) {
//        console.error(err);
//    }
//  }, [mounted]);

  useEffect(() => {
    setAvatar(null);
  }, []);

//  useEffect(() => {
//    getAvatar();
//  }, [getAvatar]);

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
              firstName: Yup
                .string()
                .max(50)
                .required('First name is required'),
              lastName: Yup
                .string()
                .max(50)
                .required('Last name is required'),
            })}
          onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
            try {
              if (!add) {
                  console.log('update');
                  console.log(cpa);
                  const newCpa = await cpaApi.updateCpa(cpa.id, values);
                  setStatus({ success: true });
                  setSubmitting(false);
                  toast.success('CPA Updated!');
                  console.log(newCpa);
                  console.log(Object.values(newCpa)[0]);
              } else {
                  console.log('add');
                  const newCpa = await cpaApi.addCpa(values);
                  resetForm();
                  setStatus({ success: true });
                  setSubmitting(false);
                  toast.success('New CPA Created!');
                  console.log(newCpa);
                  console.log(Object.values(newCpa)[0]);
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
                <CardHeader title="Profile" />
                <Divider />
                <CardContent>
                  <Grid
                    container
                    spacing={4}
                  >
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.firstName && errors.firstName)}
                        fullWidth
                        helperText={touched.firstName && errors.firstName}
                        label="First Name"
                        name="firstName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.firstName}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.lastName && errors.lastName)}
                        fullWidth
                        helperText={touched.lastName && errors.lastName}
                        label="Last Name"
                        name="lastName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.lastName}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.emailAddress && errors.emailAddress)}
                        fullWidth
                        helperText={touched.emailAddress && errors.emailAddress}
                        label="Email Address"
                        name="emailAddress"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        type="email"
                        value={values.emailAddress}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                        fullWidth
                        helperText={touched.phoneNumber && errors.phoneNumber}
                        label="Phone Number"
                        name="phoneNumber"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.phoneNumber}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.address1 && errors.address1)}
                        fullWidth
                        helperText={touched.address1 && errors.address1}
                        label="Address 1"
                        name="address1"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.address1}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.address2 && errors.address2)}
                        fullWidth
                        helperText={touched.address2 && errors.address2}
                        label="Address 2"
                        name="address2"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.address2}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.city && errors.city)}
                        fullWidth
                        helperText={touched.city && errors.city}
                        label="City"
                        name="city"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.city}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.zipCode && errors.zipCode)}
                        fullWidth
                        helperText={touched.zipCode && errors.zipCode}
                        label="Zip Code"
                        name="zipCode"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.zipCode}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                        <TextField
                            fullWidth
                            label="State"
                            name="state"
                            onChange={handleChange}
                            select
                            SelectProps={{ native: true }}
                            value={values.state}
                            variant="outlined"
                        >
                            {states.map((state) => (
                                <option
                                    key={state.value}
                                    value={state.value}
                                >
                                    {state.label}
                                </option>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                        <TextField
                            fullWidth
                            label="Country"
                            name="country"
                            onChange={handleChange}
                            select
                            SelectProps={{ native: true }}
                            value={values.country}
                            variant="outlined"
                        >
                            {countries.map((country) => (
                                <option
                                    key={country.value}
                                    value={country.value}
                                >
                                    {country.label}
                                </option>
                            ))}
                        </TextField>
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

CpaAdd.propTypes = {
    cpa: PropTypes.object.isRequired,
    add: PropTypes.bool.isRequired
};

export default CpaAdd;
