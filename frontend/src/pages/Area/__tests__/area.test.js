import React from 'react';
import { act } from 'react-dom/test-utils';
import { jest } from '@jest/globals';
import { render } from '@testing-library/react';
import { Area } from '../area';
import { HashRouter } from 'react-router-dom';
import { MainAreaDataProvider } from '../../../context/AreaContext';

describe('Testing Area Component', () => {

    it('should render correctly Area page', async () => {

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

        MainAreaDataProvider.areaDataProvider = jest.fn(() => {
            return fakeDate;
        });
        
        const setStateMock = jest.fn();
        const useStateMock = (useState) => [useState, setStateMock];
        
        jest.spyOn(React, "useState").mockImplementation(useStateMock);        
        jest.spyOn(React,"useEffect");
        jest.spyOn(MainAreaDataProvider, "areaDataProvider").mockImplementation(() => Promise.resolve(fakeDate));    
        
        act(() => {
            render(<HashRouter><Area /></HashRouter>);                   
        });
        
        expect(await MainAreaDataProvider.areaDataProvider()).toBe(fakeDate);
    })
});
