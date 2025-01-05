import React, { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  TextField,
  Chip,
  Switch,
} from '@mui/material';

export default function Settings() {
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const caterogies = ['Non Residents', 'Managers'];

  return (
    <Box sx={{
      p: 5,
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Typography variant="caption11">
        Template settings
      </Typography>
      <Box display="flex" flexDirection="column" sx={{ mt: 8, mb: 6 }}>
        <Typography variant="body13" weight="medium" color="dark.$80" sx={{ mb:1 }}>
          Reff code
        </Typography>
        <Typography variant="body14" color="dark.$40">
          854739
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" sx={{ mb: 6 }}>
        <Typography variant="body13" weight="medium" color="dark.$80" sx={{ mb:1 }}>
          Template name
        </Typography>
        <TextField
          // onChange={(e) => setTemplateName(e.event.target)}
          placeholder="Change template name"
          bg="a4"
          size="m"
        />
      </Box>
      <Box display="flex" flexDirection="column" sx={{ mb: 6 }}>
        <Typography variant="body13" weight="medium" color="dark.$80" sx={{ mb:1 }}>
          Appearence for caterogies
        </Typography>
        <Box>
          {caterogies.map((cat) => <Chip variant="xs" bg="darka6" key={cat} label={cat} sx={{ mr:2 }}/> )}
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" sx={{ mb: 6 }}>
        <Typography variant="body13" weight="medium" color="dark.$80" sx={{ mb:1 }}>
          Description
        </Typography>
        <TextField
          multiline
          rows={3}
          onChange={(e) => setTemplateDescription(e.event.target)}
          placeholder="Leave some notes for your team..."
          bg="a4"
        />
      </Box>
      <Divider sx={{ mx: -5 }} />
      <Box display="flex" flexDirection="column" sx={{ mt: 4, mb: 6 }}>
        <Typography variant="body13" weight="medium" color="dark.$80" sx={{ mb:1 }}>
          Template permissions
        </Typography>
        <Box display="flex" alignItems="center" sx={{ mt:5 }}>
          <Switch />
          <Typography sx={{ ml: 2.5 }}>
            Can be changed by sender
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mx: -5 }} />
      <Box display="flex" flexDirection="column" sx={{ mt: 4, mb: 6 }}>
        <Typography variant="body13" weight="medium" color="dark.$80" sx={{ mb:1 }}>
          Document workflow
        </Typography>
        <Box display="flex" alignItems="center" sx={{ mt:5 }}>
          <Switch />
          <Typography sx={{ ml: 2.5 }}>
            Turn on workflows
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mx: -5 }} />
      <Box display="flex" flexDirection="column" sx={{ mt: 4, mb: 6 }}>
        <Typography variant="body13" weight="medium" color="dark.$80" sx={{ mb:1 }}>
          Template usage
        </Typography>
        <Box display="flex" alignItems="center" sx={{ mt:5 }}>
          <Switch />
          <Typography sx={{ ml: 2.5 }}>
            Track changes and usage
          </Typography>
        </Box>
      </Box>

    </Box>
  );
}
