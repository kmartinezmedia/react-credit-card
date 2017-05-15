import React from 'react'
import {render} from 'react-dom'
import Component from 'src';
import './styles.css';

export default class Demo extends React.Component {
  render() {
    return (
      <div className="demo-page">
        <Component cardWidth={400}/>
      </div>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))
