const express = require('express');
const router = express.Router();

const upload = require("../middlewares/multer");


// importo le funzioni del controller
const movieController = require('../controllers/movieController');



// rotte di CRUD di posts
// index
router.get('/', movieController.index);

// show
router.get('/:id', movieController.show);

// store review
router.post('/:id/reviews', movieController.storeReview);

// store book
router.post('/', upload.single('image'), movieController.store);



module.exports = router;



// store
// router.post('/', movieController.store);
// update
// router.put('/:id', movieController.update);

// modify
// router.patch('/:id', function (req, res) {
//     res.send('Modifica parziale del post numero ' + req.params.id);
// });
// destroy
// router.delete('/:id', movieController.destroy);