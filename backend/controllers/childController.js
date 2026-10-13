
import Child from "../models/Child.js";

export const getChildren = async (req, res, next) => {
  try {
    const filter =
      req.query.includeArchived === "true"
        ? {}
        : { isArchived: { $ne: true } };

    const children = await Child.find(filter)
      .populate("mentorId", "name phone email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: children.length,
      data: children,
    });
  } catch (error) {
    next(error);
  }
};

export const getChildById = async (req, res, next) => {
  try {
    const child = await Child.findById(req.params.id)
      .populate("mentorId", "name phone email");

    if (!child) {
      return res.status(404).json({
        success: false,
        message: "Child not found",
      });
    }

    res.json({
      success: true,
      data: child,
    });
  } catch (error) {
    next(error);
  }
};

export const createChild = async (req, res, next) => {
  try {
    const child = await Child.create(req.body);

    res.status(201).json({
      success: true,
      message: "Child created successfully",
      data: child,
    });
  } catch (error) {
    next(error);
  }
};

export const updateChild = async (req, res, next) => {
  try {
    const child = await Child.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!child) {
      return res.status(404).json({
        success: false,
        message: "Child not found",
      });
    }

    res.json({
      success: true,
      message: "Child updated successfully",
      data: child,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteChild = async (req, res, next) => {
  try {
    const child = await Child.findById(req.params.id);

    if (!child) {
      return res.status(404).json({
        success: false,
        message: "Child not found",
      });
    }

    child.isArchived = true;
    child.archivedAt = new Date();

    await child.save();

    res.json({
      success: true,
      message: "Child archived successfully",
      data: child,
    });
  } catch (error) {
    next(error);
  }
};

export const restoreChild = async (req, res, next) => {
  try {
    const child = await Child.findById(req.params.id);

    if (!child) {
      return res.status(404).json({
        success: false,
        message: "Child not found",
      });
    }

    child.isArchived = false;
    child.archivedAt = null;

    await child.save();

    res.json({
      success: true,
      message: "Child restored successfully",
      data: child,
    });
  } catch (error) {
    next(error);
  }
};
