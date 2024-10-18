module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("messages", {
        templateID: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        sentTo: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        status: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
    },
    {
        paranoid: true,
        timestamps: true
    });
    return Message;
};