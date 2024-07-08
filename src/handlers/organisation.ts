import { rmSync } from "fs";
import prisma from "../db";


export const createOrganisation = async (req, res) =>{
    if (!req.body.name) {
               return res.status(422).json({
                    "error": {
                        "field": req.body,
                        "message": "Please fill all required fields"
                    }
                })
            }

    const organisation = await prisma.organisation.create({
        data: {
            name: req.body.name,
            description: req.body.description ?? 'WELCOME',
        },
    })

    if (!organisation) {
        res.json({
            "status": "Bad request",
            "message": "Client error",
            "statusCode": 400
        });
        
    }
    return res.status(201).json({
        "status": "success",
        "message": "Organisation created successfully",
        "data": {
            "orgId": organisation.orgId,
            "name": organisation.name,
            "description": organisation.description
        }
    })
}

export const getOrganisation = async (req, res) => {
    const organisation = await prisma.organisation.findUnique({
        where: {
            orgId: req.params.orgId
        }
    })

    if (!organisation) {
        return res.json({
            "message": "This organisation does not exist"
        })
    }

    return res.json({
        "status": "success",
        "message": "This is the detail about the organisation",
        data: organisation
    })
}

export const addUser = async (req, res) => {
    const organisation = await prisma.organisation.findUnique({
        where: {
            orgId: req.params.orgId
        }
    });

    if (!organisation) {
        return res.json({
            message: "Oganisation does not exist"
        });
    }

    const user = await prisma.user.findUnique({
        where: {
            userId: req.body.userId
        }
    });

    if (!user) {
        return res.json({
            message: "User does not exist"
        })
    }

    const userOrganisation = await prisma.userOrganisation.create({
       data: {
         userId: req.body.userId,
        organisationId: req.params.orgId
       }
    })
    res.json({
        "status": "success",
        "message": "User added to organisation successfully"
    })

}

export const userOrganisation = async (req, res) => {
    // const userOrganisation = await prisma.

    const userId = req.user.userId; // Assuming user ID is stored in req.user by the authentication middleware

    const organisations = await prisma.organisation.findMany({
      where: {
        members: {
          some: {
            userId: userId,
          },
        },
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'Organisations retrieved successfully',
      data: {"organisations": organisations}
    });

    if (!organisations) {
        res.status(500).json({
      status: 'error',
      message: 'An error occurred while retrieving organisations',
    });
    }
}