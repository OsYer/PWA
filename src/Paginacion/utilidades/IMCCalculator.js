import React, { useState } from 'react';
import Chart from 'chart.js/auto';

import Header from "../../Esquema/Header.js";
import Footer from "../../Esquema/Footer";

function IMCCalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [initialIMC, setInitialIMC] = useState('');
  const [currentIMC, setCurrentIMC] = useState('');
  const [targetIMC, setTargetIMC] = useState('');
  const [weeksToReachTarget, setWeeksToReachTarget] = useState(null);
  const [week1Date, setWeek1Date] = useState('');
  const [week2Date, setWeek2Date] = useState('');
  const [calculationSteps, setCalculationSteps] = useState([]);
  const [imcData, setIMCData] = useState([]);

  const calculateBMI = () => {
    const heightMeters = height / 100;
    const bmi = weight / (heightMeters * heightMeters);
    if (bmi >= 25) {
      setInitialIMC(bmi);
      setWeek1Date(new Date().toISOString().substr(0, 10));
      const dateWeek1 = new Date();
      const dateWeek2 = new Date(dateWeek1.getTime() + 7 * 24 * 60 * 60 * 1000); // Agregar 7 días en milisegundos
      setWeek2Date(dateWeek2.toISOString().substr(0, 10));
      setCurrentIMC(bmi);
    }
  };

  const calculateWeeksToReachTarget = () => {
    const steps = [];

    // Paso 6. Encontrar la proporcionalidad (K)
    const k = Math.log(currentIMC / initialIMC) / 2;
    steps.push(`Paso 6. K: ${k.toFixed(4)}`);

    // Paso 7. Encontrar las incógnitas (t)

    const exp = Math.exp(k.toFixed(4));
    console.log("exp", exp.toFixed(6)); // Este será el resultado de e^0.133531


    console.log(`(${targetIMC} / ${initialIMC}) / ${k}`)
    const a = Math.log(targetIMC / initialIMC);
    console.log(a.toFixed(6))

    const b = Math.log(targetIMC / (initialIMC / exp.toFixed(6)));
    console.log("b", b.toFixed(6))

    const c = b.toFixed(6) / k.toFixed(4);
    console.log("c", c.toFixed(5))

    const t = Math.log(targetIMC / initialIMC) / k.toFixed(4);
    console.log(`Paso 7. t: ${t.toFixed(4)}`)
    steps.push(`Paso 7. t: ${c.toFixed(5)}`);

    setWeeksToReachTarget(t);
    setCalculationSteps(steps);

    // Calcular IMC para cada semana
    const imcDataArray = [];
    let currentWeek = 1;
    let currentIMCValue = initialIMC;
    while (currentIMCValue > targetIMC) {
      imcDataArray.push({ week: currentWeek, imc: currentIMCValue });
      currentWeek++;
      currentIMCValue = initialIMC * Math.exp(k * currentWeek);
    }
    imcDataArray.push({ week: currentWeek, imc: targetIMC }); // Agregar el IMC objetivo
    setIMCData(imcDataArray);
  };

  const handleCalculateClick = () => {
    calculateWeeksToReachTarget();
  };

  const generateChart = () => {
    const ctx = document.getElementById('imcChart');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: imcData.map(data => `Semana ${data.week}`),
        datasets: [{
          label: 'IMC',
          data: imcData.map(data => data.imc),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  return (
    <>
      <Header />
      <div className='content-height container my-5'>
        <div className="container my-5">
          <h2 className="text-center mb-4">Calculadora de pérdida de peso para alcanzar IMC normal</h2>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="height">Altura (cm):</label>
                <input
                  type="number"
                  id="height"
                  className="form-control"
                  value={height}
                  onChange={(e) => setHeight(parseFloat(e.target.value))}
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="weight">Peso (kg):</label>
                <input
                  type="number"
                  id="weight"
                  className="form-control"
                  value={weight}
                  onChange={(e) => setWeight(parseFloat(e.target.value))}
                />
              </div>
              <button className="btn btn-primary my-3" onClick={calculateBMI}>Calcular IMC</button>
            </div>
            <div className="col-md-6">
              {initialIMC !== '' && (
                <div>
                  <div className="form-group">
                    <label htmlFor="week1Date">Fecha de la semana 1:</label>
                    <input
                      type="date"
                      id="week1Date"
                      className="form-control"
                      value={week1Date}
                      onChange={(e) => setWeek1Date(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="week2Date">Fecha de la semana 2:</label>
                    <input
                      type="date"
                      id="week2Date"
                      className="form-control"
                      value={week2Date}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="currentIMC">IMC en la semana 1:</label>
                    <input
                      type="number"
                      id="currentIMC"
                      className="form-control"
                      value={initialIMC}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="currentIMC">IMC en la semana 2:</label>
                    <input
                      type="number"
                      id="currentIMC"
                      className="form-control"
                      value={currentIMC}
                      onChange={(e) => setCurrentIMC(parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="targetIMC">IMC objetivo:</label>
                    <input
                      type="number"
                      id="targetIMC"
                      className="form-control"
                      value={targetIMC}
                      onChange={(e) => setTargetIMC(parseFloat(e.target.value))}
                    />
                  </div>
                  <button className="btn btn-primary" onClick={handleCalculateClick}>Calcular semanas</button>
                </div>
              )}
            </div>
          </div>
          {weeksToReachTarget !== null && (
            <div className="mt-4">
              <p className="text-center">El cliente llegará a un IMC normal en aproximadamente {weeksToReachTarget.toFixed(2)} semanas.</p>
              <h3 className="text-center">Pasos de cálculo:</h3>
              <ul className="list-group">
                {calculationSteps.map((step, index) => (
                  <li key={index} className="list-group-item">{step}</li>
                ))}
              </ul>
              <div className="mt-4">
                <canvas id="imcChart" width="200" height="200"></canvas>
                <button className="btn btn-primary mt-3" onClick={generateChart}>Generar Gráfico</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>

  );
}

export default IMCCalculator;
