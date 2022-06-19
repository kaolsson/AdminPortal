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
  CardActions,
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
import FileDropzone from '../../FileDropzone';

const OrgGeneralSettings = (props) => {
  const mounted = useMounted();
  const { user } = useAuth();
  const [organization, setOrganization] = useState(null);
  const [logo, setLogo] = useState(null);
  const [upload, setUpload] = useState(false);
  const navigate = useNavigate();

  const handleUpload = () => {
      setUpload(true);
  };

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

  const getLogo = useCallback(async () => {
    try {
        const data = await vendorApi.getLogo(user.accountID);
        if (mounted.current) {
            setLogo(data);
        }
    } catch (err) {
        console.error(err);
    }
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles[0].name) {
        toast.loading('File upload, please wait....');
      try {
        vendorApi.logoUpload(acceptedFiles[0], user.accountID)
          .then((response) => {
            if (response.status === 200) {
                getLogo();
                toast.dismiss();
                toast.success('Logo uploaded!');
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
            Upload Logo
          </Button>
        </CardActions>
      );
    }
    return <h6> </h6>;
  }

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
            organization: organization.organization || '',
            orgDescription: organization.orgDescription || '',
            webPortal: organization.webPortal || '',
            securePortal: organization.securePortal || '',
            logoUrl: organization.logoUrl || '',
            note: organization.note || '',
            submit: null
          }}
          validationSchema={Yup
            .object()
            .shape({
              organization: Yup
                .string()
                .max(50)
                .required('Organization name is required'),
              webPortal: Yup
                .string()
                .max(200)
                .required('webPortal is required'),
              securePortal: Yup.string().max(200),
              orgDescription: Yup.string().max(500),
              logoUrl: Yup.string().max(200),
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
                <CardHeader title="General Information" />
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
                          error={Boolean(touched.organization && errors.organization)}
                          fullWidth
                          helperText={touched.organization && errors.organization}
                          label="Name"
                          name="organization"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.organization}
                          variant="outlined"
                        />
                    </Grid>
                    <Grid
                      item
                      md={12}
                      xs={12}
                    >
                        <TextField
                          error={Boolean(touched.orgDescription && errors.orgDescription)}
                          fullWidth
                          helperText={touched.orgDescription && errors.orgDescription}
                          label="Description"
                          name="orgDescription"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.orgDescription}
                          variant="outlined"
                        />
                    </Grid>
                    <Grid
                      item
                      md={12}
                      xs={12}
                    >
                        <TextField
                          error={Boolean(touched.webPortal && errors.webPortal)}
                          fullWidth
                          helperText={touched.webPortal && errors.webPortal}
                          label="Web Portal"
                          name="webPortal"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.webPortal}
                          variant="outlined"
                        />
                    </Grid>
                    <Grid
                      item
                      md={12}
                      xs={12}
                    >
                        <TextField
                          error={Boolean(touched.securePortal && errors.securePortal)}
                          fullWidth
                          helperText={touched.securePortal && errors.securePortal}
                          label="Secure Portal"
                          name="securePortal"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.securePortal}
                          variant="outlined"
                        />
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
                          label="Notes"
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

export default OrgGeneralSettings;
