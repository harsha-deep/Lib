import React from 'react'
import {Form} from 'antd';
import Button from "../../components/Button";
import {Link} from "react-router-dom";
function Register(){
    const onFinish=(values)=>{console.log("Success",values)};
    return(
        <div className="h_screen bg_primary flex items-center justify-center">
            <div className="authentication_form bg_white p_3">
                <h1 className="text_secondary text_xxl">
                    Library-Register
                </h1>
                <hr/>
                <Form layout='vertical' onFinish={onFinish} >
                    <Form.Item label='Name' name='name'>
                        <input type='text' placeholder='Name'></input>
                    </Form.Item>

                    <Form.Item label='Email' name='email'>
                        <input type='email' placeholder='Email'></input>
                    </Form.Item>

                    <Form.Item label='Password' name='password'>
                        <input type='password' placeholder='Password'></input>
                    </Form.Item>
                    <Button title="Register" type="submit" color="secondary" variant="outlined" />
                    <div className="text_center mt_2">
                        <Link to="/login"  className="text_primary">Already have an account?</Link>
                    </div>
                </Form>
            </div>
        </div>
    )
}
export default Register