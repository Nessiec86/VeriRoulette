import axios from 'axios';


class Data {
    constructor() {
      this.Data = axios.create({
        baseURL: 'http://localhost:5000',
        withCredentials: true,
      });
      console.log(`URL of DB ${process.env.REACT_APP_PUBLIC_DOMAIN}`)
      console.log(`URL of DB ${process.env.REACT_APP_PUBLIC_DOMAIN_2}`)
    }
    
      create = (premio) => {
        console.log(premio)
        return this.Data
          .post("data/post", { premio })
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
