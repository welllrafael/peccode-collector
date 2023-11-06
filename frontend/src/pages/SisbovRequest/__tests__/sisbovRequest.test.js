import React from 'react';
import { act } from 'react-dom/test-utils';
import { jest } from '@jest/globals';
import { render } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { MainSisbovRequestDataProvider } from '../../../context/SisbovRequestContext';
import { SisbovRequest } from '../sisbovRequest';

describe('Testing SolicitacaoSisbov Component', () => {
    
    it("renders SolicitacaoSisbov component without crashing", async () => {
        const fakeDate = [	
            {
                "_id": "620452acd5edc11023060601",
                "areaId": 1,
                "farmId": 1,                
                "areaTypeId": 1,
                "farmSectorId": 123456,
                "description": "Area Test",
                "status": true
            }
        ]

        MainSisbovRequestDataProvider.sisbovRequestDataProvider = jest.fn(() => {
            return fakeDate;
        });
        
        const setStateMock = jest.fn();
        const useStateMock = (useState) => [useState, setStateMock];
        
        jest.spyOn(React, "useState").mockImplementation(useStateMock);        
        jest.spyOn(React,"useEffect");
        jest.spyOn(MainSisbovRequestDataProvider, "sisbovRequestDataProvider").mockImplementation(() => Promise.resolve(fakeDate));    
        
        act(() => {
            render(<HashRouter><SisbovRequest /></HashRouter>);                   
        });
        
        expect(await MainSisbovRequestDataProvider.sisbovRequestDataProvider()).toBe(fakeDate);
    });
});
