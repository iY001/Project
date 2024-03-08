const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function putUserById(req, res) {
    try {
        const userId = parseInt(req.params.id);
        const { username, password } = req.body;
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: { username, password: hashedPassword },
        });
        
        res.json(updatedUser);
      } catch (error) {
        res.status(500).send('Error updating user');
      }
    }

module.exports = putUserById