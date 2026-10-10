import Academic from "../models/Academic.js";

export const getAcademicsByChild = async (req, res, next) => {
  try {
    const academics = await Academic.find({
      child: req.params.childId,
    }).sort({
      academicYear: -1,
      subject: 1,
    });

    res.json({
      success: true,
      count: academics.length,
      data: academics,
    });
  } catch (error) {
    next(error);
  }
};

export const createAcademic = async (req, res, next) => {
  try {
    const academic = await Academic.create(req.body);

    res.status(201).json({
      success: true,
      message: "Academic record created successfully",
      data: academic,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAcademic = async (req, res, next) => {
  try {
    const academic = await Academic.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!academic) {
      return res.status(404).json({
        success: false,
        message: "Academic record not found",
      });
    }

    res.json({
      success: true,
      message: "Academic record updated successfully",
      data: academic,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAcademic = async (req, res, next) => {
  try {
    const academic = await Academic.findByIdAndDelete(
      req.params.id
    );

    if (!academic) {
      return res.status(404).json({
        success: false,
        message: "Academic record not found",
      });
    }

    res.json({
      success: true,
      message: "Academic record deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};