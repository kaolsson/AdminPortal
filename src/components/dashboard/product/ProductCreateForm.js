import { useState } from 'react';
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
  Typography
} from '@material-ui/core';
import FileDropzone from '../../FileDropzone';
// import QuillEditor from '../../QuillEditor';
import { productApi } from '../../../__fakeApi__/productApi';
import PropTypes from 'prop-types';

const categoryOptions = [
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
      label: 'Inactive',
      value: 'inactive'
    },
    {
      label: 'Obsolete',
      value: 'obsolete'
      }
    ];

const ProductCreateForm = (props) => {
  const { product } = props;
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);

  const handleDrop = (newFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleRemove = (file) => {
    setFiles((prevFiles) => prevFiles.filter((_file) => _file.path
      !== file.path));
  };

  const handleRemoveAll = () => {
    setFiles([]);
  };

  return (
    <Formik
      initialValues={{
        productID: product.productID,
        accountID: product.accountID,
        productStatus: product.productStatus,
        productCategory: product.productCategory,
        productDescription: product.productDescription,
        productPictureUrl: [],
        productName: product.productName,
        productPrice: product.productPrice,
        productQuantity: product.productQuantity,
        productSubCategory: product.productSubCategory,
        productOwner: product.productOwner,
        note: product.note,
        priceCurrency: 'USD', // hardcode USD for now
        submit: null
      }}
      validationSchema={Yup
        .object()
        .shape({
          productCategory: Yup.string().max(255),
          productDescription: Yup.string().max(5000),
          productPictureUrl: Yup.array(),
          productName: Yup.string().max(255).required(),
          productPrice: Yup.number().min(0).required(),
          productQuantity: Yup.number().min(0).required(),
          productSubCategory: Yup.string().max(255),
          productOwner: Yup.string().max(255),
          note: Yup.string().max(255),
        })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          // NOTE: Make API request
          console.log(values);
          await productApi.editProduct(values);
          setStatus({ success: true });
          setSubmitting(false);
          toast.success('Product updated/created!');
          navigate('/products/browse');
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
                <CardHeader title="Product Description" />
                <CardContent>
                  <TextField
                    error={Boolean(touched.productName && errors.productName)}
                    fullWidth
                    helperText={touched.productName && errors.productName}
                    label="Product Name"
                    name="productName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.productName}
                    variant="outlined"
                  />
                  <Box sx={{ mt: 3 }}>
                  <TextField
                    error={Boolean(touched.productDescription && errors.productDescription)}
                    fullWidth
                    helperText={touched.productDescription && errors.productDescription}
                    label="Product Description"
                    name="productDescription"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.productDescription}
                    variant="outlined"
                  />
                  </Box>
                  <Box sx={{ mt: 3 }}>
                  <TextField
                    error={Boolean(touched.note && errors.note)}
                    fullWidth
                    helperText={touched.note && errors.note}
                    label="Internal Product Note"
                    name="note"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.note}
                    variant="outlined"
                  />
                  </Box>
                </CardContent>
              </Card>
              <Box sx={{ mt: 3 }}>
              <Card>
                <CardHeader title="Tracking" />
                <CardContent>
                <Typography
                    color="inherit"
                    sx={{ ml: 1 }}
                    variant="subtitle2"
                >
                    Date Added:
                    {' '}
                    {product.dateAdded.substring(0, 10)}
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Typography
                    color="inherit"
                    sx={{ ml: 1 }}
                    variant="subtitle2"
                  >
                    Date Updated:
                    {' '}
                    {product.dateUpdated.substring(0, 10)}
                  </Typography>
                </Box>
                </CardContent>
              </Card>
              </Box>
              <Box sx={{ mt: 3 }}>
                <Card>
                  <CardHeader title="Upload Image" />
                  <CardContent>
                    <FileDropzone
                      accept="image/*"
                      files={files}
                      onDrop={handleDrop}
                      onRemove={handleRemove}
                      onRemoveAll={handleRemoveAll}
                    />
                  </CardContent>
                </Card>
              </Box>
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <Card>
                <CardHeader title="Product Info" />
                <CardContent>
                  <TextField
                    fullWidth
                    label="Product Status"
                    name="productStatus"
                    onChange={handleChange}
                    select
                    SelectProps={{ native: true }}
                    value={values.productStatus}
                    variant="outlined"
                  >
                    {statusOptions.map((productStatus) => (
                      <option
                        key={productStatus.value}
                        value={productStatus.value}
                      >
                        {productStatus.label}
                      </option>
                    ))}
                  </TextField>
                  <Box sx={{ mt: 3 }}>
                  <TextField
                    fullWidth
                    label="Product Category"
                    name="productCategory"
                    onChange={handleChange}
                    select
                    SelectProps={{ native: true }}
                    value={values.productCategory}
                    variant="outlined"
                  >
                    {categoryOptions.map((productCategory) => (
                      <option
                        key={productCategory.value}
                        value={productCategory.value}
                      >
                        {productCategory.label}
                      </option>
                    ))}
                  </TextField>
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <TextField
                      error={Boolean(touched.productSubCategory && errors.productSubCategory)}
                      fullWidth
                      helperText={touched.productSubCategory && errors.productSubCategory}
                      label="Sub Category"
                      name="productSubCategory"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.productSubCategory}
                      variant="outlined"
                    />
                  </Box>
                  <Box sx={{ mt: 3 }}>
                  <TextField
                    error={Boolean(touched.productOwner && errors.productOwner)}
                    fullWidth
                    helperText={touched.productOwner && errors.productOwner}
                    label="Product Owner"
                    name="productOwner"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.productOwner}
                    variant="outlined"
                  />
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <TextField
                          error={Boolean(touched.productPrice && errors.productPrice)}
                          fullWidth
                          helperText={touched.productPrice && errors.productPrice}
                          label="Product Price"
                          name="productPrice"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="number"
                          value={values.productPrice}
                          variant="outlined"
                    />
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <TextField
                          error={Boolean(touched.productQuantity && errors.productQuantity)}
                          fullWidth
                          helperText={touched.productQuantity && errors.productQuantity}
                          label="Product Quantity"
                          name="productQuantity"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="number"
                          value={values.productQuantity}
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
                  Save Product
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

ProductCreateForm.propTypes = {
    product: PropTypes.array.isRequired
  };

export default ProductCreateForm;
