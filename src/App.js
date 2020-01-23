import React from 'react';
import './App.css';

class App extends React.Component {

  constructor () {
    super();
    this.state = {
      vars: [
        {
          name: 'Field one',
          options: ['1-1', '1-2', '1-3']
        },
        {
          name: 'Field two',
          options: ['2-1', '2-2', '2-3']
        }
      ]
    }
  }

  handleChange = (e, indx, idx) => {
    
    e.persist();
    this.setState(prevState => {
      const newVars = [...prevState.vars];
      newVars[indx].options[idx] = e.target.value;

      return {
        vars: newVars
      }
    })
  }
  
  addOption = indx => {
    console.log(indx);
    this.setState(prevState => {
      const newVars = [...prevState.vars];
      newVars[indx].options.push('');

      return {
        vars: newVars
      };
    });
  }

  removeOption = (indx, idx) => {
    this.setState(prevState => {
      const newVars = [...prevState.vars];
      newVars[indx].options.splice(idx, 1);

      return {
        vars: newVars
      }
    })
  }

  addVariable = () => {
    this.setState(prevState => {
      const newVars = [...prevState.vars, {name: 'new Fields', options: ['', '']}]

      return {
        vars: newVars
      };
    });
  }

  getResult = () => {
    let res = [];

    for(let i = 0; i < this.state.vars.length; i++) {
      const rand = Math.floor(Math.random() * this.state.vars[i].options.length);
      res.push(this.state.vars[i].options[rand]);
    };

    document.getElementById('res').innerHTML = res.join(' / ');
  }

  render() {
    return (
      <div className="App">
        <h1>Randomizr</h1>

        {this.state.vars.map((v,indx) => 
          <div className='var-container' key={`var-${indx}`}>
            <label>{v.name}</label>
            <div>
              {v.options.map((o, idx) => {
                return (
                  <div key={`opt-${idx}`}>
                    <input type='string' onChange={e => this.handleChange(e, indx, idx)} value={o} />
                    <button className='remove-option-btn' onClick={() => this.removeOption(indx, idx)} >-</button>
                  </div>
                )
              })}
              
              <button className='add-option-btn' onClick={() => this.addOption(indx)}>+</button>
            </div>
          </div>
        )}
      <button className='add-variant-btn' onClick={this.addVariable}>+</button>
      <button onClick={this.getResult}>Get Result</button>
      <p id='res'></p>
    </div>
    );
  }
}

export default App;
