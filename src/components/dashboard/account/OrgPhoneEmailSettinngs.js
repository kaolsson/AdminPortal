import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
//  Autocomplete,
//  Avatar,
  Box,
  Button,
  Card,
//  CardActions,
  CardContent,
  CardMedia,
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
// import countries from './countries';
import { vendorApi } from '../../../__fakeApi__/vendorApi';
import useMounted from '../../../hooks/useMounted';

const OrgPhoneEmailSettinngs = (props) => {
  const mounted = useMounted();
  const { user } = useAuth();
  const [organization, setOrganization] = useState(null);
  const [logo, setLogo] = useState(null);

  const getOrganization = useCallback(async () => {
    try {
      const data = await vendorApi.getVendor(user.accountID);

      if (mounted.current) {
        setOrganization(data.vendor);
        setLogo(data.logo);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getOrganization();
  }, [getOrganization]);

  if (!organization) {
    return <p> </p>;
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
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                p: 2
              }}
            >

              <CardMedia
                component="img"
                image={logo}
                alt="green iguana"
              />
            </Box>
          <CardContent>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center'
              }}
            >
              <Typography
                color="textPrimary"
                sx={{ mt: 1 }}
                variant="h5"
              >
                {organization.organization}
              </Typography>
              <Typography
                color="textPrimary"
                sx={{ mt: 1 }}
                variant="subtitle2"
              >
                {' '}
              </Typography>
            </Box>
            <Divider />
            <Box
              sx={{
                alignItems: 'left',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'left'
              }}
            >
              <Typography
                color="textPrimary"
                sx={{ mt: 1 }}
                variant="subtitle2"
              >
                {' '}
              </Typography>
                  <table>
                    <tr>
                        <td>Org No:</td>
                        <td>{organization.orgNumber}</td>
                    </tr>
                    <tr>
                        <td>Created:</td>
                        <td>{organization.dateAdded.substring(0, 10)}</td>
                    </tr>
                  </table>
            </Box>
          </CardContent>
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
            contactEmail: organization.contactEmail || '',
            orderEmail: organization.orderEmail || '',
            miscEmail: organization.miscEmail || '',
            adminEmail: organization.adminEmail || '',
            adminPhone: organization.adminPhone || '',
            phoneNumber: organization.phoneNumber || '',
            submit: null
          }}
          validationSchema={Yup
            .object()
            .shape({
              adminEmail: Yup
                .string()
                .email('Must be a valid email')
                .max(70)
                .required('Admin email is required'),
              contactEmail: Yup
                .string()
                .email('Must be a valid email')
                .max(70)
                .required('Contact email is required'),
              orderEmail: Yup
                .string()
                .email('Must be a valid email')
                .max(70)
                .required('Order email is required'),
              miscEmail: Yup
                .string()
                .email('Must be a valid email')
                .max(70),
              phoneNumber: Yup
                .string()
                .max(50)
                .required('Phone number is required'),
              adminPhone: Yup
                .string()
                .max(50)
                .required('Admin phone nyumber is required'),
            })}
          onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
            try {
                await vendorApi.updateVendor(user.accountID, values);
                resetForm();
                setStatus({ success: true });
                setSubmitting(false);
                toast.success('Organization data updated!');
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
                <CardHeader title="Phone" />
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
                        error={Boolean(touched.adminPhone && errors.adminPhone)}
                        fullWidth
                        helperText={touched.adminPhone && errors.adminPhone}
                        label="Admin Phone Number"
                        name="adminPhone"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        value={values.adminPhone}
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
              </Card>
              <Card>
                <CardHeader title="Email" />
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
                        error={Boolean(touched.adminEmail && errors.adminEmail)}
                        fullWidth
                        helperText={touched.adminEmail && errors.adminEmail}
                        label="Admin Email"
                        name="adminEmail"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        type="email"
                        value={values.adminEmail}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.contactEmail && errors.contactEmail)}
                        fullWidth
                        helperText={touched.contactEmail && errors.contactEmail}
                        label="Contact Email"
                        name="contactEmail"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        type="email"
                        value={values.contactEmail}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.orderEmail && errors.orderEmail)}
                        fullWidth
                        helperText={touched.orderEmail && errors.orderEmail}
                        label="Order Email"
                        name="orderEmail"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        type="email"
                        value={values.orderEmail}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.miscEmail && errors.miscEmail)}
                        fullWidth
                        helperText={touched.miscEmail && errors.miscEmail}
                        label="Misc Email"
                        name="miscEmail"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        type="email"
                        value={values.miscEmail}
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

export default OrgPhoneEmailSettinngs;
