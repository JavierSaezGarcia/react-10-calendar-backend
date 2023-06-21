
const isDate = (value) => {
    if (!value || isNaN(new Date(value))) {
        return false;
    } else {
        return true;
    }
}

module.exports = {
    isDate
}