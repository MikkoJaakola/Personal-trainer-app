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

    const deleteTraining = (link) => {
        fetch(link, {method: 'DELETE'})
        .then(res => fetchData())
        .catch(err => console.error(err))
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
        {
            accessor: '',
            Cell: row => <button onClick={() => 
            deleteTraining(`https://customerrest.herokuapp.com/api/trainings/${row.original.id}`)}>
                Delete</button>
        }


    ]




    return (
        <div>
            <ReactTable filterable={true} data={trainings} columns={columns} />
        </div>
        
    );
}