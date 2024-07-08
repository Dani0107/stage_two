import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const hashPassword = (password) => {
    return bcrypt.hash(password, 5);
}

export const comparePasswords = (password, hash) => {
    return bcrypt.compare(password, hash);
}

export const createJWT = (user) => {
    const token =jwt.sign({
        id: user.userId,
        firstName: user.firstName
    },
    process.env.JWT_SECRET
);
return token;
}

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization;

    if (!bearer) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }

    const [, token] = bearer.split(' ');
    if (!token) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({
            message: "Invalid token"
        });
    }
}