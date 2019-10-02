export interface WikipediaRandomIdResponse {
  batchcomplete: string;
  continue: {
    grncontinue: number,
    continue: string
  };
  query: {
    pages: {
      [key: number]: {
        pageid: number;
        ns: number;
        title: string;
      }
    }
  };
}
