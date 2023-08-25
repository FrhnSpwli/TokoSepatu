module.exports = (sequelize, Sequelize) => {
  const Kas = sequelize.define ('kas', {
    kas: {
      type: Sequelize.INTEGER
    }
  })

  return Kas;
}