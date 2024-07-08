// import app from "../server";
// import supertest from "supertest";
// import { createNewUser } from "../handlers/user";
// import prisma from "../db";
// import { PrismaClient } from "@prisma/client";

// const pris = 
// describe('POST /register', () => {
//     it('should register a user to the database and send back data', async () => {
//         const req = await supertest(app)
//         .post('/auth/register')

//         expect(req.body).toBe(res.body)
//     })
// })


import request from 'supertest';
import express from 'express';
import { createNewUser } from "../handlers/user"
import prisma from '../db'; // Adjust import based on your setup
import { PrismaClient } from '@prisma/client';

    // Successfully creates a new user with all required fields
    it('should create a new user and return a success response when all required fields are provided', async () => {
        const req = {
            body: {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                password: 'password123',
                phone: '1234567890'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        prisma.user.create = jest.fn().mockResolvedValue({
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '1234567890'
        });

        prisma.organisation.create = jest.fn().mockResolvedValue({
            id: 1,
            name: "John's organisation",
            description: 'Welcome'
        });

        prisma.userOrganisation.create = jest.fn().mockResolvedValue({
            userId: 1,
            organisationId: 1
        });

        await createNewUser(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            status: 'success',
            message: 'Registration successful'
        }));
    });

        // Email already exists in the database
    it('should return a 400 status and error message when email already exists', async () => {
        const req = {
            body: {
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'jane.doe@example.com',
                password: 'password123',
                phone: '1234567890'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        prisma.user.create = jest.fn().mockRejectedValue(new Error('Email already exists'));

        await createNewUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            status: 'Bad request',
            message: 'Registration unsuccessful',
            statusCode: 400
        }));
    });


        // Returns a success response with user and organization details
    it('should return a success response with user and organization details when all required fields are provided', async () => {
        const req = {
            body: {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                password: 'password123',
                phone: '1234567890'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        prisma.user.create = jest.fn().mockResolvedValue({
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '1234567890'
        });

        prisma.organisation.create = jest.fn().mockResolvedValue({
            id: 1,
            name: "John's organisation",
            description: 'Welcome'
        });

        prisma.userOrganisation.create = jest.fn().mockResolvedValue({
            userId: 1,
            organisationId: 1
        });

        await createNewUser(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            status: 'success',
            message: 'Registration successful'
        }));
    });


        // Creates an organization for the new user
    it('should create an organization for the new user', async () => {
        const req = {
            body: {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                password: 'password123',
                phone: '1234567890'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        prisma.user.create = jest.fn().mockResolvedValue({
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '1234567890'
        });

        prisma.organisation.create = jest.fn().mockResolvedValue({
            id: 1,
            name: "John's organisation",
            description: 'Welcome'
        });

        prisma.userOrganisation.create = jest.fn().mockResolvedValue({
            userId: 1,
            organisationId: 1
        });

        await createNewUser(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            status: 'success',
            message: 'Registration successful'
        }));
    });