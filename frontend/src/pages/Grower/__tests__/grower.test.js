import React from 'react';
import { act } from 'react-dom/test-utils';
import { jest } from '@jest/globals';
import { render } from '@testing-library/react';
import { Grower } from '../grower';
import { HashRouter } from 'react-router-dom';
import { MainGrowerDataProvider } from '../../../context/GrowerContext';

describe('Testing Grower Component', () => {

    it('should render correctly Grower page', async () => {

        const fakeDate = [	
            {
                "_id": "620452acd5edc11023060601",
                "growerId": 1,
                "name": "Grower Test",                
                "status": true,
                "personalIdentifier": 123456,
                "IE": 123456,
                "addressId": 123456
            }
        ]

        MainGrowerDataProvider.growerDataProvider = jest.fn(() => {
            return fakeDate;
        });
        
        const setStateMock = jest.fn();
        const useStateMock = (useState) => [useState, setStateMock];
        
        jest.spyOn(React, "useState").mockImplementation(useStateMock);        
        jest.spyOn(React,"useEffect");
        jest.spyOn(MainGrowerDataProvider, "growerDataProvider").mockImplementation(() => Promise.resolve(fakeDate));    
        
        act(() => {
            render(<HashRouter><Grower /></HashRouter>);                   
        });
        
        expect(await MainGrowerDataProvider.growerDataProvider()).toBe(fakeDate);
    })
});
