import React from 'react';
import {
  Box,
  Typography,
  Switch,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';


export default function Customizing() {
  return (
    <Box sx={{
      p: 5,
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Typography variant="caption11">
        Workflow
      </Typography>
      <Box display="flex" alignItems="center" sx={{ mt:8 }}>
        <Switch />
        <Typography sx={{ ml: 2.5 }}>
          Turn on workflow
        </Typography>
      </Box>
      <Timeline>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot sx={{ backgroundColor: (theme) => theme.palette.dark.$20 }} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography>Draft stage</Typography>
            <Typography>Form creation process</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot sx={{ backgroundColor: (theme) => theme.palette.secondary.$80 }} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Submit the approval</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot sx={{ backgroundColor: (theme) => theme.palette.secondary.$80 }} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Document sent</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot sx={{ backgroundColor: (theme) => theme.palette.secondary.$80 }} />
          </TimelineSeparator>
          <TimelineContent>Signed or expired</TimelineContent>
        </TimelineItem>
      </Timeline>
    </Box>
  );
}
