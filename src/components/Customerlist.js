import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';

export default function Customerlist() {
    const [customers, setCustomers] = useState([]);
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
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    }


   const deleteCustomer = (link) => {

        if (window.confirm('Are you sure you want to delete')) {
        fetch(link, {method: 'DELETE'})
        .then(res => fetchData())
        .catch(err => console.error(err))
        handleClick()
   }

}
    

    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
    })
        .then(res => fetchData())
        .catch(err => console.error(err) )
    }

    const saveTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify(training)
    })
        .then(res => fetchData())
        .catch(err => console.error(err) )
    }

    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        }
            )
        .then(res => fetchData())
        .catch(err => console.error(err))
    
    }

    const columns = [
        {
            width: 100,
            Header: 'Firstname',
            accessor: 'firstname'
        },
        {
            width: 100,
            Header: 'Lastname',
            accessor: 'lastname'
        },
        {
            Header: 'Address',
            accessor: 'streetaddress'
        },
        {
            width: 75,
            Header: 'Postcode',
            accessor: 'postcode'
        },
        {
            width: 100,
            Header: 'City',
            accessor: 'city'
        },
        {
            Header: 'Email',
            accessor: 'email'
        }, {
            width: 150,
            Header: 'Phone',
            accessor: 'phone'
        },
        {
            sortable: false,
            filterable: false,
            width: 125,
            Cell: row => <AddTraining saveTraining={saveTraining} customer={row.original} />            
        },
        {
            sortable: false,
            filterable: false,
            width: 75,
            Cell: row => <EditCustomer updateCustomer={updateCustomer} customer={row.original} />            
        },
        {
            sortable: false,
            filterable: false,
            width: 50,
            accessor: 'links.0.href',
            Cell: row => <IconButton aria-label="delete" color="secondary" 
            onClick={() => deleteCustomer(row.value)}>
                <DeleteIcon />
            </IconButton>
        }
    ]




    return (
        <div>
            
            <AddCustomer saveCustomer={saveCustomer} />
            <ReactTable filterable={true} data={customers} columns={columns} />
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                open={open}
                autoHideDuration={6000}
                onClose={snackClose}
                message="Customer deleted"
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