import express from "express";
import usersController from "../../controllers/users.controller";
const router   = express.Router();

//Dinh nghia cac routes cho resource 

//Get All
//http://localhost:9000/api/v1/users
router.get('',  usersController.getAll)

//Get By ID
//http://localhost:9000/api/v1/users/:id
router.get('/:id',  usersController.getUserById)


//Create category 
///http://localhost:9000/api/v1/users
router.post('',  usersController.createUser)

//Update category By ID
///http://localhost:9000/api/v1/users/:id
router.put('/:id', usersController.updateUser)

//Delete category By ID
///http://localhost:9000/api/v1/users/:id
router.delete('/:id', usersController.deleteUser)

export default router