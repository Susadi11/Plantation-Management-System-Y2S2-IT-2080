import {MachinesTask} from "../../models/Finance Models/MachineTaskModel.js";
import express from "express";

const router = express.Router();

// create a new record
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.task_id ||
            !request.body.start_date ||
            !request.body.name ||
            !request.body.type ||
            !request.body.rate ||
            !request.body.payee ||
            !request.body.description ||
            !request.body.total_amount ||
            !request.body.paid_amount ||
            !request.body.record_date ||
            !request.body.record_reading ||
            !request.body.record_pay
        ) {
            return response.status(400).send({
                message: 'Send all required fields',
            });
        }

        const NewMachinesRecord = {
            task_id:request.body.task_id,
            start_date: request.body.start_date,
            name: request.body.name,
            type: request.body.type,
            rate: request.body.rate,
            payee: request.body.payee,
            description: request.body.description,
            total_amount: request.body.total_amount,
            paid_amount: request.body.paid_amount,
            record_date: request.body.record_date,
            record_reading: request.body.record_reading,
            record_pay: request.body.record_pay,
        };

        const MachineRecord = await MachinesTask.create(NewMachinesRecord);
        return response.status(201).send(MachineRecord);

    }catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route for Get All from database

router.get('/', async (request, response) => {
    try {
        const MachineRecord = await MachinesTask.find({});

        return response.status(200).json({
            count: MachineRecord.length,
            data: MachineRecord,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Get One transaction from database by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const MachineRecord = await MachinesTask.findById(id);

        return response.status(200).json(MachineRecord);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Update a transaction
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.task_id ||
            !request.body.start_date ||
            !request.body.name ||
            !request.body.type ||
            !request.body.rate ||
            !request.body.payee ||
            !request.body.description ||
            !request.body.total_amount ||
            !request.body.paid_amount ||
            !request.body.record_date ||
            !request.body.record_reading ||
            !request.body.record_pay
        ) {
            return response.status(400).send({
                message: 'Send all required fields',
            });
        }

        const { id } = request.params;

        const result = await MachinesTask.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Transaction record not found' });
        }

        return response.status(200).send({ message: 'Transaction record updated successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Delete a book
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await MachinesTask.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Transaction record not found' });
        }

        return response.status(200).send({ message: 'Transaction record deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;