import companies from '../data/companies.json'

export const findCompanyByCode = (code: string) => {
    const company = companies.find(c => c.code == code) // percorre o array por elemento procurando pela comparação imposta, no caso procurar no objeto.code se seu valor é igual ao código inserido como argumento de busca na função
    return company
}