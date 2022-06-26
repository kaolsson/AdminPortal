import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { parse } from 'query-string';
import {
  Box,
  Container,
  Grid,
  Typography
} from '@material-ui/core';
import useSettings from '../../hooks/useSettings';
import gtm from '../../lib/gtm';
import useAuth from '../../hooks/useAuth';
import CpaDetailsUser from '../../components/widgets/detail-lists/CpaDetailsUser';
import WidgetPreviewer from '../../components/WidgetPreviewer';
import { useDispatch, useSelector } from '../../store';
import { getCpas } from '../../slices/cpa';

const CpaUserDetails = () => {
  const { settings } = useSettings();
  const { user } = useAuth();
  const [cpaId] = useState(parse(window.location.search).cid);
  const { cpas } = useSelector((state) => state.cpa);
  const [cpaUser, setCpaUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
    dispatch(getCpas(user.accountID));
  }, []);

  useEffect(() => {
    setCpaUser(cpas.byId[cpaId]);
  }, [cpas]);

  if (!cpaUser) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>SmartMaster Admin | Cpa Details</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 8
        }}
      >
        <Container maxWidth={settings.compact ? 'xl' : false}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              alignItems="center"
              container
              justifyContent="space-between"
              spacing={3}
              item
              xs={12}
            >
              <Grid item>
                <Typography
                  color="textPrimary"
                  variant="h5"
                >
                  {'CPA: ' }
                  {cpaUser.firstName}
                  {' ' }
                  {cpaUser.lastName}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              md={9}
              xs={12}
            >
              <WidgetPreviewer
                element={<CpaDetailsUser cpaUser={cpaUser} />}
                name="User Account Details"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default CpaUserDetails;
