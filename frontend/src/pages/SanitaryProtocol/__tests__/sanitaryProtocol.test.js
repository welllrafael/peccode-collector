import React from 'react';
import { act } from 'react-dom/test-utils';
import { jest } from '@jest/globals';
import { render } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';

import { SanitaryProtocol } from '../sanitaryProtocol';
import { MainSanitaryProtocolDataProvider } from '../../../context/SanitaryProtocolContext';

describe('Testing Sanitary Protocol Component', () => {

    it('should render correctly Sanitary Protocol page', async () => {

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

        MainSanitaryProtocolDataProvider.sanitaryProtocolDataProvider = jest.fn(() => {
            return fakeDate;
        });
        
        const setStateMock = jest.fn();
        const useStateMock = (useState) => [useState, setStateMock];
        
        jest.spyOn(React, "useState").mockImplementation(useStateMock);        
        jest.spyOn(React,"useEffect");
        jest.spyOn(MainSanitaryProtocolDataProvider, "sanitaryProtocolDataProvider").mockImplementation(() => Promise.resolve(fakeDate));    
        
        act(() => {
            render(<HashRouter><SanitaryProtocol /></HashRouter>);                   
        });
        
        expect(await MainSanitaryProtocolDataProvider.sanitaryProtocolDataProvider()).toBe(fakeDate);
    })
});
