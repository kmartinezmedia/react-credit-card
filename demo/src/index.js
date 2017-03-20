import React from 'react'
import {render} from 'react-dom'

import Component from '../../src'

let Demo = React.createClass({
  render() {
    return <div>
      <Component cardWidth={400}/>
    </div>
  }
})

render(<Demo/>, document.querySelector('#demo'))
