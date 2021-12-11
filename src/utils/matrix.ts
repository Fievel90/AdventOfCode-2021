export const getMatrixRow = <C>(row: number) => (matrix: C[][]): C[] => matrix[row];

export const getMatrixColumn = <C>(column: number) =>
  (matrix: C[][]): C[] =>
    matrix.reduce((carry, row) => carry.concat(row[column]), []);

export const transposeRowsAndColumns = <C>(matrix: C[][]) => {
  const [row] = matrix
  return row.map((_, column) => matrix.map(row => row[column]));
};
