const { response } = require("express");

const Doctor = require("../models/doctor");

const getDoctors = async (req, res = response) => {
  const doctors = await Doctor.find()
    .populate("hospital", "name")
    .populate("user", "name");

  res.json({
    ok: true,
    doctors,
  });
};

const addDoctor = async (req, res = response) => {
  const id = req.id;
  const doctor = new Doctor({
    user: id,
    ...req.body,
  });

  try {
    const doctorDB = await doctor.save();

    res.json({
      ok: true,
      doctor: doctorDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Contact an administrator.",
    });
  }
};

const updateDoctor = async (req, res = response) => {

  const id = req.params.id;
  const userId = req.id;

  try {
    const doctorDB = await Doctor.findById(id);

    if (!doctorDB) {
      return res.status(404).json({
        ok: false,
        message: "Doctor not found.",
      });
    }

    const doctorChanges = {
      ...req.body,
      user: userId,
    };

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      doctorChanges,
      { new: true }
    );

    res.json({
      ok: true,
      Doctor: updatedDoctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Contact an administrator.",
    });
  }
};

const deleteDoctor = async (req, res = response) => {

    const id = req.params.id;
  
    try {
      const doctorDB = await Doctor.findById(id);
  
      if (!doctorDB) {
        return res.status(404).json({
          ok: false,
          message: "Doctor not found.",
        });
      }
  
     await Doctor.findByIdAndDelete( id ); 
  
      res.json({
        ok: true,
        message: 'Doctor deleted successfully.'  
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        message: "Contact an administrator.",
      });
    }
};

module.exports = {
  getDoctors,
  addDoctor,
  updateDoctor,
  deleteDoctor,
};
