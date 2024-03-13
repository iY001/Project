const {PrismaClient} = require('@prisma/client');

const getAllMatches = async (req, res) => {
    try {
        const prisma = new PrismaClient();
        const matches = await prisma.match.findMany();
        res.status(200).send(matches);
    }catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

module.exports = getAllMatches;