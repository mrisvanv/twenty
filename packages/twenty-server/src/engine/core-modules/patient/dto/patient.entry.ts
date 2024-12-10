import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Patient {
  @Field(() => Number, {
    description: 'Patient ID',
  })
  patientId: number;

  @Field(() => String, {
    description: 'Patient First Name',
  })
  firstName: string;

  @Field(() => String, {
    description: 'Patient Last Name',
  })
  lastName: string;
}
