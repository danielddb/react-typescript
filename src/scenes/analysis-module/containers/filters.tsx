import * as React from 'react'
import { connect, Dispatch } from 'react-redux'

import { getProducts } from '../data/products/actions'

class Filters extends React.Component<any> {
  componentDidMount() {
    this.props.getProducts()
  }

  componentWillUpdate() {
    console.log(this.props.products)
  }

  render(): any {
    return (<div>sdfsdf</div>)
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getProducts: () => dispatch(getProducts())
  }
}

export default connect(null, mapDispatchToProps)(Filters)
