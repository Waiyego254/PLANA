import mssql from 'mssql'
import dotenv from 'dotenv'
import path from 'path'
import ejs from 'ejs'
dotenv.config()

import { sqlConfig } from '../config/sqlconfig'
import { sendMail } from '../helpers/emailHelpers'


export const welcomeUser = async()=>{
    const pool = await mssql.connect(sqlConfig)

    const users = (await pool.request().query('SELECT * FROM Users WHERE isWelcomed = 0')).recordset

    console.log(users);

    for(let user of users){
        const templatePath = path.resolve(__dirname, '../../templates/welcomeUser.ejs')

        ejs.renderFile(templatePath, {UserName: user.name}, async(error, data)=>{

            let mailOptions = {
                from: process.env.EMAIL as string,
                to: user.email,
                subject: "Welcome to Plana",
                html: data
            }

            try {
                await sendMail(mailOptions);

                await pool.request().query('UPDATE Users SET isWelcomed = 1 WHERE isWelcomed = 0')

                console.log("Emails sent to new users");
                
            } catch (error) {
                console.log(error);
                
            }
        })
    } 
}