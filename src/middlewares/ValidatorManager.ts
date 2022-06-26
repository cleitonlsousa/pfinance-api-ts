import { validationResult, body } from "express-validator";
import express from "express";
import UserModel from '../models/UserModel'
import AccountModel from "../models/AccountModel";
import CategoryModel from "../models/CategoryModel";
import { TransactionRecurring, AccountType} from '../constants/Constants';

export const validationResultExpress = (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
};

export const userBodyCreateValidator = [
    body('name', 'minimo de 3 caracteres')
        .trim()
        .isLength({min: 3}),
    body('email', 'e-mail incorreto')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', 'minimo de 6 caracteres')
        .trim()
        .isLength({min: 6}),
    validationResultExpress
];

export const bodyLoginValidator = [
    body('email', 'e-mail incorreto')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', 'minimo de 6 caracteres')
        .trim()
        .isLength({min: 6}),
    validationResultExpress
];


export const categoryBodyValidator = [
    body('name', 'minimo de 3 caracteres')
        .trim()
        .isLength({min: 3}),
    body('description', 'minimo de 3 caracteres')
        .trim()
    .isLength({min: 3}),
    validationResultExpress
];

export const accountBodyValidator = [
    body('name', 'minimo de 3 caracteres')
        .trim()
        .isLength({min: 3}),
    body('type', 'required')
        .not()
        .isEmpty()
        .custom(
            (value) => {
                if(!AccountType[value]){
                    throw new Error("Tipo de conta inválida, opções: 'CARTAO', 'CONTA_CORRENTE', 'DINHEIRO'");    
                }
                return value;
            }
        ),
    body('show_in_resume', 'required')
        .not()
        .isEmpty(),
    validationResultExpress
];

export const transactionBodyValidator = [
    body('type', 'tipo invalido')
        .trim()
        .notEmpty()
        .custom((value) => {
                if (value !== 'DEBITO' && value !== 'CREDITO') {
                    throw new Error("Tipo de transação inválido");
                }
                return value;
            }
        ),
    body('value', 'required')
        .trim()
        .notEmpty(),
    body('date', 'required')
        .trim()
        .notEmpty(),
    body('user', 'required')
        .trim()
        .notEmpty()
        .custom(async (value) => {
            const obj = await UserModel.findById(value).lean();
            if (!obj) {
                throw new Error("Usuário inválido");
            }
            return value;
        }),
    body('account', 'required')
        .trim()
        .notEmpty()
        .custom(async (value) => {
                const obj = await AccountModel.findById(value).lean();
                if (!obj) {
                    throw new Error("Conta inválida");
                }
                return value;
        }),
    body('category', 'required')
        .trim()
        .notEmpty()
        .custom(async (value) => {
            const obj = await CategoryModel.findById(value).lean();
            if (!obj) {
                throw new Error("Categoria inválida");
            }
            return value;
        }),
    body('recurring', 'required')
        .trim()
        .notEmpty()
        .custom(
            (value) => {
                if (! TransactionRecurring[value]) {
                    throw new Error("Tipo de intervalo inválido");
                }
                return value;
            }
        ),
    body('split', 'required')
        .trim()
        .notEmpty(),
    validationResultExpress
];