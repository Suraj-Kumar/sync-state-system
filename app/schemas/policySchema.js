const policySchema= {
    "type": "object",
    "properties": {
      "computerName": {
        "type": "string"
      },
      "allowedIp": {
        "type": "string"
      },
      "type": {
        "type": "string",
        "enum": ["computer_policy","internal_policy"],
        
      }
    },
    "required": [
      "computerName",
      "allowedIp",
      "type"
    ]
  }

  module.exports = {policySchema}