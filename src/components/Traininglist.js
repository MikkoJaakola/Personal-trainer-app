import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';



export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);

    

    useEffect(() => fetchData() , []);
    

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        
    }

    



    const columns = [
        {
            Header: 'Date',
            accessor: 'date',
           
            
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


    ]




    return (
        <div>
            <ReactTable filterable={true} data={trainings} columns={columns} />
        </div>
        
    );
}