import prisma from "../db";

export const getUser = async (req, res) => {
    const userId = await req.params.id;

    const user = await prisma.user.findUnique({
        where: {
            userId
        },
    });

    res.status(200).json({
        "status": "success",
        "data": {
            userId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone
        }
    })
}