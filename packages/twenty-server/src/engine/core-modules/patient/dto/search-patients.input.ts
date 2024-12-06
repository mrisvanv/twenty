import { ArgsType, Field } from '@nestjs/graphql';

import { IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class SearchPatientsInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  searchQuery: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  workspaceId: string;
}
