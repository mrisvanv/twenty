import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { SyncLocation } from 'src/engine/core-modules/location/dto/sync-location.entry';
import { SyncLocationInput } from 'src/engine/core-modules/location/dto/sync-location.input';
import { LocationService } from 'src/engine/core-modules/location/services/location.service';
import { UserAuthGuard } from 'src/engine/guards/user-auth.guard';
import { WorkspaceAuthGuard } from 'src/engine/guards/workspace-auth.guard';

@Resolver()
export class LocationResolver {
  constructor(private locationService: LocationService) {}

  @Mutation(() => SyncLocation)
  @UseGuards(WorkspaceAuthGuard, UserAuthGuard)
  async syncLocation(
    @Args() syncLocationInput: SyncLocationInput,
  ): Promise<SyncLocation> {
    const result = await this.locationService.syncLocation(
      syncLocationInput.workspaceId,
    );

    return {
      success: result || false,
    };
  }
}
