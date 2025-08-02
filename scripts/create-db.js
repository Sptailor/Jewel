const { execSync } = require('child_process');

console.log('Creating database...');

try {
  // Try using createdb command
  execSync('createdb jewellery_store', { stdio: 'inherit' });
  console.log('Database created successfully using createdb!');
} catch (error) {
  console.log('createdb not found, trying alternative method...');
  
  try {
    // Try using psql to create database
    execSync('psql -U postgres -c "CREATE DATABASE jewellery_store;"', { stdio: 'inherit' });
    console.log('Database created successfully using psql!');
  } catch (psqlError) {
    console.error('Failed to create database. Please ensure PostgreSQL is installed and running.');
    console.error('You can manually create the database by running:');
    console.error('  psql -U postgres');
    console.error('  CREATE DATABASE jewellery_store;');
    console.error('  \\q');
  }
}