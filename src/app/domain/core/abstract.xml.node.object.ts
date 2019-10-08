export interface AbstractXmlNodeObject {

  begin: number;
  end: number;
  value: string;
  sofa: number;
  id: number;
}

export interface AbstractXmlNodeTimeObject {

  begin: number;
  end: number;
  value: string;
  type: string;
  sofa: number;
  id: number;
}
