import { Router, Response, NextFunction } from 'express';
import firebase from '../service/firebase.service';
import firestore from 'firebase/firestore'

class SitesVersion1 {

  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  };

  private init() {
    this.router.get('/healt-check', function (req, res: Response, nextFunction: NextFunction) {
      res.status(200).json({ success: true });
    });
    this.router.get('/get_sites/:email/:password', (req: any, res: Response, next: NextFunction) => this.getSites(req, res, next));
  };

  async getSites(req: any, res: Response, next: NextFunction) {
    try {
      const { params: { email, password } } = req;
      //const auth = await firebase.auth().signInWithEmailAndPassword(email, password);
      const db = await firebase.firestore().colletion('SitiosInteres');
      const sites = await db.add({ id : "iofhaoi" });
      const site = sites.get();
      return res.status(200).json(site);
    } catch (error) {
      if(error === 'unaturozide'){
        return res.status(400).json({ error });
      }
      return res.status(500).json({ error });
    }
  }
}

const sites = new SitesVersion1();

export default sites.router;
