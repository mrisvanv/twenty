import { ArgsType, Field } from '@nestjs/graphql';

import { IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class CreatePatientInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  leadId: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  workspaceId: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  categorySingularApiName: string;
}
