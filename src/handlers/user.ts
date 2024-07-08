import prisma from '../db';
import { comparePasswords,createJWT, hashPassword } from '../modules/auth';

export const createNewUser = async (req, res) => {
    try {
        if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
           return res.status(422).json({
                "error": {
                    "field": req.body,
                    "message": "Please fill all required fields"
                }
            })
        }
        const user = await prisma.user.create({
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: await hashPassword(req.body.password),
                phone: req.body.phone
            },
        });
    
        const orgName = `${user.firstName}'s organisation`;
        const organizations = await prisma.organisation.create({
            data: {
                name: orgName,
                description: req.body.description ?? 'Welcome'
            },
        });

        const userId = user.userId; 
        const organizationId = organizations.orgId; 
        const userOrganisation = await prisma.userOrganisation.create({
            data: {
                userId: userId,
                organisationId: organizationId
            },
        });
    
        const token = createJWT(user);
        res.status(201).json({
            "organisation": organizations,
            "status": "success",
            "message": "Registration successful",
            "data":{
                "access token": token,
                "user": {
                    userId: user.userId, 
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone
                }
            },
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            "status": "Bad request",
            "message": "Registration unsuccessful",
            "statusCode": 400
        });
    }
};


export const login = async (req, res) => {
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email
            },
        });

        if (!user) {
            return res.json({
                "status": "Bad request",
                "message": "Authentication failed",
                "statusCode": 401
            });
        }

        const isValid = await comparePasswords(req.body.password, user.password);

        console.log(isValid);
        if(!isValid) {
           return res.json({
                "status": "Bad request",
                "message": "Authentication failed",
                "statusCode": 401
            })
        }
        
        const token = createJWT(user);
        return res.status(200).json({
            "status": "success",
            "message": "Login successful",
            "data":{
                "access token": token,
                "user": {
                    userId: user.userId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone
                }
            },
            // "statusCode": 200
        })
}

// import { log } from 'console';
// import prisma from '../db';
// import { comparePasswords, createJWT, hashPassword } from '../modules/auth';

// export const createNewUser = async (req, res) => {
//     // console.log("Prisma User", prisma.user);
//     // console.log("Prisma User", req.body);
    
//     try{
//         // console.log(req.body)
//         if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
//            return res.status(422).json({
//                 "error": {
//                     "field": req.body,
//                     "message": "Please fill all required fields"
//                 }
//             })
//         }
//         const user = await prisma.user.create({
//             data: {
//                 firstName: req.body.firstName,
//                 lastName: req.body.lastName,
//                 email: req.body.email,
//                 password: await hashPassword(req.body.password),
//                 phone: req.body.phone
//             },
//         });
    
//         console.log(user);
        
//         const orgName = `${user.firstName}'s organisation`;
//         const organizations = await prisma.organization.create({
//             data: {
//                 // orgId: user.firstName,
//                 name: orgName,
//                 // description: req.body.description
//                 description: req.body.description ?? 'Welcome'
//             },
//         });

//         // console.log("organizations: ", organizations);


//         const userId = user.userId;
//         const organizationId = organizations.orgId
//         const userOrganisation = await prisma.userOrganization.create({
//             data: {
//                 userId: userId,
//                 organizationId: organizationId
//             },
//         });
    
//         // console.log(user.firstName);
//         const token = createJWT(user);
//         res.status(201).json({
//             "organisation": organizations,
//             "status": "success",
//             "message": "Registration successful",
//             "data":{
//                 "access token": token,
//                 "user": {
//                     userId: user.userId,
//                     firstName: user.firstName,
//                     lastName: user.lastName,
//                     email: user.email,
//                     phone: user.phone
//                 }
//             },
//         });
//     } catch (error) {
//         console.error(error);
//         res.json({
//             "status": "Bad request",
//             "message": "Registration unsuccessful",
//             "statusCode": 400
//         })
//     }
// };

// // export const getUser = async (req, res) => {
// //     const user = await prisma.user.findMany();
// //     res.json({data: user});
// // }

// export const login = async (req, res) => {
//         const user = await prisma.user.findUnique({
//             where: {
//                 email: req.body.email
//             },
//         });

//         const isValid = await comparePasswords(req.body.password, user.password);

//         console.log(isValid);
//         if(!isValid) {
//            return res.json({
//                 "status": "Bad request",
//                 "message": "Authentication failed",
//                 "statusCode": 401
//             })
//         }
        
//         const token = createJWT(user);
//         return res.status(200).json({
//             "status": "success",
//             "message": "Login successful",
//             "data":{
//                 "access token": token,
//                 "user": {
//                     userId: user.userId,
//                     firstName: user.firstName,
//                     lastName: user.lastName,
//                     email: user.email,
//                     phone: user.phone
//                 }
//             },
//             // "statusCode": 200
//         })
// }