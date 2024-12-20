import { Request, Response } from 'express';
import { Stock } from '../model/stock';
import db from '../config/db';
import { RowDataPacket, OkPacket } from 'mysql2';

export const getAllStocks = (req: Request, res: Response) => {
    db.query('SELECT id,name,quantity,location FROM stocks', (err, results: RowDataPacket[]) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
};

export const createStock = (req: Request, res: Response) => {
    const newStock: Stock = req.body;
    db.query('INSERT INTO stocks SET ?', newStock, (err, results: OkPacket) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            const { id, ...stockWithoutId } = newStock;
            res.status(201).json({ id: results.insertId, ...stockWithoutId });
        }
    });
};

export const getStockById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    db.query('SELECT id,name,quantity,location FROM stocks WHERE id = ?', [id], (err, results: RowDataPacket[]) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else if (results.length === 0) {
            res.status(404).send('Stock not found');
        } else {
            res.json(results[0]);
        }
    });
};

export const updateStock = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const updatedStock: Stock = req.body;
    db.query('UPDATE stocks SET ? WHERE id = ?', [updatedStock, id], (err, results: OkPacket) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else if (results.affectedRows === 0) {
            res.status(404).send('Stock not found');
        } else {
            const { id: _, ...stockWithoutId } = updatedStock;
            res.json({ id, ...stockWithoutId });
        }
    });
};

export const deleteStock = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    db.query('DELETE FROM stocks WHERE id = ?', [id], (err, results: OkPacket) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else if (results.affectedRows === 0) {
            res.status(404).send('Stock not found');
        } else {
            res.json({ message: 'Stock deleted' });
        }
    });
};
