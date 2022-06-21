// import { Link as RouterLink } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
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
  Typography
} from '@material-ui/core';
import useAuth from '../../../hooks/useAuth';
// import wait from '../../../utils/wait';
import countries from './countries';
// import { authApi } from '../../../__fakeApi__/authApi';
import FileDropzone from '../../FileDropzone';
import useMounted from '../../../hooks/useMounted';
import { authApi } from '../../../__fakeApi__/authApi';

const AccountGeneralSettings = (props) => {
  const { user } = useAuth();
  const { update } = useAuth();
  const [avatar, setAvatar] = useState(null);
  const [upload, setUpload] = useState(false);
  const mounted = useMounted();

  const handleUpload = () => {
    setUpload(true);
  };

  const getAvatar = useCallback(async () => {
    try {
        const data = await authApi.getAvatar();
        if (mounted.current) {
            setAvatar(data);
        }
    } catch (err) {
        console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getAvatar();
  }, [getAvatar]);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles[0].name) {
        toast.loading('File upload, please wait....');
      try {
        authApi.uploadAvatar(acceptedFiles[0], user.id)
          .then((response) => {
            if (response.status === 200) {
                getAvatar();
                toast.dismiss();
                toast.success('Avatar uploaded!');
            } else {
                toast.dismiss();
                toast.error('Upload failed');
                console.error(response);
            }
          })
          .catch((response) => {
            toast.dismiss();
            toast.error('Upload failed');
            console.error(response);
          });
      } catch (err) {
        toast.dismiss();
        toast.error('Upload failed!');
        console.error(err);
      }
    }
    setUpload(false);
  }, []);

  function MyDropZone() {
    if (upload) {
        return (
          <Card>
            <CardContent>
              <FileDropzone
                onDrop={onDrop}
              />
            </CardContent>
            <CardActions>
              <Button
                color="primary"
                fullWidth
                variant="outlined"
                onClick={() => {
                    setUpload(false);
                }}
              >
                Cancel
              </Button>
            </CardActions>
          </Card>
        );
    } if (!upload) {
      return (
        <CardActions>
          <Button
            color="primary"
            fullWidth
            variant="outlined"
            onClick={() => {
                handleUpload();
            }}
          >
            Upload Avatar
          </Button>
        </CardActions>
      );
    }
    return <h6> </h6>;
  }

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
              <Typography
                color="textPrimary"
                sx={{ mt: 1 }}
                variant="subtitle2"
              >
                {user.firstName}
                {' '}
                {user.lastName}
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
              >
                {user.city}
                {', '}
                {user.state}
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
              >
                {'User Level: '}
                {user.userRole.toUpperCase()}
              </Typography>
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
        <Card>
          <MyDropZone />
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
            city: user.city || '',
            country: user.countryCode || '',
            email: user.emailAddress || '',
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            address1: user.address1 || '',
            address2: user.address2 || '',
            zipCode: user.zipCode || '',
            title: user.title || '',
            phone: user.phoneNumber || '',
            state: user.state || '',
            userRole: user.userRole || '',
            submit: null
          }}
          validationSchema={Yup
            .object()
            .shape({
              city: Yup.string().max(255),
              country: Yup.string().max(255),
              emailAddress: Yup
                .string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              firstName: Yup
                .string()
                .max(255)
                .required('First name is required'),
              lastName: Yup
                .string()
                .max(255)
                .required('Last name is required'),
              phoneNumber: Yup
                .string()
                .max(50)
                .required('Phone number is required'),
              state: Yup.string()
            })}
          onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
            const updateType = 1; // update type 1 == general
            try {
              await update(updateType, values);
              resetForm();
              setStatus({ success: true });
              setSubmitting(false);
              toast.success('Profile updated!');
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
                        <TextField
                          error={Boolean(touched.title && errors.title)}
                          fullWidth
                          helperText={touched.title && errors.title}
                          label="Title"
                          name="title"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.title}
                          variant="outlined"
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
                        required
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
                        required
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
                        required
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
                    Save Changes
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

export default AccountGeneralSettings;
