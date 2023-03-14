module.exports = (sequelize, dataTypes) => {

    const alias = "Proyect"

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        link: {
            type: dataTypes.TEXT,
        },
        img1: {
            type: dataTypes.TEXT,
        }
    }

    const config = {
        tableName: 'proyects',
        timestamps: true,
        paranoid: true
    };

    const Proyect = sequelize.define(alias, cols, config);

    Proyect.associate = function (models) {
        Proyect.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id'
        })
    };

    return Proyect;

}