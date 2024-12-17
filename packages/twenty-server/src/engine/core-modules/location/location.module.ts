import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FeatureFlagEntity } from 'src/engine/core-modules/feature-flag/feature-flag.entity';
import { FeatureFlagModule } from 'src/engine/core-modules/feature-flag/feature-flag.module';
import { LocationResolver } from 'src/engine/core-modules/location/location.resolver';
import { LocationService } from 'src/engine/core-modules/location/services/location.service';
import { UserWorkspace } from 'src/engine/core-modules/user-workspace/user-workspace.entity';
import { Workspace } from 'src/engine/core-modules/workspace/workspace.entity';

@Module({
  imports: [
    FeatureFlagModule,
    TypeOrmModule.forFeature(
      [Workspace, UserWorkspace, FeatureFlagEntity],
      'core',
    ),
  ],
  controllers: [],
  providers: [LocationResolver, LocationService],
  exports: [],
})
export class LocationModule {}
