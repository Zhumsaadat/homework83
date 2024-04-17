import express from 'express';
import User from '../models/User';
import mongoose from 'mongoose';

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
  try {
    const user = new User({
      username:req.body.username,
      password: req.body.password,
    });

    user.generateToken();

    await  user.save();
    return res.send(user);
  }catch (e) {
    if(e instanceof mongoose.Error.ValidationError){
      return res.status(422).send(e);
    }
    next(e);
  }
});

usersRouter.post('/sessions', async (req, res) => {
  const user = await User.findOne({username: req.body.username});

  if(!user) {
    return res.status(400).send({error: "Username or Password not correct!"});
  }
  const isMatch = await user.checkPassword(req.body.password);

  if(!isMatch) {
    return res.status(400).send({error: "Username or Password not correct!"});
  }

  user.generateToken();
  await user.save();

  return res.send({message: "Username and Password correct!", user});

});

usersRouter.post('/secret', async (req, res) => {
  const token = req.get('Authorization');

  if (!token) {
    return res.status(401).send({error: 'No token present'});
  }

  const user = await User.findOne({token});

  if (!user) {
    return res.status(401).send({error: 'Wrong token!'});
  }

  return res.send({
    message: 'Secret message',
    username: user.username
  });
});



export default usersRouter;