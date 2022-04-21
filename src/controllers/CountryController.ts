import countries from '../data/countries.json'

export const findCountryByname = (name: string) => {
    const country = countries.find(
        c => c.country.toLocaleLowerCase() == name.toLowerCase().trim() // trim para remover os espaçoes em branco, caso tiver   
    )
    
    return country
}