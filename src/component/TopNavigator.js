
import {AppBar, Box,Typography,Toolbar,useScrollTrigger,Slide} from '@mui/material'



 
export default function TopNavigator(props){
    
   
    return(
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color={'primary'}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Weather
                </Typography>
                </AppBar>
            </Box>
            <Toolbar />
        </>
    );
}