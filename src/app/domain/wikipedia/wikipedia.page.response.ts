export interface WikipediaPageResponse {

  batchcomplete: string;

  query: {
    pages: {
      [key: number]: {
        pageid: number,
        ns: number,
        title: string,
        extract: string;
      }
    }
  };
}

