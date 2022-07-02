import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import db from '../db.js';

setInterval(async()=>{
    const sessions=await db.collection("sessions").find().toArray();
    for(let session of sessions){
        if(Date.now()-session.lastStatus>600000){
            db.collection("sessions").remove(session);
        }
    }
}, 30000);

export async function signUp(req, res) {
  const { name, email, password } = req.body;
  const passwordHash = bcrypt.hashSync(password, 10);

  await db.collection('users').insertOne({ name: name, email: email, password: passwordHash });

  res.sendStatus(201);
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  const user = await db.collection('users').findOne({ email });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = uuid();

    await db.collection('sessions').insertOne({ token, userId: user._id, lastStatus:Date.now()});

    res.status(201).send(token);
  } else {
    res.sendStatus(401);
  }
}