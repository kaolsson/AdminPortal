import { useNavigate } from 'react-router-dom';
// import { Link as RouterLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Autocomplete,
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
import useAuth from '../../../hooks/useAuth';
// import wait from '../../../utils/wait';
import countries from './countries';
import titles from './titles';
// import { authApi } from '../../../__fakeApi__/authApi';
// import FileDropzone from '../../FileDropzone';
// import useMounted from '../../../hooks/useMounted';
import { customerApi } from '../../../__fakeApi__/customerApi';

const CustomerAdd = (props) => {
  const { user } = useAuth();
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
          initialValues={{
            accountID: user.accountID || '',
            title: '',
            firstName: '',
            middleInitial: '',
            lastName: '',
            email: '',
            phone: '',
            address1: '',
            address2: '',
            zipCode: '',
            city: '',
            state: '',
            country: '',
            countryCode: '',
            status: 'new',
            note: '',
            submit: null
          }}
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
              const newClient = await customerApi.addCustomer(values);
              resetForm();
              setStatus({ success: true });
              setSubmitting(false);
              toast.success('New Client Created!');
              navigate(['/clients/details/?cid=', newClient.customerID].join(''));
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
                      md={12}
                      xs={12}
                    >
                      <Grid
                        item
                        xs={3}
                      >
                      <Autocomplete
                        getOptionLabel={(option) => option.text}
                        options={titles}
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            label="Title"
                            name="title"
                            onChange={handleChange}
                            value={values.title}
                            variant="outlined"
                            {...params}
                          />
                        )}
                      />
                      </Grid>
                    </Grid>

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
                        error={Boolean(touched.email && errors.email)}
                        fullWidth
                        helperText={touched.email && errors.email}
                        label="Email Address"
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        type="email"
                        value={values.email}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.phone && errors.phone)}
                        fullWidth
                        helperText={touched.phone && errors.phone}
                        label="Phone Number"
                        name="phone"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.phone}
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
                        error={Boolean(touched.state && errors.state)}
                        fullWidth
                        helperText={touched.state && errors.state}
                        label="State/Region"
                        name="state"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.state}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <Autocomplete
                        getOptionLabel={(option) => option.text}
                        options={countries}
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            label="Country"
                            name="country"
                            onChange={handleChange}
                            value={values.country}
                            variant="outlined"
                            {...params}
                          />
                        )}
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

export default CustomerAdd;
