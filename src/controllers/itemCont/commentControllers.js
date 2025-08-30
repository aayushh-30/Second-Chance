const { StatusCodes } = require('http-status-codes');
const { ProductItem,Comment } = require('../../models');
const { Logger } = require('../../config');

const makeComment = async (req, res) => {
  const { comment } = req.body;

  if (!comment || comment.trim() === "") {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Please add a comment',
    });
  }

  const user_id = req.decoded_info?.id;
  if (!user_id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'User Not Found, Please Login..',
      data: [],
      error: [],
    });
  }

  const { item_id } = req.params;

  try {
    // Create the comment
    const newComment = await Comment.create({
      text: comment,
      posted_by: user_id,
      item: item_id
    });

    // Fetch the item and update its comment list
    const item = await ProductItem.findById(item_id);
    if (!item) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Item not found',
        data: [],
        error: [],
      });
    }

    item.comments.push(newComment._id);
    await item.save();

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Comment added successfully',
      data: newComment,
      error: [],
      
    });
    Logger.info(`Comment added successfully`);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Something went wrong while adding the comment',
      data: [],
      error: error.message,
    });
  }
};

const updateComment = async (req, res) => {
  const { comment_id } = req.params;
  const { text } = req.body;
  const user_id = req.decoded_info?.id;

  if (!text || text.trim() === "") {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Comment text cannot be empty",
    });
  }

  try {
    const comment = await Comment.findById(comment_id);

    if (!comment) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Comment not found",
      });
    }

    if (comment.posted_by.toString() !== user_id) {
      return res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        message: "Unauthorized to update this comment",
      });
    }

    comment.text = text;
    await comment.save();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Comment updated successfully",
      data: comment,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong while updating the comment",
      error: error.message,
    });
  }
};


const deleteComment = async (req, res) => {
  const { comment_id } = req.params;
  const user_id = req.decoded_info?.id;

  try {
    const comment = await Comment.findById(comment_id);

    if (!comment) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Comment not found",
      });
    }

    if (comment.posted_by.toString() !== user_id) {
      return res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        message: "Unauthorized to delete this comment",
      });
    }

    // Remove the comment ID from item's comment list
    await ProductItem.findByIdAndUpdate(comment.item, {
      $pull: { comments: comment._id },
    });

    // Delete the comment
    await comment.deleteOne();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong while deleting the comment",
      error: error.message,
    });
  }
};


module.exports = {makeComment,updateComment,deleteComment}
