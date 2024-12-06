import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import axios from 'axios';
import { Repository } from 'typeorm';

import { EnvironmentService } from 'src/engine/core-modules/environment/environment.service';
import { Workspace } from 'src/engine/core-modules/workspace/workspace.entity';
import { TwentyORMManager } from 'src/engine/twenty-orm/twenty-orm.manager';

@Injectable()
export class LocationService {
  constructor(
    private readonly environmentService: EnvironmentService,
    private readonly twentyORMManager: TwentyORMManager,
    @InjectRepository(Workspace, 'core')
    private readonly workspaceRepository: Repository<Workspace>,
  ) {}

  async fetchLocationsFromPMS(workspaceId: string) {
    //   {
    //     "id": 3,
    //     "shortName": "CBO",
    //     "name": "Celebration Dental Central Billing Office-Test",
    //     "email": "cbo@celebration.coom",
    //     "timeZone": "Hawaiian Standard Time",
    //     "phone1": "(778) 899-7788",
    //     "phone2": "(112) 233-1122",
    //     "fax": "(407) 507-3995",
    //     "website": null,
    //     "logoUrl": "https://stcarestackqa1001.blob.core.windows.net/patientportal/Account_10001_Location_3_logo?timestamp=1729152961667",
    //     "address": {
    //         "addressLine1": "741 Front St Ste 310",
    //         "addressLine2": "",
    //         "city": "Kissimmee",
    //         "state": "AL",
    //         "zipCode": "34747-4991"
    //     },
    //     "latitude": 32.3182314,
    //     "longitude": -86.902298
    // },
    const currentWorkspace = await this.workspaceRepository.findOne({
      where: { id: workspaceId },
    });

    if (!currentWorkspace) {
      return;
    }

    const pmsVendorKey = this.environmentService.get('PMS_VENDOR_KEY');
    const pmsUrl = currentWorkspace.pmsUrl;
    const pmsAccountKey = currentWorkspace.pmsAccountKey;
    const pmsAccountId = currentWorkspace.pmsAccountId;

    const response = await axios.get(`${pmsUrl}/api/v1.0/locations`, {
      headers: {
        Accept: 'application/json',
        VendorKey: pmsVendorKey,
        AccountKey: pmsAccountKey,
        AccountId: pmsAccountId,
      },
    });

    // console.log('=============Response:============\n', response.data.length);
    const locations = response.data.map((location) => {
      return {
        locationId: location.id,
        name: location.name,
      };
    });

    return locations;
  }

  async fetchLocationsFromORM() {
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
    const result = await locationsRepository.find();

    const locations = result.map((location) => {
      return {
        id: location.id,
        name: location.name,
        locationId: location.locationId,
      };
    });

    return locations;
  }

  async addToORM(locations: any[]) {
    const locationsRepository =
      await this.twentyORMManager.getRepository('location');

    await locationsRepository.insert(locations);
  }

  async deleteFromORM(locations: any[]) {
    const locationsRepository =
      await this.twentyORMManager.getRepository('location');

    const locationIds = locations.map((location) => location.id);

    await locationsRepository.delete(locationIds);
  }

  async syncLocation(workspaceId: string): Promise<boolean> {
    const workspace = await this.workspaceRepository.findOne({
      where: { id: workspaceId },
    });

    if (!workspace) {
      return false;
    }

    try {
      const localocationsInPMS = await this.fetchLocationsFromPMS(workspaceId);
      const localocationsInORM = await this.fetchLocationsFromORM();

      const locationsToAdd = localocationsInPMS.filter(
        (pmsLocation) =>
          !localocationsInORM.some(
            (ormLocation) => ormLocation.locationId === pmsLocation.locationId,
          ),
      );

      const locationsToDelete = localocationsInORM.filter(
        (ormLocation) =>
          !localocationsInPMS.some(
            (pmsLocation) => pmsLocation.locationId === ormLocation.locationId,
          ),
      );

      if (locationsToAdd.length > 0) {
        await this.addToORM(locationsToAdd);
      }

      if (locationsToDelete.length > 0) {
        await this.deleteFromORM(locationsToDelete);
      }

      return true;
    } catch (e) {
      console.log('Error:', e);
    }

    return false;
  }
}
