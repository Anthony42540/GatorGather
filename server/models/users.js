module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
    });

    users.associate = (models) => {
        users.hasMany(models.Likes, {
            onDelete: "cascade",
        });
    };
    return users
};