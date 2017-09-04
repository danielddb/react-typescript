const storage = require('node-persist')
const leftPad = require('left-pad')

const utils = require('../utils')
const cellsUtils = require('./cells.utils')
const productUtils = require('./product.utils')

const defaultFormCode = 'CRSA'

const forms = [
  {
    "id": 1,
    "groupId": 0,
    "scale": 3,
    "decimals": -3,
    "roundingMode": "HALF_UP",
    "product": "ECR",
    "desc": 'CRSA',
    "code": 'CRSA',
    "name": 'CRSA',
    "version": 6,
    "newFormInstanceBatchrun": null,
    "newFormInstanceOutputTable": null,
    "computeFormInstanceBatchrun": null,
    "computeFormInstanceOutputTable": null,
    "transmitFormInstanceBatchrun": null,
    "activateDate": "2017-02-16",
    "deActivateDate": null,
    "intervalType": "DAILY",
    "intervalFrequency": 1,
    "execludeHolidays": true,
    "execludeWeekends": true,
    "allowNull": true,
    "stbDataGroup": null,
    "pages": [],
    "pageLoadStatus": "NORMAL",
    "cells": {},
    "gridKeySettings": {},
    "description": 'CRSA',
    "fullName": 'CRSA v6',
    "sourceType": null,
    "formVersion": 6,
    "cellsScale": {},
    "formVersionName": 'CRSA v6',
    "dataGroupName": null,
    "formSchedule": "Daily",
    "presentations": [
        {
            "code": "CRSA",
            "primary": true,
            "pages": []
        }
    ],
    "primaryPresentation": {
        "code": "CRSA",
        "primary": true,
        "pages": []
    }
  },
    {
    "id": 2,
    "groupId": 0,
    "scale": 3,
    "decimals": -3,
    "roundingMode": "HALF_UP",
    "product": "FED",
    "desc": 'FRY9C',
    "code": 'FRY9C',
    "name": 'FRY9C',
    "version": 2,
    "newFormInstanceBatchrun": null,
    "newFormInstanceOutputTable": null,
    "computeFormInstanceBatchrun": null,
    "computeFormInstanceOutputTable": null,
    "transmitFormInstanceBatchrun": null,
    "activateDate": "2017-02-16",
    "deActivateDate": null,
    "intervalType": "DAILY",
    "intervalFrequency": 1,
    "execludeHolidays": true,
    "execludeWeekends": true,
    "allowNull": true,
    "stbDataGroup": null,
    "pages": [],
    "pageLoadStatus": "NORMAL",
    "cells": {},
    "gridKeySettings": {},
    "description": 'FRY9C',
    "fullName": 'FRY9C v2',
    "sourceType": null,
    "formVersion": 8,
    "cellsScale": {},
    "formVersionName": 'FRY9C v2',
    "dataGroupName": null,
    "formSchedule": "Daily",
    "presentations": [
        {
            "code": "FRY9C",
            "primary": true,
            "pages": []
        }
    ],
    "primaryPresentation": {
        "code": "FRY9C",
        "primary": true,
        "pages": []
    }
  }
]

const formInstances = [
  {
    productPrefix: 'FED',
    id: 1,
    referenceDate: '2017-06-30'
  },
  {
    productPrefix: 'FED',
    id: 2,
    referenceDate: '2017-03-31'
  },
  {
    productPrefix: 'FED',
    id: 3,
    referenceDate: '2016-12-31'
  },
  {
    productPrefix: 'FED',
    id: 4,
    referenceDate: '2016-09-30'
  },
  {
    productPrefix: 'FED',
    id: 5,
    referenceDate: '2016-06-30'
  },
  {
    productPrefix: 'FED',
    id: 6,
    referenceDate: '2016-03-31'
  },
  {
    productPrefix: 'FED',
    id: 7,
    referenceDate: '2015-12-31'
  },
  {
    productPrefix: 'ECR',
    id: 8,
    referenceDate: '2017-06-30'
  },
  {
    productPrefix: 'ECR',
    id: 9,
    referenceDate: '2017-03-31'
  },
  {
    productPrefix: 'ECR',
    id: 10,
    referenceDate: '2016-12-31'
  },
  {
    productPrefix: 'ECR',
    id: 11,
    referenceDate: '2016-09-30'
  },
  {
    productPrefix: 'ECR',
    id: 12,
    referenceDate: '2016-06-30'
  },
  {
    productPrefix: 'ECR',
    id: 13,
    referenceDate: '2016-03-31'
  },
  {
    productPrefix: 'ECR',
    id: 14,
    referenceDate: '2015-12-31'
  }
]

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

exports.getForms = getForms
exports.getFormInstance = getFormInstance
exports.getFormInstanceCells = getFormInstanceCells
exports.getFormReferenceDates = getFormReferenceDates
exports.getFormVersionReferenceDates = getFormVersionReferenceDates

function getForms(productPrefix, entityCode) {
  if(!productPrefix || !entityCode) throw 402

  return forms.filter(f => f.product.toUpperCase() === productPrefix.toUpperCase())
}

function getFormReferenceDates(productPrefix, entityCode, formCode) {
  if(!productPrefix || !entityCode || !formCode) throw 402

  if(formCode.toUpperCase() !== defaultFormCode) throw 404

  return formInstances
}

function getFormVersionReferenceDates(productPrefix, entityCode, formCode, formVersion) {
  if(!productPrefix || !entityCode || !formCode || !formVersion) throw 402

  return formInstances.filter(i => i.productPrefix.toUpperCase() === productPrefix.toUpperCase())
}

function getFormInstance(productPrefix, id) {
  if(!productPrefix || !id) throw 402

  const matches = formInstances.filter(i => i.id === +id)

  if(!matches.length) {
    throw 404
  }

  return Object.assign({}, matches[0],
  {
    form: forms.filter(f => f.product.toUpperCase() === productPrefix.toUpperCase())[0],
    product: productUtils.getProducts().filter(p => p.prefix.toUpperCase() === productPrefix)[0],
    entity: {
      id: 3,
      code: '0110',
    },
    pages: [
      {
        "pageCode": "FR2052AP1",
        "pageName": "Inflow",
        "pageInstances": [
          {
            "code": "FR2052AP1",
            "pageInstanceId": "1",
            "validationResult": null,
            "instSetId": null,
            "altInstanceCode": "1",
            "instanceCode": "1"
          }
        ]
      },
      {
        "pageCode": "FR2052AP2",
        "pageName": "Outflow",
        "pageInstances": [
          {
            "code": "FR2052AP2",
            "pageInstanceId": "1",
            "validationResult": null,
            "instSetId": null,
            "altInstanceCode": "1",
            "instanceCode": "1"
          }
        ]
      },
      {
        "pageCode": "FR2052AP3",
        "pageName": "Supplemental",
        "pageInstances": [
          {
            "code": "FR2052AP3",
            "pageInstanceId": "1",
            "validationResult": null,
            "instSetId": null,
            "altInstanceCode": "1",
            "instanceCode": "1"
          }
        ]
      },
      {
        "pageCode": "FR2052AP3FX",
        "pageName": "Supplemental_FX",
        "pageInstances": [
          {
            "code": "FR2052AP3FX",
            "pageInstanceId": "1",
            "validationResult": null,
            "instSetId": null,
            "altInstanceCode": "1",
            "instanceCode": "1"
          }
        ]
      },
      {
        "pageCode": "FR2052AP4",
        "pageName": "Comments",
        "pageInstances": [
          {
            "code": "FR2052AP4",
            "pageInstanceId": "1",
            "validationResult": null,
            "instSetId": null,
            "altInstanceCode": "1",
            "instanceCode": "1"
          }
        ]
      },
      {
        "pageCode": "FR2052AP5",
        "pageName": "HQLA",
        "pageInstances": [
          {
            "code": "FR2052AP5",
            "pageInstanceId": "1",
            "validationResult": null,
            "instSetId": null,
            "altInstanceCode": "1",
            "instanceCode": "1"
          }
        ]
      },
      {
        "pageCode": "FR2052AP6",
        "pageName": "HQLA2",
        "pageInstances": [
          {
            "code": "FR2052AP6",
            "pageInstanceId": "1",
            "validationResult": null,
            "instSetId": null,
            "altInstanceCode": "1",
            "instanceCode": "1"
          }
        ]
      },
      {
        "pageCode": "FR2052AP7",
        "pageName": "HQLA3",
        "pageInstances": [
          {
            "code": "FR2052AP7",
            "pageInstanceId": "1",
            "validationResult": null,
            "instSetId": null,
            "altInstanceCode": "1",
            "instanceCode": "1"
          }
        ]
      },
      {
        "pageCode": "FR2052AP8",
        "pageName": "HQLA4",
        "pageInstances": [
          {
            "code": "FR2052AP8",
            "pageInstanceId": "1",
            "validationResult": null,
            "instSetId": null,
            "altInstanceCode": "1",
            "instanceCode": "1"
          }
        ]
      },
      {
        "pageCode": "FR2052AP9",
        "pageName": "Total Net Cash Outflows",
        "pageInstances": [
          {
            "code": "FR2052AP9",
            "pageInstanceId": "1",
            "validationResult": null,
            "instSetId": null,
            "altInstanceCode": "1",
            "instanceCode": "1"
          }
        ]
      },
      {
        "pageCode": "FR2052AP10",
        "pageName": "Total Net Cash Inflows",
        "pageInstances": [
          {
            "code": "FR2052AP10",
            "pageInstanceId": "1",
            "validationResult": null,
            "instSetId": null,
            "altInstanceCode": "1",
            "instanceCode": "1"
          }
        ]
      },
      {
        "pageCode": "FR2052AP11",
        "pageName": "Maturity Mismatch Add Comp",
        "pageInstances": [
          {
            "code": "FR2052AP11",
            "pageInstanceId": "1",
            "validationResult": null,
            "instSetId": null,
            "altInstanceCode": "1",
            "instanceCode": "1"
          }
        ]
      }
    ]
  })
}

function getFormInstanceCells(productPrefix, id) {
  if(!productPrefix || !id) throw 402

  const matches = formInstances.filter(i => i.id === +id)

  if(!matches.length) {
    throw 404
  }

  const cells = cellsUtils.cells[productPrefix][id]
  const cellComments = []

  for (var i = 0; i < cells.length; i++) {
    const comments = {
      cellId: i,
      comments: utils.generateComments(i % 2 === 0 ? 0 : 1/*, data.prior[0].value, data.current.value*/)
    }

    cellComments.push(comments)
  }

  storage.setItemSync('cellComments', cellComments)
  storage.setItemSync('comments', [])

  return cells
}
