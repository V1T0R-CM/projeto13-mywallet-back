import db from '../db.js';
import dayjs from "dayjs";

export async function deposit(req, res) {
    const { authorization } = req.headers;
    const token = authorization.replace('Bearer ', '');
    const session =  await db.collection('sessions').findOne({ token });
    const user =  await db.collection('users').findOne({ _id: session.userId });

    db.collection('users').updateOne({ name: user.name }, { $set: {"transactions": [...user.transactions, {...req.body, type: "deposit", date: dayjs().format('DD/MM/YYYY')}]}});
    db.collection('users').updateOne({ token: token }, { $set: {"lastStatus": Date.now()}});
    res.sendStatus(201);
}

export async function withdraw(req, res) {
    const { authorization } = req.headers;
    const token = authorization.replace('Bearer ', '');
    const session =  await db.collection('sessions').findOne({ token });
    const user =  await db.collection('users').findOne({ _id: session.userId });
    let balance=0;

    for(let transaction of user.transactions){
        if(transaction.type === "deposit"){
            balance+=Number(transaction.value);
        }
        else{
            balance-=Number(transaction.value);
        }
    }


    if(Number(req.body.value) > balance){
        return res.sendStatus(422);
    }

    db.collection('users').updateOne({ name: user.name }, { $set: {"transactions": [...user.transactions, {...req.body, type:"withdraw", date: dayjs().format('DD/MM/YYYY')}]}});
    db.collection('users').updateOne({ token: token }, { $set: {"lastStatus": Date.now()}});
    res.sendStatus(201);
}