import { Entity } from './Entity';

class StarWarsUniverse {
  constructor() {
    this.rootUrl = 'https://swapi.boom.dev/api';
    this.entities = [];
  }

  async init() {
    try {
      const response = await fetch(this.rootUrl);
      const data = await response.json();

      if (data) {
        for (const [entity, url] of Object.entries(data)) {
          await this.fetchData(entity, url);
        }
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.err(e);
      throw Error(`Error while fetching data from ${this.rootUrl}`);
    }
  }

  async fetchData(name, url) {
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.results) {
        this.entities.push(new Entity(name, data.results));
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.err(e);
      throw new Error(`Error while fetching data for entity : ${name} for URL : ${url}`);
    }
  }
}

export { StarWarsUniverse };
