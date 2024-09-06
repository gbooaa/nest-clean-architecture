export const getParametersQueryPagination = (page = 1, rowsPerPage = 10): PaginationParams => {
  isNaN(page) && (page = 1);
  isNaN(rowsPerPage) && (rowsPerPage = 10);

  if (page < 1) page = 1;
  if (rowsPerPage < 1) rowsPerPage = 50;

  return {
    currentPage: page,
    skip: (page - 1) * rowsPerPage,
    limit: rowsPerPage,
  };
};

export const paginateQuery = <T>(data: PaginateList): QueryPaginated<T> => {
  return {
    list: data.items,
    totalItems: data.totalItems || 0,
    rowsPerPage: data.rowsPerPage,
    currentPage: data.currentPage,
    pages: Math.ceil((data.totalItems || 0) / data.rowsPerPage),
    orderBy: data?.orderBy,
    orderType: data?.orderType,
  };
};

export interface PaginateList {
  items: any[];
  totalItems: number;
  rowsPerPage: number;
  currentPage: number;
  orderBy?: string;
  orderType?: string;
}

export interface QueryPaginated<T = any> {
  list: T[];
  totalItems: number;
  rowsPerPage: number;
  currentPage: number;
  pages: number;
  orderBy?: string;
  orderType?: string;
}

export interface PaginationParams {
  currentPage: number;
  skip: number;
  limit: number;
}

/**
 * QueryStrings in controller:
 *   page (number), numero de pagina
 *   items (number) cantidad de registros a mostrar

 * Obtienes los parámetros para ejecutar junto con la consulta
 *   const { skip, limit, currentPage } = getParametersQueryPagination(page, items);
 *   const query = this.userModel.find().skip(skip).limit(limit);
 * 
 * Retornas la data formateada
 *   return paginateQuery({
       items: query,
       totalItems: query.length,
       rowsPerPage: limit,
       currentPage: currentPage,
     });
 */
