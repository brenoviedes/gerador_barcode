// com base no codigo de 12 digitos gerado no index, geramos aqui uma função para gerar o código verificador

export const calculateCheckDigit = (barCode: string) => {
    if(barCode.length == 12) {
        let result = 0
        // Se a posição do indice for par, multiplique por 1 e se for impar, multiplique por 3 e some os 12 digitos. Depois pegue a proxima base 10 (ex: 46 a proxima base 10 será 50, mas se já retornar um valor de base 10 (ex: 60), o codigo verificador será 0) e subtraia pelo resultado, será o valor do codigo verificador
        for(let i = 0; i < barCode.length; i++) {
            const multiplier = i % 2 == 0 ? 1 : 3 
            const character = barCode.charAt(i) // retorna o caractere na posição i
            const digit = parseInt(character) // transforma de string para numero

            result += (digit * multiplier)    
        }

        const remaining = result % 10
        const checkDigit = remaining != 0 ? 10 - remaining : remaining

        return checkDigit
    }

    return -1
}