const Rescuer = require('../models/Rescuer');

const getAllRescuers = (req, res) => {
    Rescuer.findAll()
        .then(rescuers => {
            res.json({ status: 200, RescuersList: rescuers });
        })
        .catch(err => {
            res.json({ message: "Internal Server Error", status: 500 });
            console.log(err);
        });
}

const createNewRescuer = (req, res) => {
    const rescuerData = {
        username: req.body.username,
        cargo: req.body.cargo,
        status: req.body.status,
        activeTasks: req.body.activeTasks,
        coorX: req.body.coorX,
        coorY: req.body.coorY
    };

    Rescuer.create(rescuerData).then(() => {
        console.log("Record successfully saved");
        res.json({ "message": "Record Successfully saved", "status": 200 });
    })
        .catch(err => {
            if (err) {
                res.json({ "message": "Internal Server Error", "status": 500 });
                console.log(err);
            }
        });

}

const updateRescuer = (req, res) => {
    var id = req.body.id;
    const rescuerData = {
        username: req.body.username,
        cargo: req.body.cargo,
        status: req.body.status,
        activeTasks: req.body.activeTasks,
        coorX: req.body.coorX,
        coorY: req.body.coorY
    };

    Rescuer.findByPk(id).then((rescuer) => {
        if (!rescuer) {
            console.log("Rescuer not found");
        } else {
            rescuer.update(rescuerData);
            console.log("Record successfully updated");
            res.json({ message: "Record Successfully updated", status: 200 });
        }
    }).catch((err) => {
        if (err) {
            res.json({ message: "Internal Server Error", status: 500 });
            console.log(err);
        }
    });
}


const getRescuer = (req, res) => {
    var rescuerId = req.params.id;
    Rescuer.findOne({ where: { id: rescuerId } })
        .then(rescuer => {
            res.send({ status: 200, Rescuer: rescuer });
        })
        .catch(err => {
            res.json({ message: "Internal Server Error", status: 500 });
            console.log(err);
        });
}

const deleteRescuer = (req, res) => {
    var deleteId = req.body.id;
    Rescuer.destroy({ where: { id: deleteId } })
        .then(() => {
            console.log("Record successfully deleted");
            res.json({ message: "Record Successfully deleted", status: 200 });
        })
        .catch(err => {
            res.end('{"message": "Internal Server Error", "status" : 500}');
            console.log(err);
        });;
}



module.exports = { getAllRescuers, createNewRescuer, updateRescuer, getRescuer, deleteRescuer };