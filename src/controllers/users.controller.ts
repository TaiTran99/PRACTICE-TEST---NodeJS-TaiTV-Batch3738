import {Request,Response, NextFunction} from 'express'
import usersService from '../services/users.service';
import { sendJsonSuccess } from '../helpers/responseHandler';


const getAll = async (req: Request, res: Response, next: NextFunction)=>{
    try{
        const result = await usersService.getAll(req.query);
        console.log('result',result);
        //res.status(200).json(result)
        sendJsonSuccess(res)(result);
    }
    catch(err){
        next(err)
    }
}

const getUserById = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const {id} = req.params; //return id = string
        const user = await usersService.getUserById(id);

        //res.status(200).json(user)
        sendJsonSuccess(res)(user);
    }
    catch(err){
        next(err)
    }
}

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const user=  await usersService.createUser(data);

        // res.status(201).json({
        //     message: `Created User`,
        //     user: user
        // })
        sendJsonSuccess(res, 'Create User successfully', 201)(user);
    }
    catch(err){
        next(err)
    }
}

const updateUser = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const {id} = req.params;
        const data = req.body;

        
        const user = await usersService.updateUser(id,data);

        // res.status(200).json({
        //     message: `Update User by ID ${id}`,
        //     user: user
        // })
        sendJsonSuccess(res)(user);
    }
    catch(err){
        next(err)
    }
}

const deleteUser = async (req: Request, res: Response,next: NextFunction)=>{
    try {
        const {id} = req.params;
        const user = await usersService.deleteUser(id)
        // res.status(200).json({
        //     message: `Delete User by ID ${id}`,
        //     user: user
        // })
        sendJsonSuccess(res)(user);
    }
    catch(err){
        next(err)
    }
}

export default {
    getAll,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}