exports.getProducts = getProducts

function getProducts() {
  return [
    createProduct(1, 'ECR', 'European Common Reporting'),
    createProduct(2, 'FED', 'US FED Reserve')
  ]
}

function createProduct(id, prefix, description) {
  return {
    id,
    prefix,
    toolsetMinVersion: null,
    toolsetMaxVersion: null,
    implementationVersion: "1.1.0.1",
    specificationVersion: "1.0",
    status: "A",
    usesDpm: true,
    idOffset: 1000001,
    dpmVersion: "1.0",
    dpmMappingVersion: "2.9.0",
    description,
    formMetaTypeEnum: "INTERNAL_DFM",
    formInstanceTypeEnum: "INTERNAL_FIN",
    productConfigRequiredAliases: [],
    active: true,
    aliases: [],
    formMetaType: "INTERNAL_DFM"
  }
}
