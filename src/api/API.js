import HTTP from "./HTTP";
import axios from 'axios';

export default class GansoService {
   
    static async GetProductById(idProduct) {
        const url = `http://localhost:3000/produto/${idProduct}`;
        try {
          const response = await axios.get(url);
      
          return response.data;
        } catch (error) {
          console.error('Erro ao buscar dados do produto pelo id:', error);
          throw error;
        }
    }

    static async GetProducts() {
      const url = `http://localhost:3000/produtos`;
      try {
        const response = await axios.get(url);
    
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar todos produtos: ', error);
        throw error;
      }
  }

    static async GetProductByCodeBar(codebar) {
        const url = `http://localhost:3000/produto/codigo_barra/${codebar}`;
        try {
          const response = await axios.get(url);
      
          return response.data;
        } catch (error) {
          console.error('Erro ao buscar dados do produto pelo código de barras:', error);
          throw error;
        }
    }


  static async getProductBySearch(queryString) {
      const url = `http://localhost:3000/produto/buscar/${queryString}`;
      try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar dados do produto pela consulta:', error);
        throw error;
      }
    }
}