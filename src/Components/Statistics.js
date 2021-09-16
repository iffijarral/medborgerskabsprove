import React, { useEffect, useContext, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import * as myConstants from 'Constants';
import axios from 'axios';
import { AuthContext } from 'Components/Contexts/AuthContext';


const columns = [
    { id: 'test', label: 'Test', align: 'left' },

    {
        id: 'testdate',
        label: 'Date',
        align: 'center',
        
    },
    {
        id: 'rightAnswers',
        label: 'Right Answers',
        align: 'center',

    },
    {
        id: 'result',
        label: 'Result',
        align: 'center',

    }
];

function createData(test, testdate, rightAnswers) {

    const result = rightAnswers > 19 ? 'Pass' : 'Fail';
    
    return { test, testdate, rightAnswers, result };
}

const useStyles = makeStyles({
    root: {
        // width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: 'salmon',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },

}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

export default function Statistics() {

    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);

    var auth = useContext(AuthContext);

    const apiUrl = myConstants.apiUrl+'statistics';

    const updatedState = [];

    useEffect(async () => {        

        const response = await axios({
            url: apiUrl,
            method: 'POST',
            data: {userID: Number(auth.authState.id)}
        });                

        
        if(response.data.status) 
        {
            const objStatistics = response.data.statistics;

            if(objStatistics.length > 0) 
            {                
                for (let a = 0; a < objStatistics.length; a++) 
                {
                    updatedState[a] = createData(objStatistics[a].title, objStatistics[a].testdate, objStatistics[a].answers);
                    
                    setRows([...rows, ...updatedState]);
                };
                
            }
        }

    },[]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <section>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <StyledTableCell
                                        key={column.id}
                                        align={column.align}
                                    >
                                        {column.label}
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            
                            {
                                rows.length > 0 ?
                            rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <StyledTableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </StyledTableCell>
                                            );
                                        })}
                                    </StyledTableRow>
                                );
                            })
                        :
                        
                            <StyledTableRow role="checkbox" tabIndex={-1} >
                                <StyledTableCell colSpan="4" style={{textAlign: 'center'}}>
                                    No record available
                                </StyledTableCell>
                            </StyledTableRow>
                        
                        }
                            
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </section>
    );
}
