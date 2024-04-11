async function hashPassword(password) { // returns hashed password I assume
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}
async function comparePassword(password, hashedPassword) { // returns boolean
    return await bcrypt.compare(password, hashedPassword);
}

module.exports = {
    hashPassword,
    comparePassword
};