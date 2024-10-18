module.exports = (sequelize, Sequelize) => {
    const Template = sequelize.define("templates", {
        tempCode: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        tempName: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        language: {
            type: Sequelize.ENUM('en', 'fr', 'es', 'ar'),
            allowNull: true,
        },
        category: {
            type: Sequelize.ENUM('transactional', 'marketing', 'OTP'),
            allowNull: false,
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        variables: {
            type: Sequelize.JSON,
            allowNull: true,
        },
        type: {
            type: Sequelize.ENUM('text', 'image', 'video', 'document'),
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
    return Template;
};