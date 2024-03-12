module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return users;
}

module.exports = (sequelize, DataTypes) => {
    const events = sequelize.define("Events", {
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        eventDescription: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return events;
}