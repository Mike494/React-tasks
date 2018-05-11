import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css' 
import { ToastContainer, toast } from 'react-toastify';
import {CSVLink, CSVDownload} from 'react-csv';
import AddCustomer from './AddCustomer';

class Customerlist extends Component {
  state = { customers: [] };

  componentDidMount() {
    this.loadCustomers();
  }
  
  // Load customers from REST API
  loadCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then((response) => response.json()) 
    .then((responseData) => { 
      this.setState({ 
        customers: responseData._embedded.customers,
      }); 
    })   
  }

  // Delete customers
  onDelClick = (idLink) => {
    confirmAlert({
      title: '',
      message: 'Are you sure you want to delete this?',
      confirmLabel: 'OK',
      cancelLabel: 'CANCEL',                            
      onConfirm: () => {
        fetch(idLink, {method: 'DELETE'})
        .then(res => this.loadCustomers())
        .catch(err => console.error(err)) 

        toast.success("Delete succeed", {
          position: toast.POSITION.BOTTOM_LEFT
        });        
      }
    })   
  }

  // Create new customers
  AddCustomer(customers) {
    fetch('https://customerrest.herokuapp.com/api/customers', 
    {   method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customers)
    })
    .then(res => this.loadCustomers())
    .catch(err => console.error(err))
  }

    // Update customers
  updateCustomer(customers, link) {
    fetch(link, 
    { method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customers)
    })
    .then(
      toast.success("Changes saved", {
        position: toast.POSITION.BOTTOM_LEFT
      })         
    )
    .catch( err => console.error(err))
  }

  renderEditable = (cellInfo) => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.customers];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ customers: data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.customers[cellInfo.index][cellInfo.column.id]
        }}                
      />
    );
  }  

  render() {
    return (
      <div className="App-body">
      <div className="row">
        <AddCustomer AddCustomer={this.AddCustomer} loadCustomers={this.loadCustomers} />
        <CSVLink style={{padding: 20}} data={this.state.customers}>Download CSV</CSVLink>
        </div>
        <ReactTable data={this.state.customers}
        columns={[
            {
              columns: [
                {
                  accessor: "_links.self.href",
                  show: false
                },
                {
                  Header: "Firstname",
                  accessor: "firstname",
                  Cell: this.renderEditable
                },
                {
                  Header: "Lastname",
                  accessor: "lastname",
                  Cell: this.renderEditable
                },
                {
                  Header: "Streetaddress",
                  accessor: "streetaddress",
                  Cell: this.renderEditable
                },
                {
                  Header: "Postcode",
                  accessor: "postcode",
                  Cell: this.renderEditable
                },
                {
                  Header: "City",
                  accessor: "city",
                  Cell: this.renderEditable
                },
                {
                  Header: "Email",
                  accessor: "email",
                  Cell: this.renderEditable
                },
                {
                  id: 'button',
                  sortable: false,
                  filterable: false,
                  width: 100,
                  accessor: '_links.self.href',
                  Cell: ({value, row}) => (<button className="btn btn-default btn-link" onClick={()=>{this.updateCar(row, value)}}>Save</button>)
                },              
                {
                  id: 'button',
                  sortable: false,
                  filterable: false,
                  width: 100,
                  accessor: '_links.self.href',
                  Cell: ({value}) => (<button className="btn btn-default btn-link" onClick={()=>{this.onDelClick(value)}}>Delete</button>)
                }              
              ]
            }
          ]}
          filterable
          className="-highlight" > 
        </ReactTable>
        <ToastContainer autoClose={2000}/>
      </div>
    );
  }
}

export default Customerlist;