const User = require('../../models/User');

const seedDefaultAdmin = async () => {
  const existingAdmin = await User.findOne({ email: 'admin@mjcakehouse.com' });
  if (existingAdmin) return;

  await User.create({
    name: 'MJ Admin',
    email: 'admin@mjcakehouse.com',
    password: 'admin123',
    role: 'admin'
  });

  console.log('Default admin created: admin@mjcakehouse.com');
};

module.exports = seedDefaultAdmin;
