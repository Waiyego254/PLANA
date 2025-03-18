import mssql from 'mssql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { login_details } from '../models/user.interface';
import { sqlconfig } from '../config/sql.config';

dotenv.config();

export class AuthService {
    async login(logins: login_details) {
        try {
            const pool = await mssql.connect(sqlconfig);
            const request = pool.request();
            

            request.input('email', mssql.VarChar, logins.email);

            const result = await request.execute('loginUser');

            // Log the database result and user input
            console.log('Database Result:', result.recordset);
            console.log('User Input:', logins);

            // If no user is found, return an error message
            if (result.recordset.length < 1) {
                return {
                    message: 'User not found'
                };
            }
            const user = result.recordset[0];
            const role = user.role;
            const user_id = user.user_id;
            const isActive = user.isActive;
            const username = user.username;
            console.log(username);
            
            console.log(role);
            console.log(user_id);
            console.log('isactive',isActive);
            
            
            
            
            
            // Extract the hashed password from the user record
            const hashedPassword = result.recordset[0].password;
            console.log('Hashed Password from DB:', hashedPassword);

            // Compare the provided password with the hashed password
            const passwordMatch = bcrypt.compareSync(logins.password, hashedPassword);
            console.log('passwordmatch',passwordMatch);

            
            

            // If passwords match, generate a JWT token
            if (passwordMatch) {

                if (!isActive) {
                    return {
                        message: 'Account is deactivated. Please contact your admin'
                    };
                }
                const { email, ...rest } = result.recordset[0];
                let token = jwt.sign(rest, process.env.SECRET_KEY as string, {
                    expiresIn: '2h'
                })

                return {
                    message: 'Login successful',
                    role,
                    user_id,
                    username,
                    token
                };
            } else {
                // If passwords don't match, return an error message
                return {
                    message: 'Incorrect password'
                };
            }
        } catch (error) {
            console.error('Server error during login:', error);
            return {
                message: 'Server error',
                error
            };
        }
    }
}
