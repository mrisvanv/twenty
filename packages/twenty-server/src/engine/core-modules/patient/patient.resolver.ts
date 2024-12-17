import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AttachPatient } from 'src/engine/core-modules/patient/dto/attach-patient.entry';
import { AttachPatientInput } from 'src/engine/core-modules/patient/dto/attach-patient.input';
import { CreatePatient } from 'src/engine/core-modules/patient/dto/create-patient.entry';
import { CreatePatientInput } from 'src/engine/core-modules/patient/dto/create-patient.input';
import { SearchPatients } from 'src/engine/core-modules/patient/dto/search-patients.entry';
import { SearchPatientsInput } from 'src/engine/core-modules/patient/dto/search-patients.input';
import { PatientService } from 'src/engine/core-modules/patient/services/patient.service';
import { UserAuthGuard } from 'src/engine/guards/user-auth.guard';
import { WorkspaceAuthGuard } from 'src/engine/guards/workspace-auth.guard';

@Resolver()
export class PatientResolver {
  constructor(private patientService: PatientService) {}

  @Mutation(() => CreatePatient)
  @UseGuards(WorkspaceAuthGuard, UserAuthGuard)
  async createPatient(
    @Args() createPatientInput: CreatePatientInput,
  ): Promise<CreatePatient> {
    try {
      const result = await this.patientService.createPatient(
        createPatientInput.leadId,
        createPatientInput.workspaceId,
        createPatientInput.categorySingularApiName,
      );

      const response: CreatePatient = {
        success: result !== undefined,
        patientId: result,
        // message: 'Patient created successfully',
      };

      return response;
    } catch (error) {
      // console.log('Error====================', error.message);
      console.log(error);

      const response: CreatePatient = {
        success: false,
        message: error.message,
      };

      return response;
    }
  }

  @Mutation(() => SearchPatients)
  @UseGuards(WorkspaceAuthGuard, UserAuthGuard)
  async searchPatients(
    @Args() searchPatientInput: SearchPatientsInput,
  ): Promise<SearchPatients> {
    try {
      const result = await this.patientService.searchPatients(
        searchPatientInput.searchQuery,
        searchPatientInput.workspaceId,
      );

      const response: SearchPatients = {
        result: result,
      };

      return response;
    } catch (error) {
      // console.log('Error====================', error.message);
      console.log(error);

      const response: SearchPatients = {
        message: error.message,
      };

      return response;
    }
  }

  //attach patient
  @Mutation(() => AttachPatient)
  @UseGuards(WorkspaceAuthGuard, UserAuthGuard)
  async attachPatient(
    @Args() attachPatientInput: AttachPatientInput,
  ): Promise<AttachPatient> {
    try {
      const result = await this.patientService.attachPatient(
        attachPatientInput.leadId,
        attachPatientInput.patientId,
        attachPatientInput.categorySingularApiName,
      );

      const response: AttachPatient = {
        success: result,
        // message: 'Patient attached successfully',
      };

      return response;
    } catch (error) {
      // console.log('Error====================', error.message);
      console.log(error);

      const response: AttachPatient = {
        success: false,
        message: error.message,
      };

      return response;
    }
  }
}
