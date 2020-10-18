import React, { Fragment, useState } from 'react';
import axios from 'axios';

export const InputTodo = () => {
  const [description, setDescription] = useState('');
  const onSubmit = async(e) => {
      try {
        e.preventDefault()
        const body = JSON.stringify({description})
        const config = {
            headers:{
                "Content-Type": "application/json"
            }
        }
        await axios.post('http://localhost:5000/todos', body, config)
        setDescription('')
        window.location = '/'
      } catch (err) {
          console.error(err.message)
      }
  }
  return (
    <Fragment>
      <h1 type="text" className="text-center mt-5">
        PERN To Do
      </h1>
      <form onSubmit={e => onSubmit(e)} className="d-flex mt-5">
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} className="form-control" />
        <button type="submit" className="btn btn-success">
          Add
        </button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
