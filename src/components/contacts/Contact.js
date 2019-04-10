import React, {Component} from 'react';

import axios from 'axios';
import propTypes from 'prop-types';
import {Consumer} from '../../Context';
import {Link} from 'react-router-dom';

class Contact extends Component{

state={
 ShowContactInfo:false

};

onDeleteClick =async (id,dispatch)=>{

    try{
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
        dispatch({ type: 'DELETE_CONTACT', payload: id })
    }catch(e){

        dispatch({ type: 'DELETE_CONTACT', payload: id })

    }
    


    console.log("clicked");
    
    
}

render(){
   const {id, name,phone,email} = this.props.contact;
    const { ShowContactInfo } = this.state;

    return(

          <Consumer>
              
              {value=>{
                  const {dispatch}=value;
                  return(
                     
                      <div className="card card-body mb-3">
                          <h4>{name}{" "}<i
                              onClick={
                                  () => this.setState({
                                      ShowContactInfo: !this.state.ShowContactInfo
                                  })
                              }
                              className="fas fa-sort-down ml-1"
                              style={{ cursor: "pointer", color: "teal" }}
                          ></i>
                              <i className="fas fa-times " style={{ cursor: "pointer", float: "right", color: "red" }}
                                  onClick={this.onDeleteClick.bind(this,id,dispatch)}
                              ></i>
                              <Link to={`contact/edit/${id}`} >
                                <i 
                                
                                className='fas fa-pencil-alt'
                                style={{
                                    cursor:'pointer',
                                    float:'right',
                                    marginRight:'1rem',
                                    
                                
                                
                                }}
                                ></i>
                              </Link>
                          </h4>

                          {
                              ShowContactInfo ?
                                  <ul className="list-group">
                                      <li className="list-group-item">Email:{email}</li>
                                      <li className="list-group-item">Phone:{phone}</li>
                                  </ul> : null
                          }

                      </div>


                  )
              }

              }
          </Consumer>





        
    )
}


}

Contact.propTypes={
    contact:propTypes.object.isRequired,
    
}

export default Contact;