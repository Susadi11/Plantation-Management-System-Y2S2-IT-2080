import express from 'express';
import mongoose from "mongoose";
import {InventoryInput} from "../../models/Inventory Models/InventoryRecordModel.js";

const router = express.Router();

// Save a new inventory record
router.post('/', async (request, response) => {
    try {
        const {
            type,
            record_ID,
            record_name,
            storage,
            quantity,
            expire_date,
            description
        } = request.body;

        // Check if all required fields are present
        if (!type || !record_ID || !record_name || !storage || !quantity || !description) {
            return response.status(400).send({
                message: 'All required data must be provided',
            });
        }

        // If type is Agrochemical, require expire_date
        if (type === 'Agrochemical' && !expire_date) {
            return response.status(400).send({
                message: 'Expire date is required for agrochemical records',
            });
        }

        // Create a new inventory record
        const newInventoryInput = await InventoryInput.create({
            type,
            record_ID,
            record_name,
            storage,
            quantity,
            expire_date,
            description
        });

        return response.status(201).send(newInventoryInput);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


// Get all inventory records
router.get('/', async (request, response) => {
    try {
        const inventoryinputs = await InventoryInput.find({});
        return response.status(200).json({
            count: inventoryinputs.length,
            data: inventoryinputs
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Get inventory record by ID
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        // Ensure id is not undefined
        if (!id) {
            return response.status(400).json({ message: 'ID parameter is required' });
        }

        const inventoryinput = await InventoryInput.findById(id);
        if (!inventoryinput) {
            return response.status(404).json({ message: 'Inventory Record not found' });
        }
        return response.status(200).json(inventoryinput);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Update inventory record
router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const {
            type,
            record_ID,
            record_name,
            storage,
            quantity,
            expire_date,
            description
        } = request.body;

        // Check if all required fields are present
        if (!type || !record_ID || !record_name || !storage || !quantity || !expire_date || !description) {
            return response.status(400).send({
                message: 'All required data must be provided',
            });
        }

        // Find and update the inventory record
        const updatedRecord = await InventoryInput.findByIdAndUpdate(id, request.body, { new: true });

        if (!updatedRecord) {
            return response.status(404).json({ message: 'Inventory record not found' });
        }

        return response.status(200).send(updatedRecord);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Delete inventory record
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        // Find and delete the inventory record
        const result = await InventoryInput.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).json({ message: 'Inventory record not found' });
        }
        return response.status(200).send({ message: 'Inventory record deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
