import React from 'react'
import { shallow, mount, render } from 'enzyme'

import Hello from '../hello'

describe('Hello', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<Hello />)).toMatchSnapshot()
  })

  it('should render to static HTML', () => {
    expect(render(<Hello />).text()).toContain('Hello world')
  })
})
