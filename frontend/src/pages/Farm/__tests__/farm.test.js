import React from 'react';
import { act } from 'react-dom/test-utils';
import { jest } from '@jest/globals';
import { render } from '@testing-library/react';
import { Farm } from '../farm';
import { HashRouter } from 'react-router-dom';
import { MainFarmDataProvider } from '../../../context/FarmContext';

describe('Testing Farm Component', () => {

    it('should render correctly Farm page', async () => {

        const fakeDate = [
            {
                "_id": "620452acd5edc11023060601",
                "farmId": 1,
                "description": "Farm Test",
                "farmType": "1",
                "personalIdentifier": 1,
                "IE": 123456,
                "status": true,
                "tracked": true,
                "establishmentCode": 1,
                "erasCode": 1,
                "nirfinc": 0,
                "growerId": 1           
            }
        ]

        MainFarmDataProvider.farmDataProvider = jest.fn(() => {
            return fakeDate;
        });
        
        const setStateMock = jest.fn();
        const useStateMock = (useState) => [useState, setStateMock];
        
        jest.spyOn(React, "useState").mockImplementation(useStateMock);        
        jest.spyOn(React,"useEffect");
        jest.spyOn(MainFarmDataProvider, "farmDataProvider").mockImplementation(() => Promise.resolve(fakeDate));    
        
        act(() => {
            render(<HashRouter><Farm /></HashRouter>);                   
        });
        
        expect(await MainFarmDataProvider.farmDataProvider()).toBe(fakeDate);
    })
});
