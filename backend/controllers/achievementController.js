import Achievement from "../models/Achievement.js";

export const getAchievements = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.childId) {
      filter.child = req.query.childId;
    }

    const achievements = await Achievement.find(filter)
      .populate("child", "firstName middleName lastName grade admissionNumber")
      .sort({ achievementDate: -1, createdAt: -1 });

    res.json({
      success: true,
      count: achievements.length,
      data: achievements,
    });
  } catch (error) {
    next(error);
  }
};

export const getAchievementsByChild = async (
  req,
  res,
  next
) => {
  try {
    const achievements =
      await Achievement.find({
        child: req.params.childId,
      }).sort({
        achievementDate: -1,
        createdAt: -1,
      });

    res.json({
      success: true,
      count: achievements.length,
      data: achievements,
    });
  } catch (error) {
    next(error);
  }
};

export const createAchievement = async (
  req,
  res,
  next
) => {
  try {
    const achievement =
      await Achievement.create(req.body);

    res.status(201).json({
      success: true,
      message:
        "Achievement created successfully",
      data: achievement,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAchievement = async (
  req,
  res,
  next
) => {
  try {
    const achievement =
      await Achievement.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    res.json({
      success: true,
      message:
        "Achievement updated successfully",
      data: achievement,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAchievement = async (
  req,
  res,
  next
) => {
  try {
    const achievement =
      await Achievement.findByIdAndDelete(
        req.params.id
      );

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    res.json({
      success: true,
      message:
        "Achievement deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};