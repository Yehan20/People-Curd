import personModal from "../model/Person.js";


const addPerson = async (req, res) => {

    try {

        const user = new personModal({
            name: req.body.name,
            emp__id: req.body.emp__id,
            exp: Number(req.body.exp),
            designation: req.body.designation,
            type: req.body.type
        })

        await user.save()
        res.status(200).json({success: true})
    } 
    catch (e) {
        res.status(404).json({success: false})
    }

}

const getPersons = async (req, res) => {
    const persons = await personModal.find()
    res.send(persons)
}

const deletePerson = async (req, res) => {
    try {
        await personModal.remove({_id: req.params.id})
        res.status(200).json({success: true})
    } catch (e) {
        res.status(404).json({success: false})
    }

}

const updatePerson = async (req, res) => {
    try {
        // console.log(req.body);
         await personModal.findByIdAndUpdate(req.body._id, {name: req.body.name,designation:req.body.designation})
         res.status(200).json({success:true})
    } catch (e) {
        console.log(e);
        res.status(404).json({success:false})
    }
}

const personController = {
    addPerson,
    getPersons,
    deletePerson,
    updatePerson
}

export default personController;
