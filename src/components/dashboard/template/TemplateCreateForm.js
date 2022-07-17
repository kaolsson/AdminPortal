// import { useState } from 'react';
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
//  Checkbox,
//  FormControlLabel,
  FormHelperText,
  Grid,
  TextField,
//  Typography
} from '@material-ui/core';
// import FileDropzone from '../../FileDropzone';
// import QuillEditor from '../../QuillEditor';
import { templateApi } from '../../../__fakeApi__/templateApi';
import PropTypes from 'prop-types';

const paymentMethodOptions = [
  {
    value: '',
    label: ''
  },
  {
    label: 'Card',
    value: 'card'
  },
  {
    label: 'Bank Transfer',
    value: 'banktransfer'
  },
  {
    label: 'Check',
    value: 'check'
  },
  {
    label: 'Other',
    value: 'other'
  }
];

const statusOptions = [
    {
        value: '',
        label: ''
      },
      {
        label: 'Active',
        value: 'active'
      },
      {
        label: 'On Hold',
        value: 'onhold'
      },
      {
        label: 'Inactive',
        value: 'inactive'
      },
      {
      label: 'Obsolete',
      value: 'obsolete'
      }
];

const createProjectOptions = [
      {
        label: '',
        value: ''
      },
      {
        label: 'Yes',
        value: 'yes'
      },
      {
        label: 'No',
        value: 'no'
      }
];

const TemplateCreateForm = (props) => {
  const { user, productOptions } = props;
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        templateID: '',
        templateName: '',
        templateDescription: '',
        templateStatus: '',
        productID: '',
        customerID: '',
        webKey: '',
        subscriptionRate: '',
        salesAmount: '',
        paymentMethod: '',
        paymentInstructions: '',
        createProject: '',
        note: '',
        submit: null
      }}
      validationSchema={Yup
        .object()
        .shape({
          templateName: Yup.string().max(200).required(),
          templateDescription: Yup.string().max(500).required(),
          templateStatus: Yup.string().max(20).required(),
          productID: Yup.string().max(50).required(),
          customerID: Yup.string().max(50),
          webKey: Yup.string().max(50),
          subscriptionRate: Yup.number().min(0).required(),
          salesAmount: Yup.number().min(0).required(),
          paymentMethod: Yup.string().max(20),
          paymentInstructions: Yup.string().max(200),
          createProject: Yup.string().max(20).required(),
          note: Yup.string().max(200),
        })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          // NOTE: Make API request
          values.cpaID = user.id; // set logged in cpa user as owner
          values.accountID = user.accountID; // set cpa user org and account
          values.Currency = 'USD'; // hardcode USD for now
          await templateApi.newTemplate(values);
          setStatus({ success: true });
          setSubmitting(false);
          toast.success('Template updated/created!');
          navigate('/templates/browse');
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
//        setFieldValue,
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
                <CardHeader title="Template Description" />
                <CardContent>
                  <TextField
                    error={Boolean(touched.templateName && errors.templateName)}
                    fullWidth
                    helperText={touched.templateName && errors.templateName}
                    label="Template Name"
                    name="templateName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.templateName}
                    variant="outlined"
                  />
                  <Box sx={{ mt: 3 }}>
                  <TextField
                    error={Boolean(touched.templateDescription && errors.templateDescription)}
                    fullWidth
                    helperText={touched.templateDescription && errors.templateDescription}
                    label="Template Description"
                    name="templateDescription"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.templateDescription}
                    variant="outlined"
                  />
                  </Box>
                  <Box sx={{ mt: 3 }}>
                  <TextField
                    error={Boolean(touched.note && errors.note)}
                    fullWidth
                    helperText={touched.note && errors.note}
                    label="Internal Template Note (optional)"
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
                <CardHeader title="Template Info" />
                <CardContent>
                  <TextField
                    error={Boolean(touched.templateStatus && errors.templateStatus)}
                    fullWidth
                    helperText={touched.templateStatus && errors.templateStatus}
                    label="Template Status"
                    name="templateStatus"
                    onChange={handleChange}
                    select
                    SelectProps={{ native: true }}
                    value={values.templateStatus}
                    variant="outlined"
                  >
                    {statusOptions.map((templateStatus) => (
                      <option
                        key={templateStatus.value}
                        value={templateStatus.value}
                      >
                        {templateStatus.label}
                      </option>
                    ))}
                  </TextField>
                  <Box sx={{ mt: 3 }}>
                    <TextField
                       error={Boolean(touched.productID && errors.productID)}
                        fullWidth
                        helperText={touched.productID && errors.productID}
                        label="Product"
                        name="productID"
                        onChange={handleChange}
                        select
                        SelectProps={{ native: true }}
                        value={values.productID}
                        variant="outlined"
                    >
                        {productOptions.map((productID) => (
                        <option
                            key={productID.value}
                            value={productID.value}
                        >
                            {productID.label}
                        </option>
                        ))}
                    </TextField>
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <TextField
                      error={Boolean(touched.customerID && errors.customerID)}
                      fullWidth
                      helperText={touched.customerID && errors.customerID}
                      label="Customer ID (optional)"
                      name="customerID"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.customerID}
                      variant="outlined"
                    />
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <TextField
                      error={Boolean(touched.webKey && errors.webKey)}
                      fullWidth
                      helperText={touched.webKey && errors.webKey}
                      label="Web Key (optional)"
                      name="webKey"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.webKey}
                      variant="outlined"
                    />
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <TextField
                          error={Boolean(touched.subscriptionRate && errors.subscriptionRate)}
                          fullWidth
                          helperText={touched.subscriptionRate && errors.subscriptionRate}
                          label="Subscription Rate"
                          name="subscriptionRate"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="number"
                          value={values.subscriptionRate}
                          variant="outlined"
                    />
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <TextField
                          error={Boolean(touched.salesAmount && errors.salesAmount)}
                          fullWidth
                          helperText={touched.salesAmount && errors.salesAmount}
                          label="Sales Amount"
                          name="salesAmount"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="number"
                          value={values.salesAmount}
                          variant="outlined"
                    />
                  </Box>
                  <Box sx={{ mt: 3 }}>
                  <TextField
                    fullWidth
                    label="Payment Method (optional)"
                    name="paymentMethod"
                    onChange={handleChange}
                    select
                    SelectProps={{ native: true }}
                    value={values.paymentMethod}
                    variant="outlined"
                  >
                    {paymentMethodOptions.map((paymentMethod) => (
                      <option
                        key={paymentMethod.value}
                        value={paymentMethod.value}
                      >
                        {paymentMethod.label}
                      </option>
                    ))}
                  </TextField>
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <TextField
                      error={Boolean(touched.paymentInstructions && errors.paymentInstructions)}
                      fullWidth
                      helperText={touched.paymentInstructions && errors.paymentInstructions}
                      label="Payment Instructions (optional)"
                      name="paymentInstructions"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.paymentInstructions}
                      variant="outlined"
                    />
                  </Box>
                  <Box sx={{ mt: 3 }}>
                  <TextField
                    error={Boolean(touched.createProject && errors.createProject)}
                    fullWidth
                    helperText={touched.createProject && errors.createProject}
                    label="Create Project"
                    name="createProject"
                    onChange={handleChange}
                    select
                    SelectProps={{ native: true }}
                    value={values.createProject}
                    variant="outlined"
                  >
                    {createProjectOptions.map((createProject) => (
                      <option
                        key={createProject.value}
                        value={createProject.value}
                      >
                        {createProject.label}
                      </option>
                    ))}
                  </TextField>
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
                  Save Template
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

TemplateCreateForm.propTypes = {
    user: PropTypes.any.isRequired,
    productOptions: PropTypes.array.isRequired
  };

export default TemplateCreateForm;
