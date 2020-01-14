import { Router, Response, NextFunction } from 'express';
import {firebase} from '../service/firebase.service';

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
    this.router.get('/get_sites_just_name_id/:email/:password', (req: any, res: Response, next: NextFunction) => this.getSitesJustNameAndId(req, res, next));
    this.router.get('/get_sites_by_name/:email/:password/:name', (req: any, res: Response, next: NextFunction) => this.getSitesByName(req, res, next));
    this.router.get('/get_sites_by_id/:email/:password/:id', (req: any, res: Response, next: NextFunction) => this.getSitesById(req, res, next));
    this.router.get('/update_sites_id/:email/:password/:description/:id/:name/:lat/:long/:image', (req: any, res: Response, next: NextFunction) => this.updateSites(req, res, next));
    this.router.get('/delete_sites_by_id/:email/:password/:id', (req: any, res: Response, next: NextFunction) => this.deleteSitesById(req, res, next));
  };


  //Obtener todos los sitios
  async getSites(req: any, res: Response, next: NextFunction) {
    try {
      const { params: { email, password } } = req;
      const auth = await firebase.auth().signInWithEmailAndPassword(email, password);
      const ref = firebase.firestore()
      const documents = await (await ref.collection('SitiosInteres').orderBy("id").limit(25).get()).docs 
      var sitios = []
      for(var i = 0; i< documents.length; i++){
        sitios.push(documents[i].data())
      }
      console.log(sitios) 
      return res.status(200).json(sitios)
    } catch (error) {
      if(error === 'unathorized'){
        return res.status(400).json({ error });
      }
      return res.status(500).json({ error });
    }
  }

  //Obtener todos los sitios solo nombre y ID
  async getSitesJustNameAndId(req: any, res: Response, next: NextFunction) {
    try {
      const { params: { email, password } } = req;
      const auth = await firebase.auth().signInWithEmailAndPassword(email, password);
      const ref = firebase.firestore()
      const documents = await (await ref.collection('SitiosInteres').get()).docs 
      var sitiosFiltrados = documents.map( function(document){
        var sitio = {
        id : document.data().id,
        nombre: document.data().nombre,
        }
        return sitio;
      })
      console.log(sitiosFiltrados) 
      return res.status(200).json(sitiosFiltrados)
    } catch (error) {
      if(error === 'unathorized'){
        return res.status(400).json({ error });
      }
      return res.status(500).json({ error });
    }
  }

  //Filtrar los sitios por Nombre
  async getSitesByName(req: any, res: Response, next: NextFunction) {
    try {
      const { params: { email, password, name } } = req;
      const auth = await firebase.auth().signInWithEmailAndPassword(email, password);
      const ref = firebase.firestore()
      var sitiosFiltrados = await (await ref.collection('SitiosInteres').where('nombre', "==", name).get()).docs; 
      var sitios = []
      for(var i = 0; i< sitiosFiltrados.length; i++){
        sitios.push(sitiosFiltrados[i].data())
      }
      console.log(sitios)  
      return res.status(200).json(sitios)
    } catch (error) {
      if(error === 'unathorized'){
        return res.status(400).json({ error });
      }
      return res.status(500).json({ error });
    }
  }

  //Obtener solo los sitios por ID
  async getSitesById(req: any, res: Response, next: NextFunction) {
    try {
      const { params: { email, password, id } } = req;
      const auth = await firebase.auth().signInWithEmailAndPassword(email, password);
      const ref = firebase.firestore()
      const documents = await (await ref.collection('SitiosInteres').get()).docs 
      console.log(documents[id].data()) 
      return res.status(200).json(documents[id].data())
    } catch (error) {
      if(error === 'unathorized'){
        return res.status(400).json({ error });
      }
      return res.status(500).json({ error });
    }
  }

  //Crear y modificar sitios por id
  async updateSites(req: any, res: Response, next: NextFunction) {
    try {
      const { params: { email, password, description, id, name, lat, long, image } } = req;
      const auth = await firebase.auth().signInWithEmailAndPassword(email, password);
      const ref = firebase.firestore();
      var sitio = {
        descripcion : description, 
        id : parseInt(id),
        nombre : name,
        ubicacion : {
          _lat : parseFloat(lat),
          _long : parseFloat(long),
        },
        url_imagen : image
      }
      var sitioUpdated = await ref.collection('SitiosInteres').doc(id).set(sitio);

      console.log(sitio) 
      return res.status(200).json(sitio)
    } catch (error) {
      if(error === 'unathorized'){
        return res.status(400).json({ error });
      }
      return res.status(500).json({ error });
    }
  }

  async deleteSitesById(req: any, res: Response, next: NextFunction) {
    try {
      const { params: { email, password, id} } = req;
      const auth = await firebase.auth().signInWithEmailAndPassword(email, password);
      const ref = firebase.firestore();
      var sitioUpdated = await ref.collection('SitiosInteres').doc(id).delete();
      console.log("Sitio con id " + id + " eliminado") 
      return res.status(200).json("Sitio de id" + id + "eliminado")
    } catch (error) {
      if(error === 'unathorized'){
        return res.status(400).json({ error });
      }
      return res.status(500).json({ error });
    }
  }
}

const sites = new SitesVersion1();

export default sites.router;
