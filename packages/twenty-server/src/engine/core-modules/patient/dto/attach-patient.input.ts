import { ArgsType, Field, Int } from '@nestjs/graphql';

import { IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class AttachPatientInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  leadId: string;

  @Field(() => Int)
  @IsNotEmpty()
  patientId: number;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  categorySingularApiName: string;
}
