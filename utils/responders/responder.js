module.exports = (res, data) => {
    //console.log(data.length === 0);
    //console.log(data);
    if (data.length === 0) {
        res.status(200).json({
            message: `I didn't find anything! 🥲`
        })
    } else {
        res.status(200).json({
            length: data.length,
            data
        });
    }
}