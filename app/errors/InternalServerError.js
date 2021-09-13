function InternalServerError(error){ 
    this.status =500,
    this.code = "INTERNAL_SERVER_ERROR";
    this.message = "Something went wrong";
    error &&(this.original = error);
}

module.exports = InternalServerError;