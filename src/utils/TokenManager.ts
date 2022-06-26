import jwt from 'jsonwebtoken';

export const generateToken = (uid: string) => {
    try {
        const expiresIn = 300;
        const token = jwt.sign({uid}, process.env.JWT_SECRET ?? '', {expiresIn: 300 })
        
        return {token, expiresIn};

    } catch (error) {
        console.log(error)
    }
}