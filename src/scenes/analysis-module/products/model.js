export class Product {
  constructor(p) {
    this.id = p.id
    this.prefix = p.prefix
    this.toolsetMinVersion = p.toolsetMinVersion
    this.toolsetMaxVersion = p.toolsetMaxVersion
    this.implementationVersion = p.implementationVersion
    this.specificationVersion = p.specificationVersion
    this.status = p.status
    this.usesDpm = p.usesDpm
    this.idOffset = p.idOffset
    this.dpmVersion = p.dpmVersion
    this.dpmMappingVersion = p.dpmMappingVersion
    this.description = p.description
    this.formMetaTypeEnum = p.formMetaTypeEnum
    this.formInstanceTypeEnum = p.formInstanceTypeEnum
    this.productConfigRequiredAliases = p.productConfigRequiredAliases
    this.active = p.active
    this.aliases = p.aliases
    this.formMetaType = p.formMetaType
  }
}
