import { Field, ObjectType } from '@nestjs/graphql';

import { Patient } from 'src/engine/core-modules/patient/dto/patient.entry';
@ObjectType()
export class SearchPatients {
  @Field(() => [Patient], {
    nullable: true,
    description: 'List of patients',
  })
  result?: Array<Patient>;

  @Field(() => String, {
    nullable: true,
    description: 'Message indicating success or failure',
  })
  message?: string;
}
//
