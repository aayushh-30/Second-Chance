const { StatusCodes } = require('http-status-codes');
const { ProductItem } = require('../../models');

const addItem = async (req, res) => {
  const {
    name,
    category,
    condition,
    zipcode,
    age_days,
    age_years,
    description,
    image,
  } = req.body;

  if (
    !name ||
    !category ||
    !condition ||
    !zipcode ||
    age_days == null ||
    age_years == null ||
    !description.trim() ||
    !image
  ) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'All fields are required',
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

  try {
    const newItem = await ProductItem.create({
      name,
      category,
      condition,
      posted_by: user_id,
      zipcode,
      date_added: new Date(),
      age_days,
      age_years,
      description,
      image,
    });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Item added successfully',
      data: newItem,
      error: [],
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Something went wrong while adding the item',
      data: [],
      error: error.message,
    });
  }
};


const updateItem = async (req, res) => {
  try {
    const { item_id } = req.params;

    if (!item_id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Item ID is required',
      });
    }

    const item = await ProductItem.findById(item_id);

    if (!item) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'No Item Found',
      });
    }

    const {
      name,
      category,
      condition,
      zipcode,
      age_days,
      age_years,
      description,
      image,
    } = req.body;

    const user_id = req.decoded_info?.id;

    if (!user_id) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    // check if item.user_id == user_id to restrict updates to owner only
    if (item.user_id.toString() !== user_id) {
      return res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        message: 'You are not allowed to update this item',
      });
    }

    // Update only the fields provided in request
    if (name) item.name = name;
    if (category) item.category = category;
    if (condition) item.condition = condition;
    if (zipcode) item.zipcode = zipcode;
    if (age_days !== undefined) item.age_days = age_days;
    if (age_years !== undefined) item.age_years = age_years;
    if (description) item.description = description;
    if (image) item.image = image;

    await item.save();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Item updated successfully',
      data: item,
    });

  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

const deleteItem = async (req,res) => {
  try {
    const { item_id } = req.params;

    if (!item_id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Item ID is required',
      });
    }

    const item = await ProductItem.findById(item_id);

    if (!item) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'No Item Found',
      });
    }

    item.available = false;
    await item.save();
    res.status(StatusCodes.OK).json({
      success : true,
      message : "Item Deleted",
      data : [],
      error : []
    })
    
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
    
  }
}


const getItems = async (req, res) => {
  try {
    const items = await ProductItem.find({ available: true });

    if (!items || items.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'No Items Found',
        data: [],
        error: [],
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Items found',
      data: items,
      error: [],
    });

  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
      data: [],
    });
  }
};


const getItemsByCategory = async (req, res) => {
  try {
    const { category } = req.body;
    if(!category){
      return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Plese select a category',
      error: [],
      data: [],
    });

    }
    const items = await ProductItem.find({$and:[{category : category},{available : true}] });

    if (!items || items.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'No Items Found',
        data: [],
        error: [],
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Items found',
      data: items,
      error: [],
    });

  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
      data: [],
    });
  }
};

const getItemsById = async (req, res) => {
  try {
    const { id } = req.params;
    if(!id){
      return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Plese fill id',
      error: [],
      data: [],
    });

    }
    const item = await ProductItem.findById(id);

    if (!item || item.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'No Items Found',
        data: [],
        error: [],
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Items found',
      data: item,
      error: [],
    });

  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
      data: [],
    });
  }
};

const getItemsOf_A_User = async (req, res) => {
  try {
    const { id } = req.decoded_info;

    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'No ID found. Please login.',
        error: [],
        data: [],
      });
    }

    const items = await ProductItem.find({ posted_by: id });

    if (!items || items.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'No items found for this user.',
        data: [],
        error: [],
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Items found.',
      data: items,
      error: [],
    });

  } catch (error) {
    console.error('Error in getItemsOfA_User:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Something went wrong.',
      error: [error.message],
      data: [],
    });
  }
};


module.exports = { 
  addItem,
  updateItem,
  deleteItem,
  getItems,
  getItemsByCategory,
  getItemsById,
  getItemsOf_A_User,
 };
