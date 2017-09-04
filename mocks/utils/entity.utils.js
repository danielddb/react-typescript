const entities = [
  {
    "id": 1,
    "name": "0001",
    "description": "ABC Banking Group Inc",
    "code": "0001",
    "reportOn": true,
    "status": "Y",
    "extCode": "CRSA",
    "consolidationBasis": "Consolidated",
    "parentId": null
  },
  {
    "id": 2,
    "name": "0100",
    "description": "ABC Bank",
    "code": "0100",
    "reportOn": true,
    "status": "Y",
    "extCode": "CRSA",
    "consolidationBasis": "Consolidated",
    "parentId": null
  },
  {
    "id": 3,
    "name": "0110",
    "description": "ABC Bank (UK) Ltd.",
    "code": "0110",
    "reportOn": true,
    "status": "Y",
    "extCode": "CRSA",
    "consolidationBasis": "Consolidated",
    "parentId": null
  },
  {
    "id": 4,
    "name": "0200",
    "description": "ABC Commercial Bank",
    "code": "0200",
    "reportOn": true,
    "status": "Y",
    "extCode": "CRSA",
    "consolidationBasis": "Consolidated",
    "parentId": null
  },
  {
    "id": 5,
    "name": "0202",
    "description": "ABC Commercial Bank (Fr)",
    "code": "0202",
    "reportOn": true,
    "status": "Y",
    "extCode": "CRSA",
    "consolidationBasis": "Consolidated",
    "parentId": null
  },
  {
    "id": 6,
    "name": "0210",
    "description": "ABC Facilities Management LLC",
    "code": "0210",
    "reportOn": true,
    "status": "Y",
    "extCode": "CRSA",
    "consolidationBasis": "Consolidated",
    "parentId": null
  }
]

exports.getEntities = getEntities

function getEntities(productPrefix) {
  if(!productPrefix) throw 402

  return entities
}
