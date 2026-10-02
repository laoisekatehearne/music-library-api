const db = require('../db');

exports.getAllAlbums = (req, res) => {
    db.all('SELECT * FROM albums', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(200).json({
            message: 'Albums retrieved successfully',
            data: rows
        });
    });
};

exports.getAlbumById = (req, res) => {
    const { id } = req.params;

    db.get('SELECT * FROM albums WHERE album_id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!row) {
            return res.status(404).json({ message: 'Album not found' });
        }

        res.status(200).json({
            message: 'Album retrieved successfully',
            data: row
        });
    });
};

exports.createAlbum = (req, res) => {
    const { album_name, release_year, number_of_listens, artist_id } = req.body;

    if (!album_name || release_year === undefined || number_of_listens === undefined || artist_id === undefined) {
        return res.status(400).json({
            message: 'album_name, release_year, number_of_listens, and artist_id are required'
        });
    }

    const sql = `
        INSERT INTO albums (album_name, release_year, number_of_listens, artist_id)
        VALUES (?, ?, ?, ?)
    `;

    db.run(sql, [album_name, release_year, number_of_listens, artist_id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
            message: 'Album created successfully',
            data: {
                album_id: this.lastID,
                album_name,
                release_year,
                number_of_listens,
                artist_id
            }
        });
    });
};

exports.updateAlbum = (req, res) => {
    const { id } = req.params;
    const { album_name, release_year, number_of_listens, artist_id } = req.body;

    if (!album_name || release_year === undefined || number_of_listens === undefined || artist_id === undefined) {
        return res.status(400).json({
            message: 'album_name, release_year, number_of_listens, and artist_id are required'
        });
    }

    const sql = `
        UPDATE albums
        SET album_name = ?, release_year = ?, number_of_listens = ?, artist_id = ?
        WHERE album_id = ?
    `;

    db.run(sql, [album_name, release_year, number_of_listens, artist_id, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({ message: 'Album not found' });
        }

        res.status(200).json({
            message: 'Album updated successfully',
            data: {
                album_id: Number(id),
                album_name,
                release_year,
                number_of_listens,
                artist_id
            }
        });
    });
};

exports.deleteAlbum = (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM albums WHERE album_id = ?', [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({ message: 'Album not found' });
        }

        res.status(200).json({
            message: 'Album deleted successfully'
        });
    });
};