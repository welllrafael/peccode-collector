import { render } from '@testing-library/react';
import { AnimalAddEdit } from '../../Animal/addedit/animal-addedit';
import '@testing-library/jest-dom';
import React from 'react';
import { jest } from '@jest/globals';
import { MemoryRouter } from 'react-router-dom';

describe('Testing AnimalAddEdit Component', () => {
    let fakeData = {};
    let fakeState = {};

    beforeAll(async () => {
        fakeData = {
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

        fakeState = {
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
    })

    beforeEach(() => {
        const setStateMock = jest.fn();
        const useStateMock = (useState) => [useState, setStateMock];
        
        jest.spyOn(React, "useState").mockImplementation(useStateMock);
    })

    it("renders AnimalAddEdit component without crashing", () => {
       
        expect(
            render(    
                <MemoryRouter initialEntries={[{ pathname: '/', state: fakeData }]}>
                  <AnimalAddEdit /> 
                </MemoryRouter>              
            )
          ).toMatchSnapshot()
    });

    it("renders AnimalAddEdit component without data", () => {
       
        expect(
            render(    
                <MemoryRouter initialEntries={[{ pathname: '/', state: fakeState }]}>
                  <AnimalAddEdit /> 
                </MemoryRouter>              
            )
          ).toMatchSnapshot()
    });

});
