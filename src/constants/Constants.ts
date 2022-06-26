
export type RequestIndexed = {
    [key: string]: any;
};

export const AccountType: { [key: string]: string } = {
    'CARTAO': 'Cartão de Crédito', 
    'CONTA_CORRENTE': 'Conta Corrente', 
    'DINHEIRO': 'Dinheiro' 
};

export const VerificationErrorMessage: { [key: string]: string } = {
    'invalid signature': 'Formato JWT inválido',
    'jwt expired': 'JWT expirado',
    'invalid token': 'Token inválido',
    'No Bearer': 'Token no formato Bearer obrigatório',
    'jwt malformed': 'Formato JWT inválido'
};

export const TransactionRecurring: { [key: string]: string } = {
    'UNICO': 'Único',
    'SEMANAL': 'Semanal', 
    '10_DIAS': 'A cada 10 dias',
    '15_DIAS': 'A cada 15 dias',
    'MENSAL': 'Mensal',
    'BIMESTRAL': 'Bimestral', 
    'TRIMESTRAL': 'Trimestral', 
    'QUADRIMESTRAL': 'Quadrimestral',
    'SEMESTRAL': 'Semestral',
    'ANUAL': 'Anual'
};