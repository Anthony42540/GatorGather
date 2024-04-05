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

    events.associate = (models) => {
        events.hasMany(models.Comments, {
            onDelete: "cascade",
        });
    };

    return events;
};