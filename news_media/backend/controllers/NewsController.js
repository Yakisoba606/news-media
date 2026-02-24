const News = require("../models/News");
const mongoose = require("mongoose");

const NewsController = {
  index: async (req, res) => {
    let page = req.query.page;
    let limit = 5;

    let news = await News.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    let totalNewsCount = await News.countDocuments();
    let totalPageCount = Math.ceil(totalNewsCount/limit);

    let dataLink = {
      previousPage: page == 1 ? false : true ,
      nextPage: totalPageCount == page ? false : true ,
      currentPage: 1,
      loopLinks: [],
    };

    for(i=0;i<totalPageCount;i++){
      let number = i+1;
      dataLink.loopLinks.push( { loopNumber : number } );
    }

    let response = {
      dataLink : dataLink , 
      data : news
    }

    return res.status(200).json(response);
  },
  store: async (req, res) => {
    const { title, description, author, types } = req.body;
    const news = await News.create({ title, description, author, types });
    return res.json(news);
  },
  show: async (req, res) => {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Not a Valid Id..." });
      }

      let news = await News.findById(id);

      if (!news) {
        return res.status(400).json({ message: "There is no news..." });
      }

      return res.status(200).json(news);
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error..." });
    }
  },
  destroy: async (req, res) => {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Not a Valid Id..." });
      }

      let news = await News.findByIdAndDelete(id);

      if (!news) {
        return res.status(400).json({ message: "There is no news..." });
      }

      return res.status(200).json({
        data: news,
        message: "Delete success",
      });
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error..." });
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Not a Valid Id..." });
      }

      let news = await News.findByIdAndUpdate(id, { ...req.body });
      // let news = await News.findByIdAndUpdate(id , { title, description, author, type } );

      if (!news) {
        return res.status(400).json({ message: "There is no news..." });
      }

      let updateNews = await News.findById(id);

      return res.status(200).json({
        data: news,
        updateNews,
        message: "Update success",
      });
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error..." });
    }
  },
};

module.exports = NewsController;
