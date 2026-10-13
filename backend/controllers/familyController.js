import Family from "../models/Family.js";

export const getFamilies = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.childId) {
      filter.child = req.query.childId;
    }

    const families = await Family.find(filter)
      .populate("child", "firstName middleName lastName grade admissionNumber")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: families.length,
      data: families,
    });
  } catch (error) {
    next(error);
  }
};

export const getFamilyByChild = async (
  req,
  res,
  next
) => {
  try {
    const family = await Family.find({
      child: req.params.childId,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: family.length,
      data: family,
    });
  } catch (error) {
    next(error);
  }
};

export const createFamily = async (
  req,
  res,
  next
) => {
  try {
    const family =
      await Family.create(req.body);

    res.status(201).json({
      success: true,
      message:
        "Family information created successfully",
      data: family,
    });
  } catch (error) {
    next(error);
  }
};

export const updateFamily = async (
  req,
  res,
  next
) => {
  try {
    const family =
      await Family.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!family) {
      return res.status(404).json({
        success: false,
        message:
          "Family record not found",
      });
    }

    res.json({
      success: true,
      message:
        "Family information updated successfully",
      data: family,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFamily = async (
  req,
  res,
  next
) => {
  try {
    const family =
      await Family.findByIdAndDelete(
        req.params.id
      );

    if (!family) {
      return res.status(404).json({
        success: false,
        message:
          "Family record not found",
      });
    }

    res.json({
      success: true,
      message:
        "Family information deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};