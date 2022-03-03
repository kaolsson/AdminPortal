import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
// import debounce from 'lodash/debounce';
import { Box, Dialog, Grid, Typography } from '@material-ui/core';
import LabelIcon from '@material-ui/icons/Label';
// import ArchiveIcon from '../../../icons/Archive';
// import ArrowRightIcon from '../../../icons/ArrowRight';
import CheckIcon from '../../../icons/Check';
// import DocumentTextIcon from '../../../icons/DocumentText';
// import DuplicateIcon from '../../../icons/Duplicate';
import EyeIcon from '../../../icons/Eye';
import EyeOffIcon from '../../../icons/EyeOff';
// import TemplateIcon from '../../../icons/Template';
import UsersIcon from '../../../icons/Users';
import { addChecklist, updateCard } from '../../../slices/kanban';
import { useDispatch } from '../../../store';
import KanbanCardAction from './KanbanCardAction';
import KanbanChecklist from './KanbanChecklist';
import KanbanComment from './KanbanComment';
import KanbanCommentAdd from './KanbanCommentAdd';

const KanbanCardModal = (props) => {
  const { card, column, onClose, open, ...other } = props;
  const dispatch = useDispatch();

  const handleSubscribe = async () => {
    try {
      console.log(card.isSubscribed);
      await dispatch(updateCard(card.id, { isSubscribed: 'True' }));
      console.log(card);
      toast.success('Subscribed!');
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    }
  };

  const handleUnsubscribe = async () => {
    try {
        console.log(card);
        await dispatch(updateCard(card.id, { isSubscribed: 'False' }));
        console.log(card);
      toast.success('Unsubscribed!');
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    }
  };

  const handleAddChecklist = async () => {
    try {
      await dispatch(addChecklist(card.id, 'Untitled Checklist'));
      toast.success('Checklist added!');
    } catch (err) {
      console.error(err);
//      toast.error('Something went wrong!');
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      onClose={onClose}
      open={open}
      {...other}
    >
      <Box sx={{ p: 3 }}>
        <Grid
          container
          spacing={5}
        >
          <Grid
            item
            sm={8}
            xs={12}
          >
            <Typography
              color="textPrimary"
              variant="h6"
            >
              Title
            </Typography>
            <Typography
              sx={{
                mb: 3
              }}
              color="textPrimary"
              variant="body1"
            >
              {card.title}
            </Typography>
            <Typography
              color="textPrimary"
              variant="h6"
            >
              Action Description
            </Typography>
            <Typography
              color="textPrimary"
              variant="body1"
            >
              {card.description}
            </Typography>
            {card.checklists.length > 0 && (
              <Box sx={{ mt: 5 }}>
                {card.checklists.map((checklist) => (
                  <KanbanChecklist
                    card={card}
                    checklist={checklist}
                    key={checklist.id}
                    sx={{ mb: 3 }}
                  />
                ))}
              </Box>
            )}
            <Box sx={{ mt: 3 }}>
              <Typography
                color="textPrimary"
                variant="h6"
              >
                Comments and Activity
              </Typography>
              <Box sx={{ mt: 2 }}>
                <KanbanCommentAdd cardId={card.id} />
                {card.comments.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    {card.comments.map((comment) => (
                      <KanbanComment
                        createdAt={comment.createdAt}
                        key={comment.id}
                        memberId={comment.memberId}
                        message={comment.message}
                      />
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
          >
            <Typography
              color="textPrimary"
              component="h4"
              sx={{
                fontWeight: 600,
                mb: 2
              }}
              variant="overline"
            >
              Add to action
            </Typography>
            <KanbanCardAction
              disabled
              icon={<CheckIcon fontSize="small" />}
              onClick={handleAddChecklist}
            >
              Checklist
            </KanbanCardAction>
            <KanbanCardAction
              disabled
              icon={<UsersIcon fontSize="small" />}
            >
              Members
            </KanbanCardAction>
            <KanbanCardAction
              disabled
              icon={<LabelIcon fontSize="small" />}
            >
              Labels
            </KanbanCardAction>
            <Box sx={{ mt: 3 }}>
              <Typography
                color="textPrimary"
                component="h4"
                sx={{
                  fontWeight: 600,
                  mb: 2
                }}
                variant="overline"
              >
                Actions
              </Typography>
              {(card.isSubscribed === 'True')
                ? (
                  <KanbanCardAction
                    icon={<EyeOffIcon fontSize="small" />}
                    onClick={handleUnsubscribe}
                  >
                    Unwatch
                  </KanbanCardAction>
                )
                : (
                  <KanbanCardAction
                    icon={<EyeIcon fontSize="small" />}
                    onClick={handleSubscribe}
                  >
                    Watch
                  </KanbanCardAction>
                )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

KanbanCardModal.propTypes = {
  card: PropTypes.object.isRequired,
  column: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  open: PropTypes.bool
};

KanbanCardModal.defaultProps = {
  open: false
};

export default KanbanCardModal;
