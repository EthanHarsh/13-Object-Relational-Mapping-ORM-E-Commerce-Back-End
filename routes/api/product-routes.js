const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const responder = require('../../utils/responders/responder');
const postResponder = require('../../utils/responders/postResponder');
const updateResponder = require('../../utils/responders/updateResponder');
const deleteResponder = require('../../utils/responders/deleteResponder');

// The `/api/products` endpoint

// get all products
router.get('/', catchAsync(async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  responder(res, await Product.findAll({
    include: [{
      model: Category
    },
    {
      model: Tag
    }]
  }));
}));

router.get('/:id', catchAsync(async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  let id = req.params.id;
  responder(res, await Product.findAll({
    where: {
      id: id
    },
    include: [{
      model: Category
    },
    {
      model: Tag
    }]
  }));
}));

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', catchAsync(async (req, res) => {
  // delete a product by its `id` value
  let id = req.params.id;
  deleteResponder(res, await Product.destroy({
    where: {
      id: id
    }
  }));
}));

module.exports = router;