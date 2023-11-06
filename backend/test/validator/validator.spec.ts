import { BSON } from 'realm';
import { AnimalGenericDTO } from '../../src/dto/AnimalGeneric.dto';
import { PostAnimalDTO } from '../../src/dto/animal.dto';
import { validatorDto } from '../../src/validator/validator';

describe('Validator', () => {
    let animaRequest: AnimalGenericDTO;
    const idFake: BSON.UUID = new BSON.UUID("bdcf8f23-9c08-43e8-846d-26aada51612e");

    beforeAll(async () => {
        animaRequest = {
            id: idFake
        }
    });
    it('Should be work! Shouldnt return error', async () => {                                 
        
        const error = await validatorDto(AnimalGenericDTO, animaRequest);

        expect(error)
        .toBe(undefined);
    });

    it('Should be work! Should return error', async () => {                                 
        
        const error = await validatorDto(PostAnimalDTO, animaRequest);

        expect(error.status)
        .toBe(400);
    });

});
