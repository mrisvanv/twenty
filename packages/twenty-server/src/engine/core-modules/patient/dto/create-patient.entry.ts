import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreatePatient {
  @Field(() => Boolean, {
    description: 'Boolean that confirms query was dispatched',
  })
  success: boolean;

  @Field(() => Int, {
    nullable: true,
    description: 'ID of the patient created',
  })
  patientId?: number;

  @Field(() => String, {
    nullable: true,
    description: 'Message returned from the query',
  })
  message?: string;
}
//
