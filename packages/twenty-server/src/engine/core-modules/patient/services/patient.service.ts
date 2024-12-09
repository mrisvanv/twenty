import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import axios from 'axios';
import { Repository } from 'typeorm';

import { EnvironmentService } from 'src/engine/core-modules/environment/environment.service';
import { Workspace } from 'src/engine/core-modules/workspace/workspace.entity';
import { TwentyORMManager } from 'src/engine/twenty-orm/twenty-orm.manager';

@Injectable()
export class PatientService {
  constructor(
    private readonly environmentService: EnvironmentService,
    private readonly twentyORMManager: TwentyORMManager,
    @InjectRepository(Workspace, 'core')
    private readonly workspaceRepository: Repository<Workspace>,
  ) {}

  // async fetchLocationsFromPMS(workspaceId: string) {
  //   //   {
  //   //     "id": 3,
  //   //     "shortName": "CBO",
  //   //     "name": "Celebration Dental Central Billing Office-Test",
  //   //     "email": "cbo@celebration.coom",
  //   //     "timeZone": "Hawaiian Standard Time",
  //   //     "phone1": "(778) 899-7788",
  //   //     "phone2": "(112) 233-1122",
  //   //     "fax": "(407) 507-3995",
  //   //     "website": null,
  //   //     "logoUrl": "https://stcarestackqa1001.blob.core.windows.net/patientportal/Account_10001_Location_3_logo?timestamp=1729152961667",
  //   //     "address": {
  //   //         "addressLine1": "741 Front St Ste 310",
  //   //         "addressLine2": "",
  //   //         "city": "Kissimmee",
  //   //         "state": "AL",
  //   //         "zipCode": "34747-4991"
  //   //     },
  //   //     "latitude": 32.3182314,
  //   //     "longitude": -86.902298
  //   // },
  //   const currentWorkspace = await this.workspaceRepository.findOne({
  //     where: { id: workspaceId },
  //   });

  //   if (!currentWorkspace) {
  //     return;
  //   }

  //   const pmsVendorKey = this.environmentService.get('PMS_VENDOR_KEY');
  //   const pmsUrl = currentWorkspace.pmsUrl;
  //   const pmsAccountKey = currentWorkspace.pmsAccountKey;
  //   const pmsAccountId = currentWorkspace.pmsAccountId;

  //   const response = await axios.get(`${pmsUrl}/api/v1.0/locations`, {
  //     headers: {
  //       Accept: 'application/json',
  //       VendorKey: pmsVendorKey,
  //       AccountKey: pmsAccountKey,
  //       AccountId: pmsAccountId,
  //     },
  //   });

  //   // console.log('=============Response:============\n', response.data.length);
  //   const locations = response.data.map((location) => {
  //     return {
  //       locationId: location.id,
  //       name: location.name,
  //     };
  //   });

  //   return locations;
  // }

  async getLocation(locationId: string) {
    // {
    //   id: '3327637a-659e-44a9-a3ec-96ac121daefc',
    //   name: 'tvm',
    //   createdAt: 2024-12-03T13:07:20.669Z,
    //   updatedAt: 2024-12-03T13:07:20.669Z,
    //   deletedAt: null,
    //   createdBy: {
    //     source: 'MANUAL',
    //     workspaceMemberId: '20202020-0687-4c41-b707-ed1bfca972a7',
    //     name: 'Tim Apple'
    //   },
    //   position: 1,
    //   searchVector: "'tvm':1",
    //   locationId: null
    // }

    const locationsRepository =
      await this.twentyORMManager.getRepository('location');
    const result = await locationsRepository.findOne({
      where: { id: locationId },
    });

    return result;
  }

  async createPatientInPMS(leadFromORM, workspaceId: string) {
    // {
    //     "accountId": 10001,
    //     "patientIdentifier": null,
    //     "imagingIntegrationId": null,
    //     "referralSourceSubCategoryId": null,
    //     "patientOrthoStatus": 2,
    //     "status": 1,
    //     "extentedAttributes": null,
    //     "hasProfilePicture": false,
    //     "id": 2624303,
    //     "prefix": 1,
    //     "dob": "2019-08-24T14:15:22Z",
    //     "gender": 1,
    //     "addressDetail": null,
    //     "ssn": "",
    //     "defaultLocationId": 24589,
    //     "email": null,
    //     "maritalStatus": 5,
    //     "driverLicence": "",
    //     "otherIdentificationNumber": null,
    //     "identificationType": null,
    //     "phoneWithExt": "",
    //     "mobile": "",
    //     "workPhoneWithExt": "",
    //     "fax": "",
    //     "relationshipToResponsibleParty": 1,
    //     "responsiblePartyPatientId": null,
    //     "communicationStatus": 0,
    //     "nationality": null,
    //     "ethnicity": null,
    //     "occupation": null,
    //     "extendedColumn1": null,
    //     "firstName": "Elon",
    //     "middleName": null,
    //     "lastName": "Donne",
    //     "suffix": null
    // }
    const currentWorkspace = await this.workspaceRepository.findOne({
      where: { id: workspaceId },
    });

    if (!currentWorkspace) {
      throw new Error('Workspace not found');
    }
    // leadFromORM =  {
    //   id: '22b567d4-fc19-4fec-84ee-a74a1c562a86',
    //   createdAt: 2024-11-25T13:58:31.563Z,
    //   updatedAt: 2024-12-05T15:43:41.734Z,
    //   deletedAt: null,
    //   createdBy: {
    //     source: 'MANUAL',
    //     workspaceMemberId: '20202020-0687-4c41-b707-ed1bfca972a7',
    //     name: 'Tim Apple'
    //   },
    //   position: 1,
    //   searchVector: "'asdf':1",
    //   stage: 'INCOMING',
    //   locationId: '3fd049da-4de4-4f36-a7e9-07b12b1cc2c0',
    //   dateOfBirth: '2024-12-04',
    //   genter: 'MALE',
    //   patientId: '',
    //   fullName: { firstName: 'Elon', lastName: 'Tesla' },
    //   name: 'asdf'
    // }
    // const patientData = {
    //   DOB: '2019-08-24T14:15:22Z',
    //   FirstName: 'Elon',
    //   LastName: 'Donne',
    //   Gender: 1,
    //   defaultLocationId: 24589,
    // };

    const location = await this.getLocation(leadFromORM.locationId);

    if (!location) {
      throw new Error('Location not found');
    }

    // gender integer Male – 1,Female – 2,Other – 3 , Not Set-4

    let gender = 4;

    switch (leadFromORM.genter) {
      case 'MALE':
        gender = 1;
        break;
      case 'FEMALE':
        gender = 2;
        break;
      case 'OTHER':
        gender = 3;
        break;
      default:
        gender = 4;
        break;
    }

    const patientData = {
      DOB: leadFromORM.dateOfBirth + 'T00:00:00Z',
      FirstName: leadFromORM.fullName.firstName,
      LastName: leadFromORM.fullName.lastName,
      Genter: gender,
      defaultLocationId: location.locationId,
    };

    const pmsVendorKey = this.environmentService.get('PMS_VENDOR_KEY');
    const pmsUrl = currentWorkspace.pmsUrl;
    const pmsAccountKey = currentWorkspace.pmsAccountKey;
    const pmsAccountId = currentWorkspace.pmsAccountId;

    // const response = await axios.get(`${pmsUrl}/api/v1.0/locations`, {
    //   headers: {
    //     Accept: 'application/json',
    //     VendorKey: pmsVendorKey,
    //     AccountKey: pmsAccountKey,
    //     AccountId: pmsAccountId,
    //   },
    // });

    // console.log('=================Patient Data:=============\n', patientData);
    // console.log('=================PMS URL:=============\n', pmsUrl);
    // console.log('=================Vendor Key:=============\n', pmsVendorKey);
    // console.log('=================Account Key:=============\n', pmsAccountKey);
    // console.log('=================Account ID:=============\n', pmsAccountId);
    try {
      const response = await axios.post(
        `${pmsUrl}/api/v1.0/patients`,
        patientData,
        {
          params: { skipDuplicateCheck: false },
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            VendorKey: pmsVendorKey,
            AccountKey: pmsAccountKey,
            AccountId: pmsAccountId,
          },
        },
      );

      console.log('=============ResponseData:============\n', response.data);

      return response.data.id;
    } catch (error) {
      if (error.response.data) {
        throw new Error(error.response.data);
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('Patient Creation Failed');
      }
    }
  }

  async createPatient(
    leadId: string,
    workspaceId: string,
    categorySingularApiName: string,
  ): Promise<number | undefined> {
    const categoryRepository = await this.twentyORMManager.getRepository(
      categorySingularApiName,
    );
    const leadFromORM = await categoryRepository.findOne({
      where: { id: leadId },
    });

    if (!leadFromORM) {
      throw new Error('Lead Details not found');
    }

    console.log('=================Lead:=============\n', leadFromORM);

    const patientId = await this.createPatientInPMS(leadFromORM, workspaceId);

    if (!patientId || typeof patientId !== 'number') {
      throw new Error('Patient Creation Failed');
    }
    const updateResponse = await categoryRepository.update(leadId, {
      patientId,
    });

    console.log(
      '=================Update Response:=============\n',
      updateResponse,
    );
    if (updateResponse.affected === 1) {
      return patientId;
    }

    return;
  }

  //   curl --location 'https://celebration.qa1.carestackqa.com//api/v1.0/patients/search' \
  // --header 'Content-Type: application/json' \
  // --header 'Accept: application/json' \
  // --header 'VendorKey: 403C0BD0-E517-46D4-B501-FDF68FE53128' \
  // --header 'AccountKey: 56D6E490-639D-4C62-A20F-B96A4BDF7F20' \
  // --header 'AccountId: 10001' \
  // --data '{
  //     "SearchTerm": "Elon Musk",
  //     "selectFields": "PatientID, firstName, lastName",
  //     "Limit": 6
  // }'
  async searchPatientInPMS(
    searchQuery: string,
    workspaceId: string,
  ): Promise<any> {
    const currentWorkspace = await this.workspaceRepository.findOne({
      where: { id: workspaceId },
    });

    if (!currentWorkspace) {
      throw new Error('Workspace not found');
    }

    const pmsVendorKey = this.environmentService.get('PMS_VENDOR_KEY');
    const pmsUrl = currentWorkspace.pmsUrl;
    const pmsAccountKey = currentWorkspace.pmsAccountKey;
    const pmsAccountId = currentWorkspace.pmsAccountId;

    const searchQueryData = {
      SearchTerm: searchQuery,
      selectFields: 'PatientID, firstName, lastName',
      Limit: 6,
    };

    try {
      const response = await axios.post(
        `${pmsUrl}/api/v1.0/patients/search`,
        searchQueryData,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            VendorKey: pmsVendorKey,
            AccountKey: pmsAccountKey,
            AccountId: pmsAccountId,
          },
        },
      );

      console.log('=============ResponseData:============\n', response.data);

      return response.data;
    } catch (error) {
      if (error.response.data) {
        throw new Error(error.response.data);
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('Patient Search Failed');
      }
    }
  }

  async searchPatients(searchQuery: string, workspaceId: string): Promise<any> {
    //search in pms
    const searchResult = await this.searchPatientInPMS(
      searchQuery,
      workspaceId,
    );
    //   {
    //     "patientId": 1156971,
    //     "firstName": "Elon",
    //     "lastName": "Musk"
    // },

    return searchResult;
  }

  // attach meens add patientId from pms to record/lead
  async attachPatient(
    leadId: string,
    patientId: number,
    categorySingularApiName: string,
  ): Promise<boolean> {
    const categoryRepository = await this.twentyORMManager.getRepository(
      categorySingularApiName,
    );
    const updateResponse = await categoryRepository.update(leadId, {
      patientId: patientId + '',
    });

    console.log(
      '=================Update Response:=============\n',
      updateResponse,
    );
    if (updateResponse.affected === 1) {
      return true;
    }

    return false;
  }
}
