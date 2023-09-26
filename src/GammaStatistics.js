import React, { useEffect, useState } from 'react';
import { mean, median, mode } from 'simple-statistics';
import './App.css';

const GammaStatistics = ({ data }) => {
  const [classData, setClassData] = useState({});

  useEffect(() => {
    // Calculation of "Gamma" and class-wise statistics
    const dataWithGamma = calculateGamma(data);
    const classData = calculateClassStatistics(dataWithGamma);
    setClassData(classData);
  }, [data]);

  const calculateGamma = (data) => {
    return data.map((item) => ({
      ...item,
      Gamma: (item.Ash * item.Hue) / item.Magnesium,
    }));
  };

  const calculateClassStatistics = (data) => {
    const classData = {};

    data.forEach((item) => {
      const { Gama, Gamma } = item;

      if (!classData[Gama]) {
        classData[Gama] = {
          mean: [],
          median: [],
          mode: [],
        };
      }

      classData[Gama].mean.push(Gamma);
      classData[Gama].median.push(Gamma);
      classData[Gama].mode.push(Gamma);
    });

    // Calculation of  the mean, median, and mode for each class
    for (const className in classData) {
      classData[className].mean = mean(classData[className].mean);
      classData[className].median = median(classData[className].median);
      classData[className].mode = mode(classData[className].mode);
    }

    return classData;
  };

  
  const classNames = Object.keys(classData);

  // Creating rows for Mean, Median, and Mode
  const tableRows = ['Mean', 'Median', 'Mode'].map((measure) => (
    <tr key={measure}>
      <td>{measure} Gamma</td>
      {classNames.map((className) => (
        <td key={className}>
          {classData[className][measure.toLowerCase()].toFixed(3)}
        </td>
      ))}
    </tr>
  ));

  return (
    <div>
      <h1>Class-wise Gamma Statistics</h1>
      <table>
        <thead>
          <tr>
            <th>Measure</th>
            {classNames.map((className) => (
              <th key={className}>Class {className}</th>
            ))}
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
};

export default GammaStatistics;
