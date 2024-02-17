import { Router } from 'express';
import ChatManager from "../dao/db/managers/chatManager.js";
const chatManager = new ChatManager();

const routerChat = Router();

routerChat.get("/getMessages", async (req, res) => {
    let response = await chatManager.getMessages();
    if(response){
        res.status(200).send({
            message: response,
        });
    }else{
        res.status(400).send({
            message: response,
        });
    }
});

routerChat.post("/addMessage", async (req, res) => {
    let response = await chatManager.addMessage(req.body);
    if(response.ok){
        res.status(200).send({
          message: `the message was sent`,
        });
    }
  });
  
export default routerChat