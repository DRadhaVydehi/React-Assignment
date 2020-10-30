import React, { Component } from 'react';
import './MailBoxComponent.css';
import Select from 'react-select';
import BootstrapTable from 'react-bootstrap-table-next';
import { CaretLeftFill, CaretRightFill} from 'react-bootstrap-icons';
import {Modal, Button, Tabs, Tab} from 'react-bootstrap';


const options = [
  { value: 'single', label: 'Single Return' },
  { value: 'multiple', label: 'Multiple Return' }
];


const reasons = [
  { value: 'single', label: 'Reason1' },
  { value: 'multiple', label: 'Reason2' },
  { value: 'single', label: 'Reason3' },
  { value: 'multiple', label: 'Reason4' }
];

const locations = [
  { value: 'single', label: 'Location1' },
  { value: 'multiple', label: 'Location2' },
  { value: 'single', label: 'Location3' }
];

const periods = [
  { value: 'single', label: 'Daily' },
  { value: 'multiple', label: 'Weekly' },
  { value: 'single', label: 'Monthly' }
];

const customStyles = {
  control: base => ({
    ...base,
    height: 30,
    minHeight: 30
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    marginTop: "-5px",
    padding: '0 8px'
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    marginTop: "-4px",
  }),
};


const columns = [{
  dataField: 'date',
  text: 'Date'
}, {
  dataField: 'postdate',
  text: 'Post Date'
}, 
{
  dataField: 'ref',
  text: 'Reference No.'
},
{
  dataField: 'amount',
  text: 'Amount'
},
{
  dataField: 'location',
  text: 'Location'
},
{
  dataField: 'status',
  text: 'Status'
}];


const products = [
  { date: "11/12/2019", postdate: "11/12/2019", ref: "ABCD1234", amount: "$100", location: "Florida", status: "Posted" },
  { date: "11/12/2019", postdate: "11/12/2019", ref: "XYZR1234", amount: "$80", location: "Florida", status: "Declined" },
  { date: "11/12/2019", postdate: "11/12/2019", ref: "QWER1234", amount: "$50", location: "Florida", status: "Posted" },
  { date: "11/12/2019", postdate: "11/12/2019", ref: "SDFG1234", amount: "$20", location: "Florida", status: "Posted" },
];

const selectRow = {
  mode: 'radio',
  clickToSelect: true
};

class MockupComponent extends Component {

  state = {
    selectedOption: null,
    selctedReason: null,
    selectedLocation: null,
    selectedPeriod: null,
    key: "returns"
  };


 expandRow = {
    renderer: row => (
      <div>
        <div className="col-lg-3">
            <label className="label"> Check No:</label>
            <input type="text" className="acct-num"/> 
           </div>
           <div className="col-lg-3">
            <label className="label">Lockbox location:</label>
            <Select className="dropdown-loc"
              value={this.state.selectedLocation}
              onChange={this.handleChange3}
              options={locations}
              styles={customStyles}
            />
           </div>
           <div className="col-lg-3">
            <label className="label">Debit amount:</label>
            <input type="text" className="acct-num"/> 
           </div>
           <div className="col-lg-3">
            <label className="label">Credit amount:</label>
            <input type="text" className="acct-num"/> 
           </div>
      </div>
    ),
    showExpandColumn: true,
    expandByColumnOnly: true,
    expandHeaderColumnRenderer: ({ isAnyExpands }) => {
      if (isAnyExpands) {
        return null;
      }
      return null;
    },
    expandColumnRenderer: ({ expanded }) => {
      if (expanded) {
        return <input type="radio" checked="checked"/>
      }
      return <input type="radio" />
    }
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  handleChange2 = selctedReason => {
    this.setState({ selctedReason });

  };

  handleChange3 = selectedLocation => {
    this.setState({ selectedLocation });
 
  };

  handleChange4 = selectedPeriod => {
    this.setState({selectedPeriod});
  };

  handleClose = () => {
    this.setState({
      showModal: false
    })

  }

  render() {

    const { selectedOption, selctedReason, showModal, selectedPeriod } = this.state;
    

    return (
      <>
      
      <div className="header"> <span className="main-heading">Returns Check</span>
      {/* <img src={window.location.origin + '/download.png'} /> */}
      <img src={process.env.PUBLIC_URL + '/download.jpg'} className="logo"/> 
      </div>

      {/* <div className="sub-heading">
      <span className="header-btn first-btn">Returns Entry</span>
        <span className="header-btn">Reports</span>

      </div> */}
      <Tabs
      id="controlled-tab-example"
      activeKey={this.state.key}
      onSelect={(k) => this.setState({key: k})}
    >
      <Tab eventKey="returns" title="Returns Entry">
      <div className="main-section">
        <div className="row field-row">
           <div className="col-lg-4">
            <label className="label">Payment Type:</label>
            <Select className="dropdown"
              value={selectedOption}
              onChange={this.handleChange}
              options={options}
              styles={customStyles}
            />
           </div>
           <div className="col-lg-4">
            <label className="label"> Reason:</label>
            <Select className="dropdown"
              value={selctedReason}
              onChange={this.handleChange2}
              options={reasons}
              styles={customStyles}
            />
           </div>
        </div>
        <div className="row field-row">
            <div className="col-lg-4">
              <label className="label">Account Number:</label>
              <input type="text" placeholder="Enter 16 digit card number" className="acct-num"/> 
            </div>
            {/* <div className="col-lg-1"> */}
              <button className="find-btn">Find</button>
            {/* </div> */}
          </div>
        <div className="table-section">

          <div className="table-header">Transactions</div>
          
          
          <BootstrapTable keyField='ref' data={ products } columns={ columns } expandRow={ this.expandRow } />
          <div className="pagination1">
            <CaretLeftFill style={{verticalAlign: "middle", color: "gray"}}/>
            <span className="page">1</span>
            <span className="page">2</span>
            <span className="page">3</span>
            <CaretRightFill style={{verticalAlign: "middle", color: "gray"}}/>
          </div>
        </div>

        <div className="row">
          
          <button className="submit-btn button" onClick={() => this.setState({showModal:true})}>Submit</button>
          <button className="cancel-btn button">Cancel</button>
        </div>
        
    </div>
    <Modal
        show={showModal}
        onHide={this.handleClose}
        backdrop="static"
        keyboard={false}
        centered
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title>Return Submit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to submit the Return?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            OK
          </Button>
          <Button variant="primary" onClick={this.handleClose}>Cancel</Button>
        </Modal.Footer>
      </Modal>
      </Tab>
      
      
      
      <Tab eventKey="report" title="Reports">
          <div className="main-section">
            <div className="report-heading">Report and Batch processing</div>
            <div className="row field-row1">
              <label className="label" style={{marginBottom: "0px"}}>Report Type:</label>
              <input type="radio" name="report" value="F" className="rad"/>
              <label className="label radio">FDR payment adjustments(Daily process and Reports)</label>

              <input type="radio" name="report" value="L" className="rad" style={{marginLeft: "30px"}}/>
              <label className="label radio">Lockbox score Report(Monthly Report)</label>
            </div>

            <div className="row">
              <div className="col-lg-3">
              <label className="label"> Period:</label>
              <Select className="dropdown"
                value={selectedPeriod}
                onChange={this.handleChange4}
                options={periods}
                styles={customStyles}
                style={{width: "90%"}}
              />
              </div>
              <div className="col-lg-2">
              <label className="label"> Date:</label>
              <input type="date" />
              </div>
              <div className="col-lg-2">
              <label className="label"> Month:</label>
              <input type="month" />
              </div>
            </div>

            <div className="row field-row1">
              <label className="label" style={{marginBottom: "0px"}}>View:</label>
              <input type="radio" name="view" value="P" className="rad"/>
              <label className="label radio">Preview</label>

              <input type="radio" name="view" value="T" className="rad" style={{marginLeft: "30px"}}/>
              <label className="label radio">Print</label>

              <input type="radio" name="view" value="C" className="rad" style={{marginLeft: "30px"}}/>
              <label className="label radio">CSV (download)</label>
            </div>

            <div className="row">
              <button className="submit-btn button">Generate</button>
              <button className="cancel-btn button">Cancel</button>
        </div>

          </div>
      </Tab>
     
    </Tabs>
      
    </>
  );

  }

  
}

export default MockupComponent;