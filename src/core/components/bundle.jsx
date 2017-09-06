import { Component } from 'react'
import { configuredStore, injectAsyncReducers } from '../store'

export default class Bundle extends Component {
  state = {
    // short for "module" but that's a keyword in js, so "mod"
    mod: null
  }

  componentWillMount() {
    this.loadScene(this.props)
  }

  async loadScene(props) {
    this.setState({
      mod: null
    })

    try {
      const mod = await props.loadScene()

      injectAsyncReducers(configuredStore, mod.default.reducer)

      this.setState({ mod: mod.default.component })
    }
    catch(e) {
      console.warn('An error occurred while loading the scene:', e)
    }
  }

  render() {
    const state = this.state
    const props = this.props

    return state.mod ? props.children(state.mod) : null
  }
}
