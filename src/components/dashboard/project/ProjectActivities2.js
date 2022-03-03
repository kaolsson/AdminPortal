import { useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import toast from 'react-hot-toast';
import { Box } from '@material-ui/core';
import { KanbanColumn } from '../kanban';
import gtm from '../../../lib/gtm';
import { getBoardProject, moveCard } from '../../../slices/kanban';
import { useDispatch, useSelector } from '../../../store';
import PropTypes from 'prop-types';

const ProjectActivity2 = (props) => {
  const { caseID } = props;
  const dispatch = useDispatch();
  const { columns } = useSelector((state) => state.kanban);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
    dispatch(getBoardProject(caseID));
  }, []);

  const handleDragEnd = async ({ source, destination, draggableId }) => {
    try {
      // Dropped outside the column
      if (!destination) {
        return;
      }

      // Card has not been moved
      if (source.droppableId === destination.droppableId
        && source.index === destination.index) {
        return;
      }

      if (source.droppableId === destination.droppableId) {
        // Moved to the same column on different position
        await dispatch(moveCard(draggableId, destination.index));
      } else {
        // Moved to another column
        await dispatch(moveCard(draggableId, destination.index, destination.droppableId));
      }

      toast.success('Action item moved!');
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          flexShrink: 1,
          overflowX: 'auto',
          overflowY: 'hidden'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            px: 1,
            py: 3
          }}
        >
          {columns.allIds.map((columnId) => (
            <KanbanColumn
              columnId={columnId}
              key={columnId}
            />
          ))}
        </Box>
      </Box>
    </DragDropContext>
  );
};

ProjectActivity2.propTypes = {
    caseID: PropTypes.array.isRequired,
  };

export default ProjectActivity2;
