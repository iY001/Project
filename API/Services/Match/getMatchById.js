const {PrismaClient} = require('@prisma/client');

const getMatchById = async (req, res) => {
    const matchId = req.params.id;
    try {
        const prisma = new PrismaClient();
        const match = await prisma.match.findFirst({
            where: {
                id: matchId
            }
        });
        res.status(200).json(match);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = getMatchById