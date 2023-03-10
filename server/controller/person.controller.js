import personModal from "../model/Person.js";


const addPerson = async (req, res) => {
    console.log(req.body);
    try {
        const user = await personModal.create({
            name: req.body.name,
            emp__id: req.body.emp__id,
            exp: Number(req.body.exp),
            designation: req.body.designation,
            type: req.body.type
        })
        console.log(user);

        res.status(200).json({success: true})
    } 
    catch (e) {
        console.log(e);
        res.status(404).json({success: false})
    }

}

const getPersons = async (req, res) => {
    try{
        const persons = await personModal.find()
        res.send(persons)
    }catch(e){
        console.log(e);
    }

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

const sortByName = async (req,res)=>{
    try{
        const persons = await personModal.find().collation({'locale': "en"}).sort("feild name")
        res.send(persons)
    }catch(e){
        console.log(e);
    }
}


const sortByID = async (req,res)=>{
    try{
        const persons = await personModal.find().collation({'locale': "en"}).sort("feild -emp__id")
        res.send(persons)
    }catch(e){
        console.log(e);
    }
}

const personController = {
    addPerson,
    getPersons,
    deletePerson,
    updatePerson,
    sortByName,
    sortByID
}

export default personController;
