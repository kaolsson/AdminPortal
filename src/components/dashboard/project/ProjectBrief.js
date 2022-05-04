import PropTypes from 'prop-types';
import Markdown from 'react-markdown/with-html';
import { Box, Card, CardContent, Chip, Grid, Typography } from '@material-ui/core';
import { experimentalStyled } from '@material-ui/core/styles';

const MarkdownWrapper = experimentalStyled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontFamily: theme.typography.fontFamily,
  '& p': {
    marginBottom: theme.spacing(2)
  }
}));

const ProjectBrief = (props) => {
  const { description, note, tags, title, ...other } = props;
  console.log(tags);

  return (
    <Card {...other}>
      <CardContent>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            md={6}
            xs={12}
          >
            <Typography
              color="textSecondary"
              variant="overline"
            >
              Case Name
            </Typography>
            <Typography
              color="textPrimary"
              variant="subtitle2"
            >
              {title}
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Typography
                color="textSecondary"
                variant="overline"
              >
                Tags
              </Typography>
              <Box sx={{ mt: 2 }}>
                {tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3 }}>
          <Typography
            color="textSecondary"
            sx={{ mb: 2 }}
            variant="overline"
          >
            Description
          </Typography>
          <MarkdownWrapper>
            <Markdown source={description} />
          </MarkdownWrapper>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Typography
              color="textSecondary"
              variant="overline"
          >
              Order
          </Typography>
          <Typography
              color="textPrimary"
              variant="subtitle2"
          >
              {note}
          </Typography>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Typography
            color="textSecondary"
            sx={{ mb: 2 }}
            variant="overline"
          >
            Notes
          </Typography>
          <MarkdownWrapper>
            <Markdown source={note} />
          </MarkdownWrapper>
        </Box>
      </CardContent>
    </Card>
  );
};

ProjectBrief.propTypes = {
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired
};

export default ProjectBrief;
