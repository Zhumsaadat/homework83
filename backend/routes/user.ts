import express from 'express';

const userRouter = express.Router();

userRouter.post('/', (req, res, next) => {
  try {

  }catch (e) {
    next(e);
  }
})