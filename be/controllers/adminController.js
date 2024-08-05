const { response } = require("../app");
const jwt = require("jsonwebtoken");
const COURTS = require("../Model/courtModel");
const COURTSCHEDULE = require("../Model/courtSchedule");

const createnewcourt = (req, res) => {
  const {
    name,
    type,
    address1,
    address2,
    address3,
    location,
    landMark,
    pin,
    contactNumber,
    description,
  } = req.body;

  const pics = req.files.map((file) => {
    return { name: file.filename, type: file.mimetype };
  });

  console.log(pics);

  COURTS({
    name,
    type,
    address1,
    address2,
    address3,
    location,
    landMark,
    pin,
    contactNumber,
    description,
    courtPics: pics,
  })
    .save()
    .then((resp) => {
      res.status(200).json({ message: "court added successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "something went wrong" });
    });
};

const CreateSchedule = (req, res) => {
  try {
    const { startDate, endDate, cost, selectedSlots, courtId } = req.body;

    const currentDate = new Date(new Date(startDate).setUTCHours(0, 0, 0, 0));
    const lastDate = new Date(new Date(endDate).setUTCHours(0, 0, 0, 0));

    const slotObjects = [];

    while (currentDate <= lastDate) {
      for (let data of selectedSlots) {
        slotObjects.push({
          date: JSON.parse(JSON.stringify(currentDate)),
          slot: {
            name: data.name,
            id: data.id,
          },
          cost,
          courtId
        });
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    // console.log(slotObjects);

    COURTSCHEDULE.insertMany(slotObjects)
      .then(() => {
        res.status(200).json({ message: "court schedules added successfully" }); 
      })
      .catch((err) => {
        if (err.code === 11000) {
          res.status(500).json({ message: "already scheduled, duplication" });
        } else {
          console(err)
          res.status(500).json({ message: "Something went wrong" });
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


module.exports = { createnewcourt, CreateSchedule };
