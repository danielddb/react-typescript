import React, { Component } from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { connect } from 'react-redux'

import { getEntities } from '../data/entities/api'
import { getForms } from '../data/forms/api'
import { getProducts } from '../data/products/api'

class Filters extends Component {
  state = {
    options: {
      products: [],
      entities: [],
      forms: []
    },
    form: {
      productPrefix: null,
      entityCode: null,
      formCode: null,
      formVersion: null
    }
  }

  constructor(props) {
    super(props)

    this.handleProductPrefixChange = this.handleProductPrefixChange.bind(this)
    this.handleEntityCodeChange = this.handleEntityCodeChange.bind(this)
  }

  async componentDidMount() {
    const products = await getProducts()

    this.props.dispatch({ type: 'GET_PRODUCTS' })

    this.setOptionValue('products', products)
  }

  setOptionValue(key, value) {
    this.setState({
      options: { ...this.state.options, [key]: value }
    })
  }

  setFormValue(key, value) {
    this.setState({
      form: { ...this.state.form, [key]: value }
    })
  }

  async handleProductPrefixChange(event, index, value) {
    this.setOptionValue('entities', [])
    this.setFormValue('entityCode', null)

    this.setOptionValue('forms', [])
    this.setFormValue('formCode', null)

    this.setFormValue('productPrefix', value)

    const entities = await getEntities(value)

    this.setOptionValue('entities', entities)
  }

  async handleEntityCodeChange(event, index, value) {
    this.setOptionValue('forms', [])
    this.setFormValue('formCode', null)

    this.setFormValue('entityCode', value)

    const forms = await getForms(this.state.form.productPrefix, value)

    this.setOptionValue('forms', forms)
  }

  renderProductPrefix() {
    const { options, form } = this.state

    return (
      <div>
        <SelectField
          disabled={options.products.length === 0}
          value={form.productPrefix}
          floatingLabelText="Regulator"
          onChange={this.handleProductPrefixChange}>
            {options.products.map(p => (
              <MenuItem  value={p.prefix} key={p.id} primaryText={p.description}/>
            ))}
        </SelectField>
        <br/>
      </div>
    )
  }

  renderEntityCode() {
    const { options, form } = this.state

    return (
      <div>
        <SelectField
          disabled={options.entities.length === 0}
          value={form.entityCode}
          floatingLabelText="Entity"
          onChange={this.handleEntityCodeChange}>
            {options.entities.map(e => (
              <MenuItem  value={e.code} key={e.id} primaryText={e.description}/>
            ))}
        </SelectField>
        <br/>
      </div>
    )
  }

  renderForm() {
    const { options, form } = this.state

    return (
      <div>
        <SelectField
          disabled={options.forms.length === 0}
          value={form.formCode}
          floatingLabelText="Return">
            {options.forms.map(f => (
              <MenuItem  value={f.code} key={f.id} primaryText={f.formVersionName}/>
            ))}
        </SelectField>
        <br/>
      </div>
    )
  }

  render() {
    return (
      <div>
      {this.renderProductPrefix()}
      {this.renderEntityCode()}
      {this.renderForm()}
      </div>
    )
  }
}

export default connect(null, null)(Filters)
