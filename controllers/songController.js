const db = require('../db');

exports.getAllSongs = (req, res) => {
    db.all('SELECT * FROM songs', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(200).json({
            message: 'Songs retrieved successfully',
            data: rows
        });
    });
};

exports.getSongById = (req, res) => {
    const { id } = req.params;

    db.get('SELECT * FROM songs WHERE song_id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!row) {
            return res.status(404).json({ message: 'Song not found' });
        }

        res.status(200).json({
            message: 'Song retrieved successfully',
            data: row
        });
    });
};

exports.createSong = (req, res) => {
    const { song_name, release_year, album_id } = req.body;

    if (!song_name || release_year === undefined || album_id === undefined) {
        return res.status(400).json({
            message: 'song_name, release_year, and album_id are required'
        });
    }

    const sql = `
        INSERT INTO songs (song_name, release_year, album_id)
        VALUES (?, ?, ?)
    `;

    db.run(sql, [song_name, release_year, album_id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
            message: 'Song created successfully',
            data: {
                song_id: this.lastID,
                song_name,
                release_year,
                album_id
            }
        });
    });
};

exports.updateSong = (req, res) => {
    const { id } = req.params;
    const { song_name, release_year, album_id } = req.body;

    if (!song_name || release_year === undefined || album_id === undefined) {
        return res.status(400).json({
            message: 'song_name, release_year, and album_id are required'
        });
    }

    const sql = `
        UPDATE songs
        SET song_name = ?, release_year = ?, album_id = ?
        WHERE song_id = ?
    `;

    db.run(sql, [song_name, release_year, album_id, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({ message: 'Song not found' });
        }

        res.status(200).json({
            message: 'Song updated successfully',
            data: {
                song_id: Number(id),
                song_name,
                release_year,
                album_id
            }
        });
    });
};

exports.deleteSong = (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM songs WHERE song_id = ?', [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({ message: 'Song not found' });
        }

        res.status(200).json({
            message: 'Song deleted successfully'
        });
    });
};