import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Autocomplete,
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
import countries from './countries';
import { vendorApi } from '../../../__fakeApi__/vendorApi';
import useMounted from '../../../hooks/useMounted';

const OrgAddressSettinngs = (props) => {
  const mounted = useMounted();
  const { user } = useAuth();
  const [organization, setOrganization] = useState(null);
  const [logo, setLogo] = useState(null);
  const navigate = useNavigate();

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
            address1: organization.address1 || '',
            address2: organization.address2 || '',
            city: organization.city || '',
            zipCode: organization.zipCode || '',
            state: organization.state || '',
            country: organization.country || '',
            submit: null
          }}
          validationSchema={Yup
            .object()
            .shape({
              address1: Yup
                .string()
                .max(200)
                .required('Address is required'),
              address2: Yup
                .string(),
              city: Yup
                .string()
                .max(50)
                .required('City is required'),
              zipCode: Yup
                .string()
                .max(50)
                .required('Zipcode is required'),
              state: Yup
                .string()
                .max(50)
                .required('State is required'),
              country: Yup
                .string()
                .max(100),
            })}
          onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
            try {
                await vendorApi.updateVendor(user.accountID, values);
                resetForm();
                setStatus({ success: true });
                setSubmitting(false);
                toast.success('Organization data updated!');
                navigate('/orgaccount');
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
                <CardHeader title="Address" />
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
                        <TextField
                          error={Boolean(touched.address1 && errors.address1)}
                          fullWidth
                          helperText={touched.address1 && errors.address1}
                          label="Address Line 1"
                          name="address1"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.address1}
                          variant="outlined"
                        />
                    </Grid>
                    <Grid
                      item
                      md={12}
                      xs={12}
                    >
                        <TextField
                          error={Boolean(touched.address2 && errors.address2)}
                          fullWidth
                          helperText={touched.address2 && errors.address2}
                          label="Address Line 2"
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
                        required
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
                        required
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
                        label="State"
                        name="state"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
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

export default OrgAddressSettinngs;
