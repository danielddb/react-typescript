import * as React from 'react'
import { shallow, mount, render } from 'enzyme'

import Hello from './hello'

describe('Hello', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<Hello />).contains(<h1 className='hello-test'>Hello world</h1>)).toBe(true)
  })

  it('should be selectable by class `hello-test`', () => {
    expect(shallow(<Hello />).is('.hello-test')).toBe(true)
  })

  it('should mount in a full DOM', () => {
    expect(mount(<Hello />).find('.hello-test').length).toBe(1)
  })

  it('should render to static HTML', () => {
    expect(render(<Hello />).text()).toEqual('Hello world')
  })
})