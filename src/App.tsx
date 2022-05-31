import { useState } from 'react';
import styles from './App.module.css';
import poweredImage from './assets/powered.png';
import leftArrowImage from './assets/leftarrow.png'

import { GridItem } from './components/gridItem';

import { levels, calulateImc, Level } from './helpers/imc';


function App() {
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] =  useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);

  const handleCalculate = () =>{
    if(heightField && weightField){
      setToShow(calulateImc(heightField,weightField))
    } else{
      alert('Digite todos os campos.')
    }
  }

  const hendleBack = () =>{
    setToShow(null)
    setHeightField(0);
    setWeightField(0);
  }

  return (
    <div className={styles.main}>
      <header className={styles.headerContainer}>
        <img src={poweredImage} width="150"/>
      </header>
      <div className={styles.container}>
          <div className={styles.leftSide}>
            <h1>Calcule o seu IMC.</h1>
            <p>
              IMC é a sigala de índice de massa corpórea, parâmetro adotado pela organização mundial de saúde para calcular o peso ideal de cada poessoa. 
            </p>

            <input 
              type="number"
              placeholder='Digite sua altura. Ex: 1.5 (Em metros).'
              value={heightField >0 ? heightField: ''}
              onChange={e => setHeightField(parseFloat(e.target.value))}
              disabled={toShow ? true : false}
            />

            <input 
              type="number"
              placeholder='Digite seu peso. Ex: 75.3 (Em kg)'
              value={weightField >0 ? weightField: ''}
              onChange={e => setWeightField(parseFloat(e.target.value))}
              disabled={toShow ? true : false}
            />

            <button onClick={handleCalculate} disabled={toShow ? true : false}>Calcular</button>
          </div>
          <div className={styles.rightSide}>
            {!toShow &&
              <div className={styles.grid}>
                {levels.map((item, key) =>(
                  <GridItem key={key} item={item} />
                ))}
              </div>            
            }

            {toShow &&
              <div className={styles.rightBig}>
                <div className={styles.rightArrow} onClick={hendleBack}>
                  <img src={leftArrowImage} width={25}/>
                </div>
                <GridItem item={toShow} />
              </div>
            }

          </div>

      </div>
    </div>
  );
}

export default App;
