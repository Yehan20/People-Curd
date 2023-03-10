import express  from "express";
import personController from "../controller/person.controller.js";
const personRouter = express.Router();


personRouter.post('/add',personController.addPerson)
personRouter.get('/all',personController.getPersons)
personRouter.get('/sortName',personController.sortByName)
personRouter.get('/sortID',personController.sortByID)
personRouter.delete('/delete/:id',personController.deletePerson)
personRouter.put('/update',personController.updatePerson)

export default personRouter;
