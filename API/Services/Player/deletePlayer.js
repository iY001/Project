const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function deletePlayer(req, res) {
    try {
        const studentId = parseInt(req.params.id);
        
        await prisma.student.delete({
          where: { id: studentId },
        });
        
        res.send(`Student with ID ${studentId} deleted`);
      } catch (error) {
        res.status(500).send('Error deleting student');
      }
    }

module.exports = deletePlayer