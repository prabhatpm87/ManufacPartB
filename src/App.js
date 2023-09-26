import React, { useState } from 'react';
import GammaStatistics from './GammaStatistics';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    Ash: '',
    Hue: '',
    Magnesium: '',
    Gama: '',
  });

  const [data, setData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData([...data, formData]);
    setFormData({
      Ash: '',
      Hue: '',
      Magnesium: '',
      Gama: '',
    });
  };

  return (
    <div className="App">
      <h1>Enter Data</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Ash:
          <input
            type="number"
            name="Ash"
            value={formData.Ash}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Hue:
          <input
            type="number"
            name="Hue"
            value={formData.Hue}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Magnesium:
          <input
            type="number"
            name="Magnesium"
            value={formData.Magnesium}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Gama:
          <input
            type="text"
            name="Gama"
            value={formData.Gama}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Add Data</button>
      </form>

      <GammaStatistics data={data} />
    </div>
  );
}

export default App;
