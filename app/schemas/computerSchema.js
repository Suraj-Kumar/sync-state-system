const computerSchema= {
    "type": "object",
    "properties": {
      "name": {
        "type": "string"
      },
      "ip": {
        "type": "string"
      },
      "groupId": {
        "type": "integer"
      }
    },
    "required": [
      "name",
      "ip",
      "groupId"
    ]
  }

  module.exports = computerSchema