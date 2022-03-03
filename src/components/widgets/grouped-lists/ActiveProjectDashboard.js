import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from '@material-ui/core';
import Label from '../../Label';
import { projectApi } from '../../../__fakeApi__/projectApi';
import useAuth from '../../../hooks/useAuth';
import useMounted from '../../../hooks/useMounted';
import { Link as RouterLink } from 'react-router-dom';

const labelColorsMap = {
  new: 'primary',
  ongoing: 'success',
  active: 'success',
  onhold: 'warning',
  client: 'warning',
  vendor: 'secondary',
  IRS: 'secondary',
};

const ActiveProjectDashboard = () => {
  const mounted = useMounted();
  const { user } = useAuth();
  const [activeProjects, setActiveProjects] = useState([]);

  const getProjects = useCallback(async () => {
    try {
      const data = await projectApi.getProjects(user.customerID);

      if (mounted.current) {
        setActiveProjects(data.projects.active);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  if (activeProjects.length !== 0) {
    return (
    <>
    <Box
        sx={{
        backgroundColor: 'background.widget',
        minHeight: '100%',
        p: 3
        }}
    >
        <Card>
        <CardHeader title="Action and Status" />
        <Divider />
        <Table>
            <TableBody>
            {activeProjects.map((workCase) => (
                <TableRow
                key={workCase.caseID}
                sx={{
                    '&:last-child td': {
                    border: 0
                    }
                }}
                >
                <TableCell>
                    <Typography
                    color="textPrimary"
                    variant="subtitle2"
                    >
                    {workCase.title}
                    </Typography>
                    <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    >
                    {workCase.description}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography
                    color="textPrimary"
                    variant="subtitle2"
                    >
                    {workCase.dateStarted ? workCase.dateStarted : 'Not Started'}
                    </Typography>
                    <Typography
                    color="textSecondary"
                    sx={{ mt: 1 }}
                    variant="body2"
                    >
                    {workCase.dateStarted && 'Date Started'}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography
                    color="textPrimary"
                    variant="subtitle2"
                    >
                    {workCase.owner.firstName}
                    {' '}
                    {workCase.owner.lastName}
                    </Typography>
                    <Typography
                    color="textSecondary"
                    sx={{ mt: 1 }}
                    variant="body2"
                    >
                    Case Owner
                    </Typography>
                </TableCell>
                <TableCell>
                    <Label color={labelColorsMap[workCase.status]}>
                    {workCase.status}
                    </Label>
                </TableCell>
                <TableCell>
                    <Label color={labelColorsMap[workCase.action]}>
                    {workCase.action}
                    </Label>
                </TableCell>
                <TableCell align="right">
                    <Button
                    color="primary"
                    size="small"
                    variant="outlined"
                    component={RouterLink}
                    to={['/projects/details/?cid=', workCase.caseID].join('')}
                    >
                    Go to Case
                    </Button>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </Card>
    </Box>
    </>
  );
}

return (
    <>
    <Box
      sx={{
        backgroundColor: 'background.widget',
        minHeight: '100%',
        p: 3
      }}
    >
      <Card>
        <CardHeader title="No active projects" />
      </Card>
    </Box>
    </>
  );
};

export default ActiveProjectDashboard;
