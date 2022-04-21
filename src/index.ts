import { createCanvas } from 'canvas'
import { writeFileSync } from 'fs'
import JsBarcode from 'jsbarcode'
import { join } from 'path'

import { findCompanyByCode } from './controllers/CompanyController'
import { findCountryByname } from './controllers/CountryController'
import products from './data/products.json'
import { calculateCheckDigit } from './utils/EAN13Utils'

// codigo de 13 digitos composto por:
// 3 digitos do pais
// 6 digitos da empresa
// 3 digitos do produto
// 1 digito verificador

products.forEach(p => {
    // para conseguir o codigo do país, primeiro precisa do codigo da empresa

    const company = findCompanyByCode(p.company)
    const country = findCountryByname(company.country)
    let barCode = `${country.code}${company.code}${p.code}`

    // acima gera os 12 primeiros digitos do codigo de barra, falta o digito verificador (o último digito dos 13)

    const checkDigit = calculateCheckDigit(barCode)
    barCode = `${barCode}${checkDigit}` // aqui contatena o barcode com o digito verificador
    
    // gerando o codigo de barras no browser
    const canvas = createCanvas(300, 300) // cria a area do canvas
    JsBarcode(canvas, barCode, {format: 'EAN13'}) // cria o codigo de barras, com os parametros area pra geração, o codigo e o formato do codigo
    
    const buffer = canvas.toBuffer('image/png') // cria em memoria a imagem

    const barcodePath = join(__dirname, 'barcodes', `${barCode}.png`) // indica o caminho para salvar a imagem e o nome e formato da mesma
    writeFileSync(barcodePath, buffer) // grava os codigos de barra no caminho indicado
})

console.log('Juro solenemente não fazer nada de bom')