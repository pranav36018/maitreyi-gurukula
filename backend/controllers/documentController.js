import Document from "../models/Document.js";

export const getDocuments = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.childId) {
      filter.child = req.query.childId;
    }

    const documents = await Document.find(filter)
      .populate("child", "firstName middleName lastName grade admissionNumber")
      .sort({ documentDate: -1, createdAt: -1 });

    res.json({
      success: true,
      count: documents.length,
      data: documents,
    });
  } catch (error) {
    next(error);
  }
};

export const getDocumentsByChild = async (
  req,
  res,
  next
) => {
  try {
    const documents =
      await Document.find({
        child: req.params.childId,
      }).sort({
        documentDate: -1,
        createdAt: -1,
      });

    res.json({
      success: true,
      count: documents.length,
      data: documents,
    });
  } catch (error) {
    next(error);
  }
};

export const createDocument = async (
  req,
  res,
  next
) => {
  try {
    const document =
      await Document.create(req.body);

    res.status(201).json({
      success: true,
      message:
        "Document created successfully",
      data: document,
    });
  } catch (error) {
    next(error);
  }
};

export const updateDocument = async (
  req,
  res,
  next
) => {
  try {
    const document =
      await Document.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    res.json({
      success: true,
      message:
        "Document updated successfully",
      data: document,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDocument = async (
  req,
  res,
  next
) => {
  try {
    const document =
      await Document.findByIdAndDelete(
        req.params.id
      );

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    res.json({
      success: true,
      message:
        "Document deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};