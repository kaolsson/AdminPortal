import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormHelperText,
  Grid,
  TextField,
} from '@material-ui/core';
import { projectApi } from '../../../__fakeApi__/projectApi';
import PropTypes from 'prop-types';
import stateOptions from './states';

const statusOptions = [
    {
      value: '',
      label: ''
    },
    {
      label: 'New',
      value: 'new'
    },
    {
      label: 'Active',
      value: 'active'
    },
    {
      label: 'Complete',
      value: 'complete'
    },
    {
      label: 'Stopped',
      value: 'Stopped'
      }
    ];

const caseTypeOptions = [
  {
    value: '',
    label: ''
  },
  {
    label: 'Tax',
    value: 'tax'
  },
  {
    label: 'Accounting',
    value: 'accounting'
  },
  {
    label: 'Payroll',
    value: 'payroll'
  },
  {
    label: 'Other',
    value: 'other'
  }
];

const ProjectCreateForm = (props) => {
  const { project, clientoptions, cpaoptions } = props;
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        // Project Description
        title: project.title,
        description: project.description,
        caseOutcome: project.caseOutcome,
        note: project.note,
        // Project Data
        cpaID: project.cpaID,
        customerID: project.customerID,
        status: project.status,
        caseType: project.caseType,
        location: project.location,
        customerSaving: project.customerSaving,
        orderID: project.orderID,
        // system data
        caseID: project.caseID,
        accountID: project.accountID,
        tags: project.tags,
        action: project.action,
        createdBy: project.createdBy,
        createdByID: project.createdByID,
        dateCreated: project.dateCreated,
        dateStarted: project.dateStarted,
        dateUpdated: project.dateUpdated,
        dateCompleted: project.dateCompleted,

        submit: null
      }}
      validationSchema={Yup
        .object()
        .shape({
          title: Yup.string().max(200).required(),
          description: Yup.string().max(500).required(),
          caseOutcome: Yup.string().max(500).required(),
          note: Yup.string().max(500),
          cpaID: Yup.string().max(50).required(),
          customerID: Yup.string().max(50).required(),
          status: Yup.string().max(20).required(),
          caseType: Yup.string().max(100).required(),
          location: Yup.string().max(100).required(),
          customerSaving: Yup.number().min(0).nullable(),
          orderID: Yup.string().max(50).nullable(),
        })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
            if (values.caseID !== '') {
                await projectApi.updateProject(values);
            } else {
                values.caseID = await projectApi.createProject(values);
            }
            setStatus({ success: true });
            setSubmitting(false);
            if (values.caseID !== '') {
                toast.success('Project updated!');
            } else {
                toast.success('Project created!');
            }
              navigate(['/projects/details/?cid=', values.caseID].join(''));
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong!');
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form
          onSubmit={handleSubmit}
          {...props}
        >
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <Card>
                <CardHeader title="Case Description" />
                <CardContent>
                  <TextField
                    error={Boolean(touched.title && errors.title)}
                    fullWidth
                    helperText={touched.title && errors.title}
                    label="Case Name"
                    name="title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.title}
                    variant="outlined"
                  />
                  <Box sx={{ mt: 3 }}>
                  <TextField
                    error={Boolean(touched.description && errors.description)}
                    fullWidth
                    helperText={touched.description && errors.description}
                    label="Case Description"
                    name="description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    variant="outlined"
                  />
                  </Box>
                  <Box sx={{ mt: 3 }}>
                  <TextField
                    error={Boolean(touched.caseOutcome && errors.caseOutcome)}
                    fullWidth
                    helperText={touched.caseOutcome && errors.caseOutcome}
                    label="Case Result"
                    name="caseOutcome"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.caseOutcome}
                    variant="outlined"
                  />
                  </Box>
                  <Box sx={{ mt: 3 }}>
                  <TextField
                    error={Boolean(touched.note && errors.note)}
                    fullWidth
                    helperText={touched.note && errors.note}
                    label="Case Note"
                    name="note"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.note}
                    variant="outlined"
                  />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <Card>
                <CardHeader title="Case Data" />
                <CardContent>
                  <TextField
                    error={Boolean(touched.cpaID && errors.cpaID)}
                    fullWidth
                    helperText={touched.cpaID && errors.cpaID}
                    label="Case Owner"
                    name="cpaID"
                    onChange={handleChange}
                    select
                    SelectProps={{ native: true }}
                    value={values.cpaID}
                    variant="outlined"
                  >
                    {cpaoptions.map((cpaID) => (
                      <option
                        key={cpaID.value}
                        value={cpaID.value}
                      >
                        {cpaID.label}
                      </option>
                    ))}
                  </TextField>
                  <Box sx={{ mt: 3 }}>
                  <TextField
                    error={Boolean(touched.customerID && errors.customerID)}
                    fullWidth
                    helperText={touched.customerID && errors.customerID}
                    label="Client"
                    name="customerID"
                    onChange={handleChange}
                    select
                    SelectProps={{ native: true }}
                    value={values.customerID}
                    variant="outlined"
                  >
                    {clientoptions.map((customerID) => (
                      <option
                        key={customerID.value}
                        value={customerID.value}
                      >
                        {customerID.label}
                      </option>
                    ))}
                  </TextField>
                  </Box>
                  <Box sx={{ mt: 3 }}>
                  <TextField
                    error={Boolean(touched.caseType && errors.caseType)}
                    fullWidth
                    helperText={touched.caseType && errors.caseType}
                    label="Case Type"
                    name="caseType"
                    onChange={handleChange}
                    select
                    SelectProps={{ native: true }}
                    value={values.caseType}
                    variant="outlined"
                  >
                    {caseTypeOptions.map((caseType) => (
                      <option
                        key={caseType.value}
                        value={caseType.value}
                      >
                        {caseType.label}
                      </option>
                    ))}
                  </TextField>
                  </Box>
                  <Box sx={{ mt: 3 }}>
                  <TextField
                    error={Boolean(touched.location && errors.location)}
                    fullWidth
                    helperText={touched.location && errors.location}
                    label="Location"
                    name="location"
                    onChange={handleChange}
                    select
                    SelectProps={{ native: true }}
                    value={values.location}
                    variant="outlined"
                  >
                    {stateOptions.map((state) => (
                      <option
                        key={state.value}
                        value={state.value}
                      >
                        {state.label}
                      </option>
                    ))}
                  </TextField>
                  </Box>
                  <Box sx={{ mt: 3 }}>
                  <TextField
                    error={Boolean(touched.status && errors.status)}
                    fullWidth
                    helperText={touched.status && errors.status}
                    label="Case Status"
                    name="status"
                    onChange={handleChange}
                    select
                    SelectProps={{ native: true }}
                    value={values.status}
                    variant="outlined"
                  >
                    {statusOptions.map((status) => (
                      <option
                        key={status.value}
                        value={status.value}
                      >
                        {status.label}
                      </option>
                    ))}
                  </TextField>
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <TextField
                      error={Boolean(touched.orderID && errors.orderID)}
                      fullWidth
                      helperText={touched.orderID && errors.orderID}
                      label="Order ID"
                      name="orderID"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.orderID}
                      variant="outlined"
                    />
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <TextField
                          error={Boolean(touched.customerSaving && errors.customerSaving)}
                          fullWidth
                          helperText={touched.customerSaving && errors.customerSaving}
                          label="Customer Saving"
                          name="customerSaving"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="number"
                          value={values.customerSaving}
                          variant="outlined"
                    />
                  </Box>
                </CardContent>
              </Card>
              {errors.submit && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>
                    {errors.submit}
                  </FormHelperText>
                </Box>
              )}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  mt: 3
                }}
              >
                <Button
                  color="primary"
                  disabled={isSubmitting}
                  type="submit"
                  variant="contained"
                >
                  Save
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

ProjectCreateForm.propTypes = {
    project: PropTypes.object.isRequired,
    clientoptions: PropTypes.array.isRequired,
    cpaoptions: PropTypes.array.isRequired
  };

export default ProjectCreateForm;
