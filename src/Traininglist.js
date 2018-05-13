import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css' 
import { ToastContainer, toast } from 'react-toastify';
import {CSVLink, CSVDownload} from 'react-csv';
import AddTraining from './AddTraining';


class Traininglist extends Component {
  state = { trainings: [] };

  componentDidMount() {
    this.loadTrainings();
  }
  
  // Load Training from REST API
  loadTrainings = () => {
    fetch('https://customerrest.herokuapp.com/api/trainings')
    .then((response) => response.json()) 
    .then((responseData) => { 
      this.setState({ 
        trainings: responseData.content,
      }); 
    })   
  }

  // Delete Training
  onDelClick = (idLink) => {
    confirmAlert({
      title: '',
      message: 'Are you sure you want to delete this?',
      confirmLabel: 'OK',
      cancelLabel: 'CANCEL',                            
      onConfirm: () => {
        fetch(idLink, {method: 'DELETE'})
        .then(res => this.loadTrainings())
        .catch(err => console.error(err)) 

        toast.success("Delete succeed", {
          position: toast.POSITION.BOTTOM_LEFT
        });        
      }
    })   
  }

  // Create new Training
  AddTraining(trainings) {
    fetch('https://customerrest.herokuapp.com/api/trainings', 
    {   method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trainings)
    })
    .then(res => this.loadTrainings())
    .catch(err => console.error(err))
  }

    // Update Training
  updateTraining(trainings, link) {
    fetch(link, 
    { method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trainings)
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
          const data = [...this.state.trainings];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ trainings: data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.trainings[cellInfo.index][cellInfo.column.id]
        }}                
      />
    );
  }  

  render() {
    return (
      <div className="App-body">
      <div className="row">
        <AddTraining AddTraining={this.AddTraining} loadTrainings={this.loadTrainings} />
        <CSVLink style={{padding: 20}} data={this.state.trainings}>Download CSV</CSVLink>
        </div>
        <ReactTable data={this.state.trainings}
        columns={[
            {
              columns: [
                {
                  accessor: "_links.self.href",
                  show: false
                },
                {
                  Header: "Date",
                  accessor: "date",
                  Cell: this.renderEditable
                },
                {
                  Header: "Duration",
                  accessor: "duration",
                  Cell: this.renderEditable
                },
                {
                  Header: "Activity",
                  accessor: "activity",
                  Cell: this.renderEditable
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

export default Traininglist;