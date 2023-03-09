import express  from "express";
import personController from "../controller/person.controller.js";
const personRouter = express.Router();


personRouter.post('/add',personController.addPerson)
personRouter.get('/all',personController.getPersons)
personRouter.delete('/delete/:id',personController.deletePerson)
personRouter.put('/update',personController.updatePerson)

export default personRouter;
