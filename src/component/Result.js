import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import { Grid,Container, Box } from "@mui/material";
import { LineChart } from '@mui/x-charts/LineChart';


import { useParams } from 'react-router-dom';

import {Item} from '../config/ItemTag';

export default function Result(){
    const params = useParams();

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }
    
    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];
    
    
    return(
        <>
        <article>
          {/*Section 2 결과를 확인하는 섹션*/}
          <Container maxWidth="mx" sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        height: '100vh'
                    }}> 
                     <Box sx={{ 
                            flexGrow: 1,
                            maxWidth: { xs: 500, md: '50%' },
                            maxHeight: { xs: 500, md: '65%' },
                            }}>
                            <Item>
            <Grid container spacing={2}> 
          <Grid item xs={12}>
                <h1>{params.city} {params.dis} {params.nei} 날씨</h1>
                <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10],label: "시간" }]}
                    yAxis={[{
                        label: "기온"}]}
                    series={[
                        {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                        },
                    ]}
                    minWidth={650}
                    height={300}
                  />
        
            </Grid>

        <Grid item xs={12}>
          <TableContainer component={Paper} sx={{boder:'1px solid white'}}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                  <TableRow>
                      <TableCell>Dessert (100g serving)</TableCell>
                      <TableCell align="right">Calories</TableCell>
                      <TableCell align="right">Fat&nbsp;(g)</TableCell>
                      <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                      <TableCell align="right">Protein&nbsp;(g)</TableCell>
                  </TableRow>
                  </TableHead>
                  <TableBody>
                  {rows.map((row) => (
                      <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                      <TableCell component="th" scope="row">
                          {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                      </TableRow>
                  ))}
                  </TableBody>
              </Table>
              </TableContainer>
              </Grid>
              </Grid>
              </Item>
              </Box>
          </Container>
          </article>
          </>
    );
}