import { useNavigate } from 'react-router-dom';
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

const OrgFinanceSettinngs = (props) => {
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
            paymentRef: organization.paymentRef || '',
            submit: null
          }}
          validationSchema={Yup
            .object()
            .shape({
              paymentRef: Yup.string(),
              note: Yup.string(),
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
                <CardHeader title="Finance" />
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
                          error={Boolean(touched.paymentRef && errors.paymentRef)}
                          fullWidth
                          helperText={touched.paymentRef && errors.paymentRef}
                          label="Payment reference"
                          name="paymentRef"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.paymentRef}
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

export default OrgFinanceSettinngs;
