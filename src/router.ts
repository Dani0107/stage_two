import { getDefaultResultOrder } from "dns";
import { Router } from "express";
import { body, validationResult } from "express-validator";
import { getUser } from "./handlers/users";
import { addUser, createOrganisation, getOrganisation, userOrganisation } from "./handlers/organisation";

export const routes = Router();

routes.post('/register', () => {});

routes.post('/login', () => {});

// export default routes;

const router = Router();

router.get('/users/:id', getUser);

router.get('/organisations', userOrganisation);

router.post('/organisations', createOrganisation);

router.get('/organisations/:orgId', getOrganisation);

router.post('/organisations/:orgId/users', addUser);

export default router;