function InvalidGroupError(error){ 
    this.status =400,
    this.code = "INVALID_GROUP_ID",
    this.message = "Group Id should represent to a valid computer group ", 
    this.original = error
}

module.exports = InvalidGroupError;