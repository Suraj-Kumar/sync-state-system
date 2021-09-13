function ResourceNotFoundError(error){
    this.status =404,
    this.code = "RESOURCE_NOT_FOUND",
    this.message = `Resource not found by given criteria`, 
    this.original = error

}

module.exports= ResourceNotFoundError;
