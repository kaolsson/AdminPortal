import {
  Box,
  Container,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';
import MinusIcon from '../icons/Minus';
import Logo from './Logo';

const sections = [
  {
    title: '',
    links: [
      {
        title: 'Terms & Conditions',
        href: '#'
      },
    ]
  },
  {
    title: '',
    links: [

      {
        title: 'Technical Support',
        href: '#'
      },
    ]
  },
];

const Footer = (props) => (
  <Box
    sx={{
      backgroundColor: 'background.default',
      pb: 0,
      pt: {
        md: 0,
        xs: 0
      }
    }}
    {...props}
  >
    <Container maxWidth="lg">
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          md={3}
          sm={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            order: {
              md: 1,
              xs: 4
            }
          }}
          xs={12}
        >
          <Logo />
          <Typography
            color="textSecondary"
            sx={{ mt: 1 }}
            variant="caption"
          >
            © 2021 Copper Wired.
          </Typography>
        </Grid>
        {sections.map((section, index) => (
          <Grid
            item
            key={section.title}
            md={3}
            sm={4}
            sx={{
              order: {
                md: index + 2,
                xs: index + 1
              }
            }}
            xs={12}
          >
            <Typography
              color="textSecondary"
              variant="overline"
            >
              {section.title}
            </Typography>
            <List disablePadding>
              {section.links.map((link) => (
                <ListItem
                  disableGutters
                  key={link.title}
                  sx={{
                    pb: 0,
                    pt: 1
                  }}
                >
                  <ListItemAvatar
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      minWidth: 0,
                      mr: 0.5
                    }}
                  >
                    <MinusIcon color="primary" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={(
                      <Link
                        href={link.href}
                        color="textPrimary"
                        variant="subtitle2"
                      >
                        {link.title}
                      </Link>
                    )}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        ))}
      </Grid>
      <Divider
        sx={{
          borderColor: (theme) => alpha(theme.palette.primary.contrastText, 0.12),
          my: 0
        }}
      />
    </Container>
  </Box>
);

export default Footer;
