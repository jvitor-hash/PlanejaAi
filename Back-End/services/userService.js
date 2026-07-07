const userModel = require('../models/userModel');

exports.createUser = async (data) => {
    try {
        const user = await userModel.create(data);
        return user;
    } catch (err) {
        console.error(err);
    }
};

exports.findAll = async () => {
    try {
        const users = await userModel.findAll();
        return users;
    } catch (err) {
        console.error(err);
    }
};

exports.findById = async (id) => {
    try {
        const user = await userModel.findByPk(id);
        return user;
    } catch (err) {
        console.error(err);
    }
};

exports.findByEmail = async (email) => {
    try {
        const user = await userModel.findOne({
            where: { email }
        });
        return user;
    } catch (err) {
        console.error(err);
    }
};

exports.updateUser = async (id, data) => {
    try {
        const [updated] = await userModel.update(data, {
            where: { id }
        });

        if (!updated) {
            return null;
        }

        return await userModel.findByPk(id);
    } catch (err) {
        console.error(err);
    }
};

exports.deleteUser = async (id) => {
    try {
        const deleted = await userModel.destroy({
            where: { id }
        });

        return deleted > 0;
    } catch (err) {
        console.error(err);
    }
};