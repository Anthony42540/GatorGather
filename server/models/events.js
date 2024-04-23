module.exports = (sequelize, DataTypes) => {
    const events = sequelize.define("Events", {
        username: {
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
        categoryTag: {
             type: DataTypes.STRING,
             allowNull: true,
        },
        dateTime: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    });

    events.associate = (models) => {
        events.hasMany(models.Comments, {
            onDelete: "cascade",
        });

        events.hasMany(models.Likes, {
            onDelete: "cascade",
        });
    };

    return events;
};