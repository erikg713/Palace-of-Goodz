import React from 'react';

const Contact: React.FC = () => {
  return (
    <div>
      <h1>Contact Us</h1>
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
    </div>
  );
};

export default Contact;
