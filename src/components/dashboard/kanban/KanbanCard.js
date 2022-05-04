import { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
//  Avatar,
//  AvatarGroup,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography
} from '@material-ui/core';
import CheckIcon from '../../../icons/Check';
import ChatAltIcon from '../../../icons/ChatAlt';
import DocumentTextIcon from '../../../icons/DocumentText';
import EyeIcon from '../../../icons/Eye';
import { useSelector } from '../../../store';
import KanbanCardModal from './KanbanCardModal';
import Label from '../../Label';

const getActionLabel = (actionType) => {
    console.log(actionType);
    const map = {
      client: {
        text: 'client',
        color: 'success'
      },
      cpa: {
        text: 'cpa',
        color: 'error'
      },
      none: {
        text: 'none',
        color: 'invisible'
      }
    };

    const { text, color } = map[actionType];

    return (
      <Label color={color}>
        {text}
      </Label>
    );
  };

const cardSelector = (state, cardId) => {
  const { cards, members } = state.kanban;
  const card = cards.byId[cardId];

  return {
    ...card,
    members: card.memberIds.map((memberId) => members.byId[memberId])
  };
};

const KanbanCard = forwardRef((props, ref) => {
  const { cardId, dragging, column, ...other } = props;
  const card = useSelector((state) => cardSelector(state, cardId));
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      ref={ref}
      sx={{
        outline: 'none',
        py: 1
      }}
      {...other}
    >
      <Card
        onClick={handleOpen}
        raised={dragging}
        sx={{
          ...(dragging && {
            backgroundColor: 'background.paper'
          }),
          '&:hover': {
            backgroundColor: 'background.default'
          }
        }}
        variant={dragging ? 'elevation' : 'outlined'}
      >
        {card.cover && (
          <CardMedia
            image={card.cover}
            sx={{ height: 200 }}
          />
        )}
        <CardContent>
          <Typography
            color="textPrimary"
            variant="subtitle2"
          >
            {card.title}
          </Typography>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              mt: 2,
              '& svg:not(:first-of-type)': {
                ml: 2
              }
            }}
          >
            {(card.isSubscribed === 'True') && <EyeIcon fontSize="small" />}
            {card.attachments.length > 0 && <DocumentTextIcon fontSize="small" />}
            {card.checklists.length > 0 && <CheckIcon fontSize="small" />}
            {card.comments.length > 0 && <ChatAltIcon fontSize="small" />}
            <Box sx={{ flexGrow: 1 }} />
            {getActionLabel(card.actionOwner)}
          </Box>
        </CardContent>
      </Card>
      <KanbanCardModal
        card={card}
        column={column}
        onClose={handleClose}
        open={open}
      />
    </Box>
  );
});

KanbanCard.propTypes = {
  cardId: PropTypes.string.isRequired,
  dragging: PropTypes.bool,
  index: PropTypes.number,
  column: PropTypes.object.isRequired,
  style: PropTypes.object
};

KanbanCard.defaultProps = {
  dragging: false
};

export default KanbanCard;
