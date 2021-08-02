const router = require('express').Router();
const { Category, Product } = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const responder = require('../../utils/responders/responder');
const postResponder = require('../../utils/responders/postResponder');
const updateResponder = require('../../utils/responders/updateResponder');
const deleteResponder = require('../../utils/responders/deleteResponder');

// The `/api/categories` endpoint

router.get('/', catchAsync(async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  responder(res, await Category.findAll());
}));

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  let id = req.params.id;
  responder(res, await Category.findAll({
    where: {
      id: id
    }
  }));
});

router.post('/', catchAsync(async (req, res) => {
  // create a new category
  console.log(req.body);
  postResponder(res, await Category.create(req.body));
}));

router.put('/:id', catchAsync(async (req, res) => {
  // update a category by its `id` value
  let id = req.params.id;
  console.log(id);
  console.log(req.body);
  updateResponder(res, await Category.update(req.body, {
    where: {
      id: id
    }
  }))
}));

router.delete('/:id', catchAsync(async (req, res) => {
  // delete a category by its `id` value
  let id = req.params.id;
  deleteResponder(res, await Category.destroy({
    where: {
      id: id
    }
  }));
}));

module.exports = router;


