/* login page */
import React from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button,notification,Card} from 'antd';
import { userLogin } from './action';

const FormItem = Form.Item;

const Message = (msg,type) => {
	notification[type]({
	  message: msg,
	});
  };


class LoginPage extends React.Component {

	constructor(props) {
		super(props);
    	this.state = {
			errorMessage : ''
	    }
	}

	componentWillMount(){
		sessionStorage.removeItem('jwtToken');
	}


	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		if (!err) {
			console.log('Received values of login form: ', values);
			this.setState({errorMessage:''})
			const user = { email_id: values.email,password : values.password };
			this.props.userLogin(user).then(() =>{
			if(this.props.loginResponse.Error === false){
				Message('You are Succesfully loged in !','success')
					sessionStorage.setItem('jwtToken', this.props.loginResponse.token);
					this.props.history.push('/');
						
				}
			else
				this.setState({errorMessage:'Invalid Login Details'});
			});
			}
		});
	}
	
	render() {
		const { getFieldDecorator } = this.props.form;
		var divStyle = { color: 'red'};
		return (
		  	<Form onSubmit={this.handleSubmit} style={{marginLeft:'480px',marginTop:'10px'}}> 
			  	<h2 style={{marginLeft:'30px',color:'#362b24'}}>Please sign in</h2>             
               { this.state.errorMessage !== '' &&
	 				<div style={divStyle}>{this.state.errorMessage}</div>
				}
				<Card  style={{width:'321px',height:'285px',marginTop: '10px' }}>
                    <FormItem style={{marginTop:'20px'}}>
                        {getFieldDecorator('email', {
                        	rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                        	<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                    	<Button shape="omitted" type="primary" htmlType="submit" style={{marginTop:'0px',marginLeft:'0px',background:'#E4E4E4',borderRadius:'28px',width:'280px'}} ><div style={{color:'#1E1E1E'}}>Connect</div></Button>
                    </FormItem>
                   
                </Card>
        	</Form>
		);

	}
}

const mapStateToProps=(state)=>{ 
		return state 
};

export default Form.create()(connect(mapStateToProps,{userLogin})(LoginPage));