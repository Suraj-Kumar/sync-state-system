function DuplicateRecordError(error){
    this.status =409,
    this.code = "CONFLICT",
    this.message = `Resourse already exists with following values: ${JSON.stringify(error.fields)}`, 
    this.original = error

}

module.exports= DuplicateRecordError;
