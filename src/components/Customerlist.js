import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';

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
            Header: 'Firstname',
            accessor: 'firstname'
        },
        {
            Header: 'Lastname',
            accessor: 'lastname'
        },
        {
            Header: 'Address',
            accessor: 'streetaddress'
        },
        {
            Header: 'Postcode',
            accessor: 'postcode'
        },
        {
            Header: 'City',
            accessor: 'city'
        },
        {
            Header: 'Email',
            accessor: 'email'
        }, {
            Header: 'Phone',
            accessor: 'phone'
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            Cell: row => <EditCustomer updateCustomer={updateCustomer} customer={row.original} />            
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'links.0.href',
            Cell: row => <Button color="secondary" onClick={() => deleteCustomer(row.value)}>Delete</Button>
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