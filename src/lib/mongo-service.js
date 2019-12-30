import axios from 'axios';

class Data {
    constructor() {
      this.Data = axios.create({
        baseURL: process.env.REACT_APP_PUBLIC_DOMAIN_2,
        withCredentials: true,
      });
    }
    
      create = (premio, ip, cordsLat, cordsLon) => {
        console.log(premio, ip, cordsLat, cordsLon)
        return this.Data
          .post("data/post", { premio, ip, cordsLat, cordsLon })
          .then(({ data }) => data);
      }

      read = () => {
        return this.Data
          .get("data/list")
          .then (({ data }) => data);
      }
    }

const data = new Data();

export default data;
