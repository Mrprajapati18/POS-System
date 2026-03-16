
import express from "express";
import { MenuCategory, MenuItem, TaxSettings } from "../models/menuSchema.js";

const router = express.Router();
router.get("/categories", async (req, res) => {
  try {
    const categories = await MenuCategory.find({ isActive: true }).sort({
      displayOrder: 1,
    });

    const categoriesWithItems = await Promise.all(
      categories.map(async (category) => {
        const items = await MenuItem.find({
          categoryId: category.id,
          isAvailable: true,
        }).sort({ displayOrder: 1 });

        return {
          id: category.id,
          name: category.name,
          icon: category.icon,
          bgColor: category.bgColor,
          description: category.description,
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            description: item.description,
            image: item.image,
            preparationTime: item.preparationTime,
            isVegetarian: item.isVegetarian,
            calories: item.calories,
            tags: item.tags,
          })),
        };
      })
    );

    res.json({
      success: true,
      data: categoriesWithItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/categories/:id", async (req, res) => {
  try {
    const category = await MenuCategory.findOne({ id: req.params.id });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const items = await MenuItem.find({
      categoryId: category.id,
      isAvailable: true,
    });

    res.json({
      success: true,
      data: { ...category.toObject(), items },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Create category
router.post("/categories", async (req, res) => {
  try {
    const { name, icon, bgColor, description, displayOrder } = req.body;

    const newCategory = new MenuCategory({
      id: `category_${Date.now()}`,
      name,
      icon,
      bgColor,
      description,
      displayOrder: displayOrder || 0,
    });

    await newCategory.save();

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Update category
router.put("/categories/:id", async (req, res) => {
  try {
    const { name, icon, bgColor, description, displayOrder, isActive } =
      req.body;

    const updatedCategory = await MenuCategory.findOneAndUpdate(
      { id: req.params.id },
      {
        name,
        icon,
        bgColor,
        description,
        displayOrder,
        isActive,
      },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete category
router.delete("/categories/:id", async (req, res) => {
  try {
    const deletedCategory = await MenuCategory.findOneAndDelete({
      id: req.params.id,
    });

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Also delete all items in this category
    await MenuItem.deleteMany({ categoryId: req.params.id });

    res.json({
      success: true,
      message: "Category deleted successfully",
      data: deletedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get all items for a category
router.get("/items/category/:categoryId", async (req, res) => {
  try {
    const items = await MenuItem.find({
      categoryId: req.params.categoryId,
      isAvailable: true,
    }).sort({ displayOrder: 1 });

    res.json({
      success: true,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get single item
router.get("/items/:id", async (req, res) => {
  try {
    const item = await MenuItem.findOne({ id: req.params.id });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Create item
router.post("/items", async (req, res) => {
  try {
    const {
      categoryId,
      name,
      description,
      price,
      image,
      preparationTime,
      isVegetarian,
      calories,
      tags,
      displayOrder,
    } = req.body;

    // Check if category exists
    const category = await MenuCategory.findOne({ id: categoryId });
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const newItem = new MenuItem({
      id: `item_${Date.now()}`,
      categoryId,
      name,
      description,
      price,
      image,
      preparationTime: preparationTime || 15,
      isVegetarian: isVegetarian || false,
      calories: calories || 0,
      tags: tags || [],
      displayOrder: displayOrder || 0,
    });

    await newItem.save();

    res.status(201).json({
      success: true,
      message: "Item created successfully",
      data: newItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Update item
router.put("/items/:id", async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      image,
      preparationTime,
      isVegetarian,
      calories,
      tags,
      displayOrder,
      isAvailable,
    } = req.body;

    const updatedItem = await MenuItem.findOneAndUpdate(
      { id: req.params.id },
      {
        name,
        description,
        price,
        image,
        preparationTime,
        isVegetarian,
        calories,
        tags,
        displayOrder,
        isAvailable,
      },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.json({
      success: true,
      message: "Item updated successfully",
      data: updatedItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete item
router.delete("/items/:id", async (req, res) => {
  try {
    const deletedItem = await MenuItem.findOneAndDelete({ id: req.params.id });

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.json({
      success: true,
      message: "Item deleted successfully",
      data: deletedItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// Get tax settings
router.get("/tax-settings", async (req, res) => {
  try {
    const taxSettings = await TaxSettings.findOne({ isActive: true });

    if (!taxSettings) {
      return res.status(404).json({
        success: false,
        message: "Tax settings not found",
      });
    }

    res.json({
      success: true,
      data: taxSettings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Update tax settings
router.put("/tax-settings", async (req, res) => {
  try {
    const { taxName, taxRate } = req.body;

    let taxSettings = await TaxSettings.findOne({ isActive: true });

    if (!taxSettings) {
      taxSettings = new TaxSettings({
        taxName: taxName || "GST",
        taxRate: taxRate || 5.25,
      });
    } else {
      taxSettings.taxName = taxName || taxSettings.taxName;
      taxSettings.taxRate = taxRate || taxSettings.taxRate;
    }

    await taxSettings.save();

    res.json({
      success: true,
      message: "Tax settings updated successfully",
      data: taxSettings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
