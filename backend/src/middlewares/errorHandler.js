const errorHandling = ((error, _request, response, _next) => {
    console.error(error);
    response.status(500).json({ 
        status: "error",
        error: "Internal server error.", 
        message: error.message, 
    });
});

export default errorHandling;