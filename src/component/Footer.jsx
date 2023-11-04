import * as React from 'react';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { List, ListItem, ListItemButton, ListSubheader } from '@mui/joy';

export default function Footer() {
  const gradientStyle = {
      
    background: 'linear-gradient(45deg, #FFEDEDFF,  #3B3737FF,#000000FF)',
    WebkitBackgroundClip: 'text', // For older browsers
    backgroundClip: 'text',
    color: 'transparent',
    fontSize: '30px',
    cursor:'pointer',
    paddingLeft:'45px',
    textAlign:'center',
    textTransform:'uppercase',
    fontWeight:'bold'
    
  };
  return (
    <Sheet
      variant='solid'
      invertedColors

      sx={{ backgroundColor: '#dfe6ed',color:'#000' }}>
      <Box sx={{ p: 2,cursor:'none' }}>
        <IconButton sx={gradientStyle}>Data <AutoStoriesIcon sx={{ml:1,fontSize:'40px',color:'#000'}} /></IconButton>
      </Box>
      <Divider sx={{ my: 2 ,backgroundColor:'#000' }} />
      <Box sx={{p:3, textAlign:'center'}} >
        <List
          size="sm"
          orientation="horizontal"
          wrap
          sx={{pl:'45%',flexGrow: 0, '--ListItem-radius': '8px', '--ListItem-gap': '0px' }}
        >
        <ListItem nested sx={{ alignItems:'center',width: { xs: '50%', md: 140 } }}>
            <ListSubheader sx={{ color:'#000',fontWeight: 'xl' }}>Sitemap</ListSubheader>
            <List>
              <ListItem >
                <ListItemButton sx={{color:'#aaa'}}>Home</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton sx={{color:'#aaa'}} >Report</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton sx={{color:'#aaa'}}>About</ListItemButton>
              </ListItem>
            </List>
          </ListItem>
          </List>
          </Box>
          <Box  sx={{p:3, textAlign:'center',}} >
        <Typography sx={{ color:'#000'}}>&quot;All rights reserved &quot; 
        <Typography level='4' sx={{fontWeight:'bold'}}> CopyRight Act.<Typography sx={{color:'#000', backgroundColor:'#dfe6ed'}} variant='solid'>@</Typography>2023-24</Typography>
      </Typography> </Box>

    </Sheet>
    
  );
}
