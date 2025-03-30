import React from 'react';
import './Form.css';

const Form: React.FC = () => {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
      </div>
      <button type="submit" className="button">Submit</button>
    </form>
  );
};

export default Form;
