import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch} from 'redux';

import {ChangeActionAC, ChangeCurrencyFieldAC, ChangeCurrentCurrencyAC, CurrencyReducersTypes} from './store/actions';
import {selectAllState} from './store/selectors';
import {CurrencyType} from './store/currencyReducer';
import {CurrencyExchange} from './CurrencyExchange';

export const CurrencyExchangeContainer: React.FC = () => {

    const dispatch = useDispatch<Dispatch<CurrencyReducersTypes>>()
    const {currencies, currentCurrency, isBuying, amountOfBYN, amountOfCurrency} = useSelector(selectAllState)

    let currencyRate: number = 0;
    const currenciesName = currencies.map((currency: CurrencyType) => {
        if (currency.currencyName === currentCurrency) {
            currencyRate = isBuying ? currency.buyRate : currency.sellRate;
        }
        return currency.currencyName;
    });

    const changeCurrencyField = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value;
        if (!isFinite(+value)) return;
        if (e.currentTarget.dataset.currency) {
            const trigger: string = e.currentTarget.dataset.currency;
            if (trigger === 'byn') {
                if (value === '') {
                    dispatch(ChangeCurrencyFieldAC(value, value));
                } else {
                    dispatch(ChangeCurrencyFieldAC(value, (+Number(value).toFixed(2) / currencyRate).toFixed(2)));
                }
            } else {
                if (value === '') {
                    dispatch(ChangeCurrencyFieldAC(value, value));
                } else {
                    dispatch(ChangeCurrencyFieldAC((+Number(value).toFixed(2) * currencyRate).toFixed(2), value));
                }
            }
        }
    };
    const changeAction = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.currentTarget.dataset.action === 'buy' ? dispatch(ChangeActionAC(true)) : dispatch(ChangeActionAC(false));
    };

    const changeCurrentCurrency = (e: React.MouseEvent<HTMLLIElement>) => {
        e.currentTarget.dataset.currency && dispatch(ChangeCurrentCurrencyAC(e.currentTarget.dataset.currency));
    };

    return (
        <>
            <CurrencyExchange
                currenciesName={currenciesName}
                currentCurrency={currentCurrency}
                currencyRate={currencyRate}
                isBuying={isBuying}
                amountOfBYN={amountOfBYN}
                amountOfCurrency={amountOfCurrency}
                changeCurrencyField={changeCurrencyField}
                changeAction={changeAction}
                changeCurrentCurrency={changeCurrentCurrency}
            />
        </>
    );
};
