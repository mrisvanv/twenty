import { ArgsType, Field } from '@nestjs/graphql';

import { IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class SyncLocationInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  workspaceId: string;
}
