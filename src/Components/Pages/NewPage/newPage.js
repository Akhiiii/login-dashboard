import React from 'react';
import { connect } from 'react-redux';
import {Form, InputNumber,Button,Icon,Card,Modal,DatePicker,Table,Popconfirm,notification} from 'antd';
import Clock from 'react-live-clock';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {getDashboard_Counts,Post_At_start,remove_stock,getStocksData,getAllStocks,generate_access_token,Add_stocks,getTransaction_history, TRANSACTION_HISTORY} from './action';
import Select from "react-virtualized-select";
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import './react-select.css'

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

const { Meta } = Card;
var count = 0;
const message = (msg,type) => {
	notification[type]({
	  message: msg,
	});
  };
var newTransaction_Data = [];
const columns = [{
    title: 'Date',
    dataIndex: 'created_at' ,
  }, {
    title: 'Amount',
    dataIndex: 'amount',
  }, {
    title: 'Profit/Loss',
    dataIndex: 'profit_or_lose',
  },
  {
    title: 'Total',
    dataIndex: 'total',
  }
];
 
  const menu = (
    <Link style={{color:"black",marginLeft:'10px'}} to={`/login`} title="Logout"> Log out </Link>
    
  );

class NewPage extends React.Component{

    state = { visible: false,Dashboard_Data:[] ,maxAmount: 5,Transaction_Data:[],request_token:'',StocksData:[], columns: this.stockcolumns,AllStocks:[],
              clearable: true,
              visible: false,
              disabled: false,
              githubUsers: [],
              multi: false,
              searchable: true,
              selectedCreatable: null,
              item: null,
              table1 : true,
              table2: false,
            }

    showModal = () => {
        this.setState({
          visible: true,
          
        });
      }

    hideModal = () => {
      this.setState({
        visible: false,
        });
      if(this.state.item != null){
        var temp = [];
        for(var i = 0;i<1;i++){
            temp[i] = this.state.item.split(',');
          }
        const l = temp[0].length;
        var stocks = [];
        for(var i = 0;i<l;i++){
          stocks[i] = {name : temp[0][i]};
        }
        this.props.Add_stocks(stocks);
        this.setState({item:null})
      }
    }

    handleOk = (e) => {
      this.setState({
        visible: false,
      });
      }

    handleCancel = (e) => {
      this.setState({
        visible: false,
      });
    }

    componentWillReceiveProps(nextProps) {      
      if (nextProps.Dashboard_Data !== undefined ){
        this.setState({Dashboard_Data : nextProps.Dashboard_Data,maxAmount: nextProps.Dashboard_Data.available_cash
        });
      }
      if (nextProps.StocksData !== undefined ){
        this.setState({StocksData : nextProps.StocksData,
        }) ;
      }
      if (nextProps.Transaction_Data !== undefined ){
        const temp = nextProps.Transaction_Data;
        const len = nextProps.Transaction_Data.length;
        for(var i = 0;i<len;i++){
          if( count <= len ){
            temp[i].created_at = moment(temp[i].created_at).format('MM/DD/YYYY');
            count++;
          }
        }
        this.setState({Transaction_Data : temp}) ;
      }
      if (nextProps.AllStock !== undefined ){
        this.setState({AllStocks : nextProps.AllStock }) ;
      }
    }

    handleCreate = () => {
      const form = this.formRef.props.form;
      form.validateFields((err, values) => {
      if (err) {
        return;
      }
      var stocks = [];
      const len = values.select.length;
      for(var i = 0;i<len;i++){
        const name = values.select[i].label;
        stocks.push({name: name});
      }
      this.props.Add_stocks(stocks);
      form.resetFields();
      this.setState({ visible: false }); });
    }

    componentWillUpdate(){
      if(sessionStorage.getItem('jwtToken')== null){
        this.props.history.push('/login');
      }
      if(this.state.request_token != ""){
        this.props.generate_access_token(this.state.request_token);
      }
    }

    componentDidMount(){
      this.props.getDashboard_Counts();
      this.props.getTransaction_history(); 
      this.props.getStocksData(); 
      this.props.getAllStocks();
      var str=this.props.location.search;
      console.log(str);
      let res = str.split("&");
      console.log(res);
      if(res.length==3){
          let out = res[0].split("=");
          console.log(res[0]);
          var request_token = out[1];
          console.log(request_token);
          this.setState({request_token:request_token})
      }
    }
    onChange=( date,dateString) =>{
      var from = moment(dateString[0]).toDate();
      var to = moment(dateString[1]).toDate();
    
      from = new Date(from);
      to = new Date(to);
      const Transaction_Data =  this.state.Transaction_Data;
      console.log(Transaction_Data);
      newTransaction_Data = [];
      for(var i = 0;i<Transaction_Data.length;i++){
        const date = new Date (Transaction_Data[i].created_at );
        console.log(date-from);
        if(date >= from && date <= to ){
          console.log(date,">=",from);
          newTransaction_Data.push(Transaction_Data[i]);
        }
      }
      this.setState({table1: false,table2:true});
    }

    deleteConfirm=(values)=> {
      console.log(values)
      this.props.remove_stock(values.id);    
      message(" Record is successfully Deleted...!",'success');
      }
      
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.props.Post_At_start(values.amt);
          this.props.form.resetFields();
        }
        else{
          console.log('error');
        }
      });
    }

    confirm = (e) =>{
      console.log(e);
      this.props.history.push('/login');
      
    
      // message.success('Click on Yes');
    }
    

    render(){
        const { getFieldDecorator} = this.props.form;
        
        console.log(this.state.Transaction_Data);
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          };
          const stockcolumns = [{
            title: 'Stocks',
            dataIndex: 'name',
            width: 200,
          },{
            title: 'Actions',
            width: 100,
            render: item => (
              <div>
                <Popconfirm
                  title="are you sure?"
                   onConfirm={() => this.deleteConfirm(item, 'success')}
                  okText="Ok"
                  cancelText="Cancel"
                  placement="topRight"
                >
                  <Icon type="delete"  />
                </Popconfirm>
              </div>
            ),
          },
        
        ];
        
        console.log(this.state.AllStocks);
        return(
            <div style={{height:'720px',background:'#fff',marginTop:'0px'}}>
                <Form onSubmit= {this.handleSubmit} style={{background:'#fff',marginTop:'0px'}} >  
                    <div style={{display:'flex',background:'#fff',marginTop:'0px',height:'100px'}}>              
                        <img style={{marginLeft:'380px',width:'30px',height:'30px',marginTop:'40px'}} src={require('../../Images/calendar.png')}  /><span style= {{marginLeft:'10px',marginTop:'0px'}} ><h3 style={{marginTop:'40px',marginLeft:'10px'}}>{moment().format('DD MMM, YYYY')}</h3></span>
                        <img style={{marginLeft:'20px',width:'30px',height:'30px',marginTop:'40px'}} src={require('../../Images/time.png')}  /> <Clock
                            style={{fontSize: '30px',marginLeft:'10px',marginTop:'30px'}}
                            format={'h:mm a'}
                            ticking={true} />
                        <a style={{marginLeft:'260px',marginTop:'40px'}} href="https://kite.trade/connect/login?v=3&api_key=amsrlo2wn3n4dj5l"><Button   type="primary">Connect</Button></a>
                        <Button onClick={this.showModal}  style={{marginLeft:'30px',marginTop:'44px',fontSize:'15px'}}  shape="circle" icon="plus" size="small">
                        </Button>
                        <div>
                          <Modal
                            title="Stocks"
                            visible={this.state.visible}
                            onOk={this.hideModal}
                            onCancel={this.hideModal}
                            okText="Create"
                            cancelText="Cancel"
                          >
                            <Select
                              autofocus
                              clearable={this.state.clearable}
                              disabled={this.state.disabled}
                              labelKey='name'
                              multi={!this.state.multi}
                              onChange={(item) => this.setState({item })}
                              options={this.state.AllStocks}
                              searchable={this.state.searchable}
                              simpleValue
                              value={this.state.item}
                              valueKey='name'
                            />
                          </Modal>
                          </div>
                       
                        <Popconfirm title="Log out?" onConfirm={this.confirm}  okText="Yes" cancelText="No">
                          <Icon style={{ marginTop:'40px',marginLeft:'85px',fontSize:'20px' }}  type="poweroff" />
                        </Popconfirm>,
                           
                    </div>
                    <div style={{display:'flex'}}>
                    <div>
                        <div style={{border:'solid 1px #EFEFEF',display:'flex'}}>
                            <Card
                                style={{ width: 350,marginLeft:'50px',marginTop:'20px' }}>
                                <Meta
                                    avatar={<img src={require('../../Images/profit.png')}  />}
                                    title="Profit/Loss"
                                    description={<div style={{display:'flex'}}> <span style={{color:'#0BC29F',marginLeft:'0px',fontSize:'20px'}}><img style={{marginLeft:'0px',width:'10px',}} src={require('../../Images/Rsg.png')}  /><b> {this.state.Dashboard_Data.profit_lose}</b></span></div> 
                               }
                              />                              
                            </Card>
                            <Card
                                style={{ width: 350, marginLeft:'50px',marginTop:'20px'  }}>
                                <Meta
                                    avatar={<img src={require('../../Images/Pincipal.png')}  />}
                                    title="Principle"
                                    description={<div style={{display:'flex'}}> <span style={{color:'#337AB7',marginLeft:'0px',fontSize:'20px'}}><img style={{marginLeft:'0px',width:'10px',}} src={require('../../Images/Rsb.png')}  /><b> {this.state.Dashboard_Data.principal_amount}</b></span></div> }

                                />
                            </Card>
                        </div>
                        <Card style={{ width: 790, marginLeft:'50px',marginTop:'20px' }}>
                            <div style={{display:'flex'}}><span style={{marginLeft:'0px'}}>Your Account Balance <span style={{color:'#337AB7',marginLeft:'0px',fontSize:'30px'}}><img style={{marginLeft:'10px',width:'10px',}} src={require('../../Images/RSb.png')}  /><b> {this.state.Dashboard_Data.available_cash}</b></span></span> 
                                <div style={{marginLeft:'50px',marginTop:'0px'}}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="Enter to Amount"
                    
                                    >
                                        {getFieldDecorator('amt', {
                                            rules: [ 
                                                {required: true, message: 'Please input Enter to Amount',
                                                }],
                                            })(
                                           
                                            <InputNumber style={{width:'200px',marginLeft:'20px'}}
                                              min={0}
                                              max={this.state.maxAmount}
                                              formatter={value => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            />
                                        )}
                                    </FormItem>
                                </div>  
                                <FormItem style={{marginLeft:'10px'}}>
                                    <Button htmlType="submit"  type="primary">Start</Button>
                                </FormItem> 
                            </div>
                        </Card>
                        <Card style={{ width: 790, marginLeft:'50px',marginTop:'20px' }}>
                            <div style={{marginLeft:'50px',marginTop:'0px',display:'flex'}}>
                                <FormItem
                                    {...formItemLayout}
                                    label="From/To">
                                    {getFieldDecorator('from/to', {
                       
                                        })(
                                        
                                        <RangePicker onChange={this.onChange} />
                                    )}
                                </FormItem>
                               
                            </div> 
                            {this.state.table1 && <Table columns={columns} dataSource={this.state.Transaction_Data}  /> }
                            {this.state.table2 && <Table columns={columns} dataSource={newTransaction_Data}  /> }
                
                        </Card>
                    </div>
                    <div>
                        <Card style={{marginLeft:'50px'}}>
                            <Meta
                                title="Stocks"
                                style={{borderBottom:'1px solid #838383',borderBottomStyle:'dotted'}}
                            />
                            <Table style={{marginTop:'20px'}} columns={stockcolumns} dataSource={this.state.StocksData} size="small"  pagination={{ pageSize: 5 }}  /> 
                        </Card>
                    </div>
                </div>
            </Form>
            <div>
      </div>
        </div>
        );
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        getDashboard_Counts: ()=>{dispatch(getDashboard_Counts())},
        getTransaction_history: ()=>{dispatch(getTransaction_history())},
        getStocksData: ()=>{dispatch(getStocksData())},
        getAllStocks : ()=>{dispatch(getAllStocks())},
        generate_access_token : (values)=>{dispatch(generate_access_token(values))},
        Add_stocks : (values) =>{dispatch(Add_stocks(values))},
        Post_At_start : (amt) =>{dispatch(Post_At_start(amt))},
        remove_stock : (id) => {dispatch(remove_stock(id))}
    }
  }

const mapStateToProps=(state)=> {
    return {
       Dashboard_Data:state.Dashboard_CountsReducer,
       Transaction_Data: state.Transaction_historyReducer,
       StocksData:state.GetStocksDataReducer,
       AllStock:state.allStocksListReducer,
       enableReinitialize: true,
    }  
}

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(NewPage));
