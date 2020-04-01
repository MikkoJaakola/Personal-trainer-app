import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';



export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = React.useState(false);

    

    useEffect(() => fetchData() , []);

    const handleClick = () => {
        setOpen(true);
      };

      const snackClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        
    }

    const deleteTraining = (link) => {

        if (window.confirm('Are you sure you want to delete')) {
        fetch(link, {method: 'DELETE'})
        .then(res => fetchData())
        .catch(err => console.error(err))
        handleClick()
   }
}




    const columns = [
        {
            Header: 'Date',
            accessor: 'date',
            Cell: row => (
                <div>{moment(row.original.date).format("DD/MM/YYYY")} <div>
                    {moment(row.original.date).format("HH:mm")}</div></div>
                )
           
            
        },
        {
            Header: 'Duration',
            accessor: 'duration'
        },
        {
            Header: 'Activity',
            accessor: 'activity'
        },
        {
            Header: 'Customer',
            accessor: 'customer',
            Cell: row => (
                <div>
                  {row.original.customer.firstname} {row.original.customer.lastname}
                </div>
              )
            
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: '',
            Cell: row => <Button color="secondary" onClick={() => 
            deleteTraining(`https://customerrest.herokuapp.com/api/trainings/${row.original.id}`)}>
                Delete</Button>
        }


    ]




    return (
        <div>
            <ReactTable filterable={true} data={trainings} columns={columns} />
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                open={open}
                autoHideDuration={6000}
                onClose={snackClose}
                message="Training deleted"
                action={
            <React.Fragment>
                <Button color="secondary" size="small" onClick={snackClose}>
                    CLOSE
                </Button>
            </React.Fragment>
                }
                />
        </div>
        
    );
}