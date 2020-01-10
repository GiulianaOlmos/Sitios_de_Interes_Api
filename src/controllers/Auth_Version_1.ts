import { Router, Response, NextFunction } from 'express';
import firebase from '../service/firebase.service';

class AuthVersion1 {

  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  };

  private init() {
    this.router.get('/healt-check', function (req, res: Response, nextFunction: NextFunction) {
      res.status(200).json({ success: true });
    });
    this.router.get('/:email/:password', (req: any, res: Response, next: NextFunction) => this.auth(req, res, next));
    this.router.get('/refresh_token/:email/:password', (req: any, res: Response, next: NextFunction) => this.generateToken(req, res, next));
  };

  async auth(req: any, res: Response, next: NextFunction) {
    try {
      const { params: { email, password } } = req;
      const auth = await firebase.auth().signInWithEmailAndPassword(email, password);
      return res.status(200).json({ auth });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async generateToken(req: any, res: Response, next: NextFunction) {
    try {
      const { params: { email, password } } = req;
      const auth = await firebase.auth().signInWithEmailAndPassword(email, password);
      const token = auth.user;
      return res.status(200).json(token);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

const auth = new AuthVersion1();

export default auth.router;
