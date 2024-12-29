import { Sequelize } from "sequelize";

const db = new Sequelize('upload_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

// Cek koneksi
db.authenticate()
    .then(() => {
        console.log('Koneksi ke database berhasil.');
    })
    .catch(err => {
        console.error('Tidak dapat terhubung ke database:', err);
    });

export default db;