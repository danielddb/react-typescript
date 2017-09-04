const storage = require('node-persist')
const utils = require('../utils')
const leftPad = require('left-pad')

exports.createTableData = createTableData

function createTableData() {
  const arr = []

  const rowDescriptions = [
    'TOTAL EXPOSURES | Original exposure pre conversion factors',
    'TOTAL EXPOSURES | (-) Value adjustments and provision associated with the original exposure',
    'TOTAL EXPOSURES | Exposure net of value adjustments and provisions',
    'TOTAL EXPOSURES | CREDIT RISK MITIGATION (CRM) TECHNIQUES WITH SUBSTITUTION EFFECTS ON THE EXPOSURE; Unfunded credit protection: adjusted values (Ga); (-) Guarantees',
    'TOTAL EXPOSURES | Risk weighted exposure amount after SME-supporting factor',
    'BREAKDOWN OF TOTAL EXPOSURES BY EXPOSURE TYPES:; Exposures / Transactions subject to counterparty credit risk; Securities Financing Transactions; Of which: Centrally cleared through a QCCP | Original exposure pre conversion factors',
    'BREAKDOWN OF TOTAL EXPOSURES BY RISK WEIGHTS:; 35% | Risk weighted exposure amount after SME-supporting factor',
    'Memorandum items; Exposures in default subject to a risk weight of 150% | Risk weighted exposure amount pre SME-supporting factor'
  ]
  const rowInstances = [
    'SATOTAL',
    'SACGOVBANK',
    'SALGOVAUTH',
    'SAPUBSECT',
    'SAMULTBANK',
    'SAINTERORG',
    'SAINS',
    'SACOR',
    'SARET',
    'SAPROPERTY',
    'SAEXPINDEF',
    'SAHIRISK',
    'SACOVBOND',
    'SASTCRASS',
    'SACIU',
    'SAEQEXP',
    'SAOTHER'

  ]
  const types = [
    'Adjustment',
    'Variance',
    'Trend'
  ]

  for ( let i = 0; i < 1000; i++ ) {
    let obj = {}
    let i2 = i + 1

    obj.id = i
    obj.reference = `CRSAR${leftPad(i2, 3, 0)}C${leftPad(i2, 3, 0)}`
    obj.instance = rowInstances[utils.randomNumber(0, 3)]
    obj.description = rowDescriptions[utils.randomNumber(0, 8)]
    obj.type = types[utils.randomNumber(0, 3)]

    obj.prior = [{
      date: '20/12/2017',
      value: utils.randomNumber(0, 10000).toFixed(2),
      combined: ''
    }, {
      date: '20/11/2017',
      value: utils.randomNumber(0, 10000).toFixed(2),
      combined: ''
    }]

    for ( let p of obj.prior ) {
      p.combined = `${p.date} ${p.value}`
    }

    obj.current = {
      date: '20/01/2018',
      value: utils.randomNumber(0, 10000).toFixed(2),
      combined: ''
    }
    obj.current.combined = `${obj.current.date} ${obj.current.value}`

    obj.val1 = obj.prior[0].value
    obj.val2 = obj.current.value

    obj.difference = (obj.val2 - obj.val1).toFixed(2)
    obj.numOfComments = utils.randomNumber(0, 4)

    const percentage = ((obj.val2 - obj.val1) / obj.val1 * 100).toFixed(0)

    if (percentage === 'Infinity') {
      obj.differencePercentage = 'Divide by zero'
    } else {
      obj.differencePercentage = percentage
    }

    arr.push(obj)
  }

  return arr
}
