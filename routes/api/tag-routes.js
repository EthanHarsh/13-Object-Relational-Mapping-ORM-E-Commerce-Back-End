const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const responder = require('../../utils/responders/responder');
const postResponder = require('../../utils/responders/postResponder');
const updateResponder = require('../../utils/responders/updateResponder');
const deleteResponder = require('../../utils/responders/deleteResponder');

// The `/api/tags` endpoint

router.get('/', catchAsync(async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  responder(res, await Tag.findAll({
    include: [{
      model: Product
    }]
  }));
}));

router.get('/:id', catchAsync(async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  let id = req.params.id;
  responder(res, await Tag.findAll({
    where: {
      id: id
    },
    include: [{
      model: Product
    }]
  }));
}));

router.post('/', catchAsync(async (req, res) => {
  // create a new tag
  console.log(req.body);
  postResponder(res, await Tag.create(req.body));
}));

router.put('/:id', catchAsync(async (req, res) => {
  // update a tag's name by its `id` value
  let id = req.params.id;
  console.log(id);
  console.log(req.body);
  updateResponder(res, await Tag.update(req.body, {
    where: {
      id: id
    }
  }))
}));

router.delete('/:id', catchAsync(async (req, res) => {
  // delete on tag by its `id` value
  let id = req.params.id;
  deleteResponder(res, await Tag.destroy({
    where: {
      id: id
    }
  }));
}));


module.exports = router;
