import React from 'react';
import SkyLight from 'react-skylight';

class AddCustomer extends React.Component {
  constructor(props) {
      super(props);
      this.state = {firstname: '', lastname: '',  streetaddress: '', postcode: '', city: '', email: '', phone: ''};
  }

  handleChange = (event) => {
      this.setState(
          {[event.target.name]: event.target.value}
      );
  }    
  
  // Save customers and load customers and finally close modal
  handleSubmit = (event) => {
      event.preventDefault();
      var newCustomer = {firstname: this.state.firstname, lastname: this.state.lastname, streetaddress: this.state.streetaddress, postcode: this.state.postcode, city: this.state.city};
      this.props.addCustomer(newCustomer);    
      this.props.loadCustomer();
      this.refs.simpleDialog.hide();    
  }
  
  render() {
    // Add customers page doesn't fit to default size modal
    const addCustomerDialog = {
      width: '70%',
      height: '450px',
      marginTop: '-300px',
      marginLeft: '-35%',
    };

    return (
      <div>
        <SkyLight dialogStyles={addCustomerDialog} hideOnOverlayClicked ref="simpleDialog">
              <div className="card" style={{"width": "95%"}}>
              <div className="card-body">
              <h5 className="card-title">New customers</h5>
              <form>
                  <div className="form-group">
                      <input type="text" placeholder="firstname" className="form-control" name="firstname" onChange={this.handleChange}/>    
                  </div>
                  <div className="form-group">       
                      <input type="text" placeholder="lastname" className="form-control" name="lastname" onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                      <input type="text" placeholder="streetaddress" className="form-control" name="streetaddress" onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                      <input type="text" placeholder="postcode" className="form-control" name="postcode" onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                      <input type="text" placeholder="city" className="form-control" name="city" onChange={this.handleChange}/>
                  </div>

                  <div className="form-group">
                      <button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>   
                  </div>       
              </form>
              </div>      
              </div>
        </SkyLight>
        <div className="col-md-2">
            <button style={{'margin': '10px'}} className="btn btn-primary" onClick={() => this.refs.simpleDialog.show()}>New customers</button>
        </div>
      </div>   
    );
  }
}

export default AddCustomer;
