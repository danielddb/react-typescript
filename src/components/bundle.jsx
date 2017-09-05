import { Component } from 'react'
import { injectAsyncReducers, store } from '../store/configure-store'

export default class Bundle extends Component {
  state = {
    // short for "module" but that's a keyword in js, so "mod"
    mod: null
  }

  componentWillMount() {
    this.load(this.props)
  }

  async load(props) {
    this.setState({
      mod: null
    })

    try {
      const mod = [await props.loadComponent(), props.loadReducers ? await props.loadReducers() : undefined]

      if(mod[1]) {
        injectAsyncReducers(store, mod[1].default)
      }

      this.setState({ mod: mod[0].default })
    }
    catch(e) {
      console.warn('An error occurred while loading the component:', e)
    }
  }

  render() {
    const state = this.state
    const props = this.props

    return state.mod ? props.children(state.mod) : null
  }
}
