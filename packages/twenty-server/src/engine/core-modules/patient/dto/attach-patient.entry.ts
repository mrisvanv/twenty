import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AttachPatient {
  @Field(() => Boolean, {
    description: 'Boolean that confirms query was dispatched',
  })
  success: boolean;

  @Field(() => String, {
    nullable: true,
    description: 'Message returned from the query',
  })
  message?: string;
}
//
