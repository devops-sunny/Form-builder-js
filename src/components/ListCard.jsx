import * as React from 'react';
import {
  Box,
  Icon,
  IconButton,
  styled,
  Typography,
} from '@mui/material';
import moment from 'moment';
import Popover from './Popover';


const ListCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(3),
  width: 'auto',
  transition: theme.transitions.create(['background', 'opacity'], {
    duration: 250,
  }),
  '&:hover': {
    background: theme.palette.dark.$a4,
    '.MuiIconButton-root': {
      transition: theme.transitions.create(['opacity'], {
        duration: 350,
      }),
      visibility: 'visible',
      opacity: 1,
    }
  },
  '> .MuiSvgIcon-root': {
    fontSize: 28,
    margin: theme.spacing(0, 3),
  },
  '.MuiIconButton-root': {
    marginLeft: 'auto /* @noflip */',
    alignSelf: 'center',
    visibility: 'hidden',
    opacity: 0,
  },
}));

// eslint-disable-next-line react/display-name
export default React.memo(({ time, item, leftIcon, popoverIcon, popoverBody }) => (
  <ListCard>
    <Icon component={leftIcon} />
    <Box>
      <Typography weight="medium" lh="controls" varint="body14">
        {item.name || item.title}
      </Typography>
      {time && (
        <Typography variant="body12" color="dark.$60">
            Created at {moment(time).format('l hh:mm')}
        </Typography>
      )}
    </Box>
    <Popover id={time}>
      <IconButton>
        <Icon component={popoverIcon} />
      </IconButton>
      {popoverBody}
    </Popover>
  </ListCard>
));
ListCard.displayName = "ListCard";