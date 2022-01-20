const respons = (res, result, status, message, pagination) => {
    res.status(status).json({
        status: 'Success',
        code: status || 200,
        data: result,
        message: message || null,
        pagination: pagination
    });
};


module.exports = {
    respons
}