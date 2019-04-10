import React, { Component } from 'react'

import { Consumer } from '../../Context';

import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

class EditContact extends Component {

    state = {
        name: '',
        email: '',
        phone: '',
        errors: {}
    }


async componentDidMount(){
    const { id } = this.props.match.params;
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`) 
    const contact = res.data;
    this.setState({
        name:contact.name,
        email:contact.email,
        phone:contact.phone

    })
}



// componentDidMount(){
//     const {id}=this.props.match.params;

//     fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
//     .then(res=>res.json())
//     .then(data=>{

//      this.setState({
//          name:data.name,
//          email:data.email,
//          phone:data.phone,
//      })

//     })
// }



    onChange = (e) => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = async (dispatch, e) => {
        e.preventDefault()
        console.log(this.state);
        const { name, email, phone, errors } = this.state;

        // check for errors
        if (name === '') {
            this.setState({
                errors: { name: "name is required" }
            });
            return
        }

        if (email === '') {
            this.setState({
                errors: { email: "name is required" }
            });
            return
        }

        if (phone === '') {
            this.setState({
                errors: { phone: "name is required" }
            });
            return
        }


        const updContact={
            name,
            email,
            phone
        }

        const {id} = this.props.match.params;

        const res = await axios.put(`https:jsonplaceholder.typicode.com/users/${id}`,updContact);

        dispatch({type:'UPDATE_CONTACT',payload:res.data})


        this.setState({
            name: '',
            email: '',
            phone: '',
            errors: {}
        });

        this.props.history.push('/');


    }




    render() {
        const { name, email, phone, errors } = this.state;




        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (

                        <div className="card mb-3">
                            <div className="card-header">Edit contact</div>
                            <div className="card-body">
                                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                                    <TextInputGroup
                                        label="name"
                                        name='name'
                                        placeholder="enter name"
                                        value={name}
                                        onChange={this.onChange}
                                        error={errors.name}
                                    />

                                    <TextInputGroup
                                        label="email"
                                        name='email'
                                        type="email"
                                        placeholder="enter email"
                                        value={email}
                                        onChange={this.onChange}
                                        error={errors.email}
                                    />

                                    <TextInputGroup
                                        label="phone"
                                        name='phone'
                                        placeholder="enter phone"
                                        value={phone}
                                        onChange={this.onChange}
                                        error={errors.phone}
                                    />


                                    <input type="submit"
                                        value="Update Contact"
                                        className="btn btn-block btn-primary"
                                    />
                                </form>
                            </div>
                        </div>

                    )
                }}
            </Consumer>
        )


    }
}

export default EditContact;