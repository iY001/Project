const express = require('express');
const multer = require('multer');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();
const app = express();
const port = 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/:id', async (req, res) => {
    try {
        const logo = await prisma.logo.findUnique({
            where: { id: req.params.id },
        });
        res.send(logo.image.data);
    } catch (error) {
        res.status(500).send('Error retrieving logos');
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    try {
        const logo = await prisma.logo.create({
            data: {
                logo_filename: req.body.name,
                data: req.file.buffer.toString('base64'),
            },
        });
        res.json(logo);
    } catch (error) {
        res.status(500).send('Error creating logo');
    }
});

router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const logoId = parseInt(req.params.id);
        const logo = await prisma.logo.update({
            where: { id: logoId },
            data: {
                logo_filename: req.body.name,
                data: req.file.buffer.toString('base64'),
            },
        });
        res.json(logo);
    } catch (error) {
        res.status(500).send('Error updating logo');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const logoId = parseInt(req.params.id);
        await prisma.logo.delete({
            where: { id: logoId },
        });
        res.send(`Logo with ID ${logoId} deleted`);
    } catch (error) {
        res.status(500).send('Error deleting logo');
    }
});