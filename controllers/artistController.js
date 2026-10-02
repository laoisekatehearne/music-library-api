const db = require('../db');

exports.getAllArtists = (req, res) => {
    db.all('SELECT * FROM artists', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(200).json({
            message: 'Artists retrieved successfully',
            data: rows
        });
    });
};

exports.getArtistById = (req, res) => {
    const { id } = req.params;

    db.get('SELECT * FROM artists WHERE artist_id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!row) {
            return res.status(404).json({ message: 'Artist not found' });
        }

        res.status(200).json({
            message: 'Artist retrieved successfully',
            data: row
        });
    });
};

exports.createArtist = (req, res) => {
    const { artist_name, genre, monthly_listeners } = req.body;

    if (!artist_name || !genre || monthly_listeners === undefined) {
        return res.status(400).json({
            message: 'artist_name, genre, and monthly_listeners are required'
        });
    }

    const sql = `
        INSERT INTO artists (artist_name, genre, monthly_listeners)
        VALUES (?, ?, ?)
    `;

    db.run(sql, [artist_name, genre, monthly_listeners], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
            message: 'Artist created successfully',
            data: {
                artist_id: this.lastID,
                artist_name,
                genre,
                monthly_listeners
            }
        });
    });
};

exports.updateArtist = (req, res) => {
    const { id } = req.params;
    const { artist_name, genre, monthly_listeners } = req.body;

    if (!artist_name || !genre || monthly_listeners === undefined) {
        return res.status(400).json({
            message: 'artist_name, genre, and monthly_listeners are required'
        });
    }

    const sql = `
        UPDATE artists
        SET artist_name = ?, genre = ?, monthly_listeners = ?
        WHERE artist_id = ?
    `;

    db.run(sql, [artist_name, genre, monthly_listeners, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({ message: 'Artist not found' });
        }

        res.status(200).json({
            message: 'Artist updated successfully',
            data: {
                artist_id: Number(id),
                artist_name,
                genre,
                monthly_listeners
            }
        });
    });
};

exports.deleteArtist = (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM artists WHERE artist_id = ?', [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({ message: 'Artist not found' });
        }

        res.status(200).json({
            message: 'Artist deleted successfully'
        });
    });
};