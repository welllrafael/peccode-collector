import { render } from '@testing-library/react';
import { GrowerAddEdit } from '../../Grower/addedit/grower-addedit';
import '@testing-library/jest-dom';
import React from 'react';
import { jest } from '@jest/globals';
import { MemoryRouter } from 'react-router-dom';

describe('Testing ProdutorAddEdit Component', () => {
    
    it("renders ProdutorAddEdit component without crashing", () => {
        const fakeData = {
            data: {
                struct : {
                    properties: {
                        IE: "int",
                        description: "string",
                        erasCode: "int",
                        establishmentCode: "int",
                        farmId: "int",
                        farmType: "string",
                        growerId: "int",
                        nirfinc: "int",
                        personalIdentifier: "int",
                        status: "bool",
                        tracked: "bool",
                        _id: "objectId"
                    }
                }
            }
        }

        const setStateMock = jest.fn();
        const useStateMock = (useState) => [useState, setStateMock];
        
        jest.spyOn(React, "useState").mockImplementation(useStateMock);

        expect(
            render(    
                <MemoryRouter initialEntries={[{ pathname: '/', state: fakeData }]}>
                  <GrowerAddEdit /> 
                </MemoryRouter>              
            )
          ).toMatchSnapshot();
    });
});
