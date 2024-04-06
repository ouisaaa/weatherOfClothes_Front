import { Grid,Stack,Typography,Box,Divider ,Chip  } from "@mui/material";


import {Item} from '../../config/ItemTag.js'

export default function MainTab(){
    
    return(
        <Grid container spacing={2}>
            <Grid item xs={12}>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
            
          <Typography gutterBottom variant="h5" component="div">
            Toothbrush
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            $4.50
          </Typography>
        </Grid>
        <Typography color="text.secondary" variant="body2">
          Pinstriped cornflower blue cotton blouse takes you on a walk to the park or
          just down the hall.
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography gutterBottom variant="body2">
          Select type
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip color="primary" label="Soft" size="small" />
          <Chip label="Medium" size="small" />
          <Chip label="Hard" size="small" />
        </Stack>
      </Box>
            </Grid>
        </Grid>
    )
}