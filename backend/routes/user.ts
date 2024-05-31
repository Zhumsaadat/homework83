import express from 'express';
import User from '../models/User';
import mongoose from 'mongoose';
import { OAuth2Client } from 'google-auth-library';
import config from '../config';
import { imagesUpload } from '../multer';

const usersRouter = express.Router();
const client = new OAuth2Client(config.google.clientID);

usersRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.displayName,
      avatar:  req.file ? req.file.filename : null,
    });

    user.generateToken();
    await user.save();

    return res.send({ message: 'Registered successfully!', user });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});

usersRouter.post("/google", async (req, res, next) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).send({ error: "Google login error!" });
    }

    const email = payload["email"];
    const id = payload["sub"];
    const displayName = payload["name"];

    if (!email) {
      return res
        .status(400)
        .send({ error: "Not enough user data to continue" });
    }

    let user = await User.findOne({ googleID: id });

    if (!user) {
      user = new User({
        username: email,
        password: crypto.randomUUID(),
        googleID: id,
        displayName,
      });
    }

    user.generateToken();

    await user.save();

    return res.send({ message: "Login with Google successful!", user });
  } catch (e) {
    return next(e);
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  try{
    const user = await User.findOne({email: req.body.email});

    if (!user) {
      return res.status(400).send({error: 'E-mail or Password not correct!'});
    }
    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(400).send({error: 'E-mail or Password not correct!'});
    }

    user.generateToken();
    await user.save();

    return res.send({message: 'E-mail and Password correct!', user});
  }catch (e) {
    next(e)
  }

});

usersRouter.delete('/sessions', async (req, res, next) => {
  try {
    const headerValue = req.get('Authorization');
    const successMessage = { message: 'Successfully logout' };

    if (!headerValue) {
      return res.send(successMessage);
    }

    const [, token] = headerValue.split(' ');

    const user = await User.findOne({ token });

    if (!user) {
      return res.send(successMessage);
    }

    user.generateToken();
    await user.save();

    return res.send(successMessage);
  } catch (e) {
    return next(e);
  }
});


export default usersRouter;