module.exports = (res, data) => {
    //console.log(data);
    //console.log(data.dataValues);
    data = data.dataValues;
    if (!data) {
        res.status(200).json({
            message: `I didn't find anything! 🥲`
        })
    } else {
        res.status(200).json({
            message: 'Success!',
            data
        });
    }
}