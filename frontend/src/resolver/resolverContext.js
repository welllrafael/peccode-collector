import { MainAnimalDataProvider } from '../data/AnimalData';
import { MainFarmDataProvider } from '../data/FarmData';
import { MainGrowerDataProvider } from '../data/GrowerData';
import { MainInputOperationDataProvider } from '../data/InputOperationData';
import { MainSanitaryProtocolDataProvider } from '../data/SanitaryProtocolData';
import { MainSisbovRequestDataProvider } from '../data/SisbovRequestData';
import { MainTraceabilityDataProvider } from '../data/TraceabilityData';

export const ResolverContext = async (route, headerRequest, data, collections) => {
  
  switch (route) {
    case "/SisbovRequestAddEdit":
      return await MainSisbovRequestDataProvider.sisbovRequestDataProvider(type);

    case "/SanitaryProtocolAddEdit":
      return await MainSanitaryProtocolDataProvider.sanitaryProtocolDataProvider(type);

    case "/GrowerAddEdit":
      return await MainGrowerDataProvider.growerDataProvider(type);

    case "/FarmAddEdit":
      return await MainFarmDataProvider.farmDataProvider(type);

    case "/AnimalAddEdit":
      return await MainAnimalDataProvider.animalDataProvider(headerRequest, data, collections);

    case "/InputOperationAddEdit":
      return await MainInputOperationDataProvider.inputOperationDataProvider(headerRequest, data, collections);

    case "/TraceabilityAddEdit":
      return await MainTraceabilityDataProvider.traceabilityDataProvider(headerRequest, data, collections);

  }

};
