var exports = module.exports = {}

exports.randomString = function(num) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  let str = ''

  for ( let i = 0; i < num; i++ ) {
    str += chars[Math.floor(Math.random() * 36)]
  }

  return str
}

exports.randomNumber = function(min, max) {
  if (min < 0) {
      return Math.floor(min + Math.random() * (Math.abs(min) + max));
  }
  else {
      return Math.floor(min + Math.random() * max);
  }
}

exports.randomBoolean = function() {
  return Math.random() >= 0.5;
}

exports.generateReturns = function() {
  const arr = []
  const numOfRows = Math.floor(Math.random() * 20)

  for ( let i = 0; i < numOfRows; i++ ) {
    let obj = {}
    let i2 = i + 1

    obj.id = i2
    obj.name = this.randomString(5) + '(1)'

    arr.push(obj)
  }

  return arr
}

exports.generateDocument = function(num){
  const arr = []

  for ( let i = 0; i < num; i++ ) {
    arr.push({
      "name" : "Document " + this.randomString(5),
      "url" : "/api/documents/" + this.randomString(5)
    })
  }

  return arr
}

exports.generateComments = function(num, prev, curr) {
  const arr = []
  const types = ['Adjustment', 'Trends', 'Variance']

  for ( let i = 0; i < num; i++ ) {
    let obj = {}
    let i2 = i + 1
    let numInstances = this.randomNumber(1, 2)
    let instances = []

    for ( let p = 0; p < numInstances; p++ ) {
      instances.push(p+1)
    }

    const randomValues = [['660,000', '690,000'], ['680,000', '579,500'], ['190,000', '202,980'], ['560,000', '530,400']]
    const randomValue = randomValues[Math.floor(Math.random() * randomValues.length)]

    obj.id = i2
    obj.user = this.randomString(5)
    obj.type = types[this.randomNumber(0, 3)]
    obj.action = this.randomBoolean() ? 'Add' : 'Modify'
    obj.time = new Date(+(new Date()) - Math.floor(Math.random()*10000000000)).getTime()
    obj.description = this.randomString(5)
    obj.comment = this.randomSentence()
    obj.attachment = this.generateDocument(this.randomNumber(0, 3))
    obj.include = this.randomBoolean()
    obj.previousInstanceIds = instances
    obj.previous = `2015/12/20: ${randomValue[0]}`
    obj.current = `2016/01/20: ${randomValue[1]}`
    obj.audits = this.generateCommentAudit(null, `2015/12/20: ${randomValue[0]}`, `2016/01/20: ${randomValue[1]}`)
    obj.changes = this.generateCommentChanges()

    arr.push(obj)
  }

  return arr
}

exports.generateCommentAudit = function(num, previous, current) {
  const numOfRows = (num) ? num : Math.floor(Math.random() * 4) + 1
  const types = ['Adjustment', 'Trends', 'Variance']
  const arr = []

  for ( let i = 0; i < numOfRows; i++ ) {
    let obj = {}
    let i2 = i + 1

    obj.user = this.randomString(5)
    obj.time = new Date(+(new Date()) - Math.floor(Math.random()*10000000000))
    obj.type = types[this.randomNumber(0, 3)]
    obj.action = this.randomBoolean() ? 'add' : 'modify'
    obj.description = this.randomString(5)
    obj.comment = this.randomSentence()
    obj.attachment = this.generateDocument(this.randomNumber(0, 3))
    obj.include = this.randomBoolean()
    obj.previousInstanceIds = [1]
    obj.prior = {
      comment:  this.randomSentence()
    }
    obj.previous = previous
    obj.current = current

    arr.push(obj)
  }

  return arr
}

exports.generateCommentChanges = function() {
  const hasChanges = this.randomBoolean()

  if ( !hasChanges ) {
    return null
  }

  return [
    {
      value: this.randomNumber(0, 10000)
    }
  ]
}

exports.randomSentence = function() {
  const verbs =
  [
      ["change to", "changed to", "edited to", "amend to", "edit to"],
      ["look at", "looks at", "looking at", "looked at", "looked at"],
      ["choose", "chooses", "choosing", "chose", "chosen"]
  ];
  const tenses =
  [
      {name:"Present", singular:1, plural:0, format:"%subject %verb %complement"},
      {name:"Past", singular:3, plural:3, format:"%subject %verb %complement"},
      {name:"Present Continues", singular:2, plural:2, format:"%subject %be %verb %complement"}
  ];
  const subjects =
  [
      {name:"I", be:"am", singular:0},
      {name:"You", be:"are", singular:0},
      {name:"There", be:"is", singular:1}
  ];
  const complementsForVerbs =
  [
      ["1,000,000", "better", "incorrect", "lower"],
      ["for a change", "them", "the figure", "the cell"],
      ["a different cell to amend", "to ignore that figure"]
  ]
  Array.prototype.random = function(){return this[Math.floor(Math.random() * this.length)];};

  let index = Math.floor(verbs.length * Math.random());
  let tense = tenses.random();
  let subject = subjects.random();
  let verb = verbs[index];
  let complement = complementsForVerbs[index];
  let str = tense.format;
  str = str.replace("%subject", subject.name).replace("%be", subject.be);
  str = str.replace("%verb", verb[subject.singular ? tense.singular : tense.plural]);
  str = str.replace("%complement", complement.random());
  return str;

}
