import * as React from 'react';
import {
  Box,
  Typography,
  CardMedia,
  Avatar,
} from '@mui/material';

export default function SubModelSection({ currentSection }) {
  return (
    <>
      {currentSection.bgImage && currentSection.subModel === 'bg'
       && <Box display="flex" flex="1">
         <CardMedia component="img" src={currentSection.bgImage} sx={{ height: `${currentSection.height}px` }} />
       </Box>
      }
      {currentSection.subModel === 'logo'
       && <Box sx={{ position: 'relative', flex: 1 }}>
         {currentSection.bgImage
          && <CardMedia component="img" src={currentSection.bgImage} sx={{ height: `${currentSection.height}px` }} />
         }
         {currentSection.logoImage
          && <Box display="flex" sx={
            currentSection.bgImage ? {
              position: 'absolute',
              bottom: 16,
              left: 20,
            } : {
              py: 4,
              pl: 5,
            }
          }>
            <Avatar
              alt={currentSection.logoName}
              src={currentSection.logoImage}
              sx={{ width: 100, height: 100, mr: 5 }}
            />
            <Box display="flex" flexDirection="column" justifyContent="center">
              <Typography variant="h2" color={currentSection.bgImage ? 'light.main' : 'dark.main'}>
                {currentSection.logoName}
              </Typography>
              <Typography variant="body13" color={currentSection.bgImage ? 'light.main' : 'dark.main'}>
                {currentSection.logoDescription}
              </Typography>
            </Box>
          </Box>
         }
       </Box>
      }
    </>
  )
}
