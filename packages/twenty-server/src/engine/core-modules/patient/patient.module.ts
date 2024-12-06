import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FeatureFlagEntity } from 'src/engine/core-modules/feature-flag/feature-flag.entity';
import { PatientResolver } from 'src/engine/core-modules/patient/patient.resolver';
import { PatientService } from 'src/engine/core-modules/patient/services/patient.service';
import { UserWorkspace } from 'src/engine/core-modules/user-workspace/user-workspace.entity';
import { Workspace } from 'src/engine/core-modules/workspace/workspace.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Workspace, UserWorkspace, FeatureFlagEntity],
      'core',
    ),
  ],
  controllers: [],
  providers: [PatientResolver, PatientService],
  exports: [],
})
export class PatientModule {}
