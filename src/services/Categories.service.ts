import requestData from "../helpers/request";
import { IQuery } from "../components/DataTable/dataTable.interface";

const LIMIT = 10;
const PAGE = 1;

const DEFAULT_QUERY = `limit=${LIMIT}&page=${PAGE}`

/*
 * getAll
 TODO: index
 TODO: create
 TODO: update
 TODO: delete
*/

function getAll<Category>( query:IQuery): Promise<Category> {

    return requestData({
        endpoint: `/category?${query ? query : DEFAULT_QUERY }`
    }).then(response => response);

}


export const categoryService = {
    getAll
}