import { getAxios } from '../../common/axios';
import config from '../../config';

export default class SwapiProxy {
  axios: any;

  constructor() {
    this.axios = getAxios({ baseUrl: config.SWAPI_URL });
  }

  async getPeople() {
    const { data } = await this.axios.get('/people');
    return data.results;
  }
}
