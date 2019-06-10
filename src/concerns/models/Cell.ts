export interface CellContent {
  background: {
    // for testing:
    // https://image4.owler.com/logo/indiana-veneers_owler_20160228_140236_large.png
    // http://storage.proboards.com/2596080/images/JztQZOZwKdK0WZ0BjkIT.png
    // https://content.invisioncic.com/j283755/monthly_2018_10/1937832181_Flagofcanada.thumb.jpg.a97598b40e1f8c5c3c3040489881c617.jpg
    image: string;
    color: string;
  };
}

export default class Cell {
  public x: number;
  public y: number;
  public content: CellContent;

  constructor(x: number, y: number, contents?: Partial<CellContent>) {
    this.x = x;
    this.y = y;
    const safeContents = Object.assign({ background: {} }, contents || {});
    this.content = {
      ...safeContents,
      background: {
        image: '',
        color: '',
        ...safeContents.background,
      },
    };
  }
}
