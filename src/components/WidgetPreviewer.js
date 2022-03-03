import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, Divider, ThemeProvider } from '@material-ui/core';
// import { THEMES } from '../constants';
import useSettings from '../hooks/useSettings';
// import MoonIcon from '../icons/Moon';
// import SunIcon from '../icons/Sun';
import { createCustomTheme } from '../theme';

const WidgetPreviewer = (props) => {
  const { element, name, ...other } = props;
  const { settings } = useSettings();
  const [selectedTheme, setSelectedTheme] = useState(settings.theme);

  useEffect(() => {
    setSelectedTheme(settings.theme);
  }, [settings.theme]);

  const theme = createCustomTheme({
    ...settings,
    theme: selectedTheme
  });

  return (
    <Card
      variant="outlined"
      sx={{ mb: 8 }}
      {...other}
    >
      <CardHeader
        title={name}
      />
      <Divider />
      <ThemeProvider theme={theme}>
        {element}
      </ThemeProvider>
    </Card>
  );
};

WidgetPreviewer.propTypes = {
  element: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired
};

export default WidgetPreviewer;
