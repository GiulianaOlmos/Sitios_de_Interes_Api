import express from 'express';
import SitesRouterV1 from './controllers/Sites_Version_1';
import AuthRouterV1 from './controllers/Auth_Version_1';

class App {
  
  express: any;

  constructor() {
    this.express = express();
    this.routes();
  }

  private routes(): void {
    this.express.get('/health-check', (_req: any, res: any) => res.json({ success: true }));
    this.express.use('/api/v1/auth', AuthRouterV1);
    this.express.use('/api/v1/sdi_sites', SitesRouterV1 );
  }
  
}

export default new App().express;