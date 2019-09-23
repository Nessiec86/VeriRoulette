import axios from 'axios';


class Data {
    constructor() {
        this.Data = axios.create({
          baseURL: process.env.PUBLIC_DOMAIN,
          withCredentials: true
        });
      }
    
      create = (data) => {
        const { premio } = data;
        return this.Data
          .post("/canvas", { premio })
          .then(({ data }) => data);
      }
    }

const data = new Data();

export default data;
