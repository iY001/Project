const { PrismaClient } = require('@prisma/client');

const getAllMatches = async (req, res) => {
    try {
        const prisma = new PrismaClient();
        const matches = await prisma.match.findMany(
            {   
                include: {
                    TeamAndMatches: {
                        include: {
                            team1: true,
                            team2: true
                        }
                    }
                }
            }
        );
        res.status(200).send(matches);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

module.exports = getAllMatches;