const Ideas = require("../models/ideasModel");

const createIdeas = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const createdidea = await Ideas.create({
      title,
      description,
      tags,
    });
    res.status(200).json({ message: "idea created", idea: createdidea });
  } catch (error) {
    res.status(400).json({ message: "Failed to create ideas" });
  }
};

const getAllIdeas = async (req, res) => {
  try {
    const getIdeas = await Ideas.find();
    const ideasList = getIdeas.map((ide) => {
      return {
        title: ide.title,
        description: ide.description,
        _id: ide._id,
      };
    });
    res.status(200).json({ message: "ideas retrieved", idea: ideasList });
  } catch (error) {
    res.status(400).json({ message: "Failed to get ideas" });
  }
};

const getIdeasByTag = async (req, res) => {
  // If your tags field is an array in the schema, and you want to find ideas that contain a tag, change this:
  // const Ideasbytag = await Ideas.find({ tags: { $in: [tags] } });

  try {
    // with params
    // with query at the bottom of the page cause it's more flexible
    const { tags } = req.params;
    const Ideasbytag = await Ideas.find({ tags });
    res.status(200).json({ message: "ideas retrieved", idea: Ideasbytag });
  } catch (error) {
    res.status(400).json({ message: "Failed to get ideas" });
  }
};

const updateIdeas = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const { id } = req.params;
    const updatedIdea = await Ideas.findByIdAndUpdate(
      id,
      {
        title,
        description,
        tags,
      },
      { new: true }
    );
    res.status(200).json({ message: "idea updated", idea: updatedIdea });
  } catch (error) {
    res.status(400).json({ message: "Failed to get ideas" });
  }
};

const deleteIdeas = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteidea = await Ideas.findByIdAndDelete(id);
    res.status(200).json({ message: "idea deleted", idea: deleteidea });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete ideas" });
  }
};

module.exports = {
  createIdeas,
  getAllIdeas,
  getIdeasByTag,
  updateIdeas,
  deleteIdeas,
};

// This is a small package that patches Express to automatically catch rejected promises in async route handlers without wrapping everything in try-catch.
// require("express-async-errors"); // just require it once at the top

// app.get("/route", async (req, res) => {
//   // if this throws, express-async-errors catches it automatically
//   const data = await someAsyncFunction();
//   res.json(data);
// });

// router.get("/ideas", async (req, res) => {
//when using more filter
//   const { tag, title, createdAfter } = req.query;

//   const filter = {};

//   if (tag) {
//     filter.tag = tag;
//   }

//   if (title) {
//     filter.title = { $regex: title, $options: "i" }; // Case-insensitive match
//   }

//   if (createdAfter) {
//     filter.createdAt = { $gt: new Date(createdAfter) };
//   }

//   try {
//     const ideas = await Idea.find(filter);
//     res.status(200).json(ideas);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// });
